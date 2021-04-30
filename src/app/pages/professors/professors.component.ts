import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from 'src/app/services/professors/professors.service';
import * as moment from 'moment' 

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})
export class ProfessorsComponent implements OnInit {

  teachers:any[] = [];
  teachersList:any[] = [];

  constructor(
    private teachersService: ProfessorsService
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    this.teachersService.getProfessors().subscribe( (res: any) => {
      this.teachers = res;
      let today = moment();
      for(let i = 0 ; i< this.teachers.length; i++){
        let dateOfBirth = this.teachers[i].dateOfBirth;
        let yearOfBirth = this.teachers[i].yearOfBirth
        this.teachers[i].age = today.diff(dateOfBirth ? moment(`${dateOfBirth.substr(3,2)}-${dateOfBirth.substr(0,2)}-${dateOfBirth.substr(6,4)}`) : (yearOfBirth ? moment(yearOfBirth) : today), 'years');
      }
      this.teachersList = this.teachers;
    }, (error:any) => {
      console.log(error);
    });
  }


  searchTeachers(value:any){
    let text = value.toLowerCase();
    
    this.teachersList = this.teachers.filter(function (teacher:any) {
      return (
        teacher.name.toLowerCase().includes(text) || //filter by name
        teacher.patronus.toLowerCase().includes(text) || //filter by patronus
        teacher.age.toString().toLowerCase().includes(text) //filter by age
      );
    });
  }
}
