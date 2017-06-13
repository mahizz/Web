import { OnInit, OnDestroy, Component, Input} from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'song-form',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  providers: [SongService]
})

export class SongAddComponent implements OnInit {

/*  genre: string;
  year: string;*/
  @Input()songs: Song[];
  constructor(private songService: SongService) {}

  ngOnInit() {
    // subscribe to router event
    console.log(this.songs);
  }

  model: Song = {
            name: '',
            length: '0:00',
            year: "2000-1-1",
            meta: {
              score: 0,
              favs:  0
            }
          };

  newSong(){
    const model: Song = {
              name: '',
              length: '0:00',
              year: "2000-1-1",
              meta: {
                score: 0,
                favs:  0
              }
            };
  }

  clearForm(){
   let temp: Song = {
          name: '',
          length: '0:00',
          year: "2000-1-1",
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
    this.songService.createSong(this.model).then((createdSong: Song) => {
        this.songs.push(createdSong);
        console.log(this.songs);
        this.model = this.clearForm();
    });
  }

  
}