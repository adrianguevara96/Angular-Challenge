import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newstudents',
  templateUrl: './newstudents.component.html',
  styleUrls: ['./newstudents.component.scss']
})
export class NewstudentsComponent implements OnInit {

  students:any[] = [];
  studentsList:any[] = [];

  constructor() {
    this.getNewStudents()
   }

  ngOnInit(): void {
    
  }

  getNewStudents() {
    if(localStorage.getItem('newStudents') !== null){
      this.students = JSON.parse(<string>localStorage.getItem('newStudents'));
      this.studentsList = this.students;
    }
  }

  searchNewStudent(value:any){
    let text = value.toLowerCase();
    
    this.studentsList = this.students.filter(function (student:any) {
      return (
        student.name.toLowerCase().includes(text) || //filter by name
        student.patronus.toLowerCase().includes(text) || //filter by patronus
        student.age.toString().toLowerCase().includes(text) //filter by age
      );
    });
  }

}
