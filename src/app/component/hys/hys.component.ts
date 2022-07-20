import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  public skillss:Skills[]=[];
  public editSkills:Skills | undefined;
  public deleteSkills:Skills | undefined;
  
  constructor(private skillsService:SkillsService) { }

  ngOnInit(): void {
    this.getSkills();
  }
  public getSkills():void{
    this.skillsService.getSkills().subscribe({
      next:(Response: Skills[])=>{
        this.skillss=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })   
    }
    public onOpenModal(mode:String, skills?: Skills):void{
      const container=document.getElementById('main-container');
      const button = document.createElement('button');
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle','modal');
      if(mode === 'add'){
        button.setAttribute('data-bs-target','#addSkillsModal');
      }else if(mode === 'delete'){
        this.deleteSkills = skills;
        button.setAttribute('data-bs-target','#deleteSkillsModal');
      }else if(mode === 'edit'){
        this.editSkills = skills;
        button.setAttribute('data-bs-target','#editSkillsModal');
      }
      container?.appendChild(button);
      button.click();
    
    }
    public onAddSkills(addForm:NgForm){
      document.getElementById('add-skills-form')?.click();
      this.skillsService.addSkills(addForm.value).subscribe({
        next: (response:Skills) =>{
          console.log(response);
          this.getSkills();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
        
      })
    }
    public onUpdateSkills(skills: Skills){
      this.editSkills=skills;
      document.getElementById('add-skills-form')?.click();
      this.skillsService.updateSkills(skills).subscribe({
        next: (response:Skills) =>{
          console.log(response);
          this.getSkills();
        },    
        error:(error:HttpErrorResponse)=>{
          alert(error.message);      
        }
      })
    }
    public onDeleteSkills(idExp: number):void{
      this.skillsService.deleteSkills(idExp).subscribe({
        next: (response:void)=>{
          console.log(response);
          this.getSkills();
        },  
        error:(error:HttpErrorResponse)=>{
          alert(error.message);      
        }
      })
    }

}
