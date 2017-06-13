import { Component} from '@angular/core';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'artist-form',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [ArtistService]
})

export class ArtistAddComponent {

/*  genre: string;
  year: string;*/

  model: Artist = {
            name: '',
            genre: '',
            meta: {
              score: 0,
              favs:  0
            }
          };

  constructor (private artistService: ArtistService) {}

  newArtist(){
    const model: Artist = {
              name: '',
              genre: '',
              meta: {
                score: 0,
                favs:  0
              }
            };
  }

  clearForm(){
   let temp: Artist = {
          name: '',
          genre: '',
          meta: {
            score: 0,
            favs:  0
          }
        };
    return temp;
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this.artistService.createArtist(this.model).then((createdArtist: Artist) => {
        this.model = this.clearForm();
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  
}