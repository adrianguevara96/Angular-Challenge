import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students/students.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students:any[] = [];
  newStudents:any[] = [];
  studentsList:any[] = [];

  //hide a button 
  hide = true;

  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    patronus: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(
    private studentsService: StudentsService,
    private navbar: NavbarComponent
  ) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents() {
    this.studentsService.getStudents().subscribe( (res: any) => {
      this.students = res;
      let today = moment();
      for(let i = 0 ; i< this.students.length; i++){
        let dateOfBirth = this.students[i].dateOfBirth;
        let yearOfBirth = this.students[i].yearOfBirth
        this.students[i].age = today.diff(dateOfBirth ? moment(`${dateOfBirth.substr(3,2)}-${dateOfBirth.substr(0,2)}-${dateOfBirth.substr(6,4)}`) : (yearOfBirth ? moment(yearOfBirth) : today), 'years');
      }
      this.studentsList = this.students;
    }, (error:any) => {
      console.log(error);
    });
  }

  submit() {
    if(this.studentForm.valid){
      document.getElementById("buttonClose")!.click();

      //Define student to register
      let student = {
        name: this.studentForm.controls['name'].value,
        patronus: this.studentForm.controls['patronus'].value,
        age: this.studentForm.controls['age'].value,
        image: this.studentForm.controls['image'].value
      }

      this.students.push(student);
      this.studentsList = this.students;
      //If new students exists, save all new students.
      if(localStorage.getItem('newStudents') !== null){
        this.newStudents = JSON.parse(<string> localStorage.getItem('newStudents'));
      }
      this.newStudents.push(student);
      localStorage.setItem('students', JSON.stringify(this.students));
      localStorage.setItem('newStudents', JSON.stringify(this.newStudents));

      setTimeout( () => {
        document.getElementById('clickMe')!.click();
      }, 500)

    }else{
      console.log('invalid');
    }
  }

  searchStudent(value:any){
    let text = value.toLowerCase();
    
    this.studentsList = this.students.filter(function (student:any) {
      return (
        student.name.toLowerCase().includes(text) || //filter by name
        student.patronus.toLowerCase().includes(text) || //filter by patronus
        student.age.toString().toLowerCase().includes(text) //filter by age
      );
    });
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
