import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { HomeComponent } from './pages/home/home.component';
import { NewstudentsComponent } from './pages/newstudents/newstudents.component';
import { ProfessorsComponent } from './pages/professors/professors.component';
import { StudentsComponent } from './pages/students/students.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'characters/:name',
    component: CharactersComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'newstudents',
    component: NewstudentsComponent
  },
  {
    path: 'teachers',
    component: ProfessorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
