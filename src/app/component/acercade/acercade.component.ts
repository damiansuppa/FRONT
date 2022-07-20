import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { personaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  public personas:persona[]=[];
  public persona : persona | undefined;
  public updatePersona: persona | undefined;
  
  constructor(private personaService : personaService) { }

  ngOnInit(): void {
    this.getPersona()
  }
  public getPersona(): void{
    this.personaService.getPersona().subscribe({
      next: (Response: persona) =>{
        this.persona=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, persona?: persona):void{
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-bs-target','#addPersonaModal');
    }else if(mode === 'edit'){
      this.updatePersona = persona;
      button.setAttribute('data-bs-target','#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();
  
  }
  public onUpdatePersona(persona: persona){
    this.updatePersona=persona;
    document.getElementById('add-persona-form')?.click();
    this.personaService.updatePersona(persona).subscribe({
      next: (response:persona) =>{
        console.log(response);
        this.getPersona();
      },    
      error:(error:HttpErrorResponse)=>{
        alert(error.message);      
      }
    })
  }
}
