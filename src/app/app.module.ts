import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CharactersService } from './services/characters/characters.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './pages/students/students.component';
import { StudentsService } from './services/students/students.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessorsService } from './services/professors/professors.service';
import { ProfessorsComponent } from './pages/professors/professors.component';
import { NewstudentsComponent } from './pages/newstudents/newstudents.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharactersComponent,
    NavbarComponent,
    StudentsComponent,
    ProfessorsComponent,
    NewstudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CharactersService, StudentsService, ProfessorsService, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
