import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characters/characters.service';
import * as moment from 'moment';
import { $ } from 'protractor';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  name:any;
  characters:any[] = [];
  charactersList:any[] = [];
  search22:string = '';

  constructor(
    private route: ActivatedRoute,
    private characterService: CharactersService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.search22 = '';
      this.name = params.get('name')
      this.getCharacters();
    });
  }

  getCharacters() {
    this.characterService.getCharacters(this.name).subscribe( (res: any) => {
      this.characters = res;
      let today = moment();
      for(let i = 0 ; i< this.characters.length; i++){
        let dateOfBirth = this.characters[i].dateOfBirth;
        let yearOfBirth = this.characters[i].yearOfBirth
        this.characters[i].age = today.diff(dateOfBirth ? moment(`${dateOfBirth.substr(3,2)}-${dateOfBirth.substr(0,2)}-${dateOfBirth.substr(6,4)}`) : (yearOfBirth ? moment(yearOfBirth) : today), 'years');
      }
      this.charactersList = this.characters;
    }, (error:any) => {
      console.log(error);
    });
  }

  searchCharacter(value:any){
    let text = value.toLowerCase();

    this.charactersList = this.characters.filter(function (character:any) {
      return (
        character.name.toLowerCase().includes(text) || //filter by name
        character.patronus.toLowerCase().includes(text) || //filter by patronus
        character.age.toString().toLowerCase().includes(text) //filter by age
      );
    });
  }
}
