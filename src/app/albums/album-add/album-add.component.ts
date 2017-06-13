import {Router, ActivatedRoute, Params} from '@angular/router';
import { OnInit, OnDestroy, Component} from '@angular/core';
import { Album } from '../album';
import { Song } from '../../songs/song';
import { AlbumService } from '../album.service';
import { SongService } from '../../songs/song.service';


//import { SongAddComponent } from '../../songs/song-add/song-add.component';

@Component({
  selector: 'album-form',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [AlbumService]
})

export class AlbumAddComponent implements OnInit {

/*  genre: string;
  year: string;*/
  coverID: string = "";
  list: Song[] = [];
  artistId: any;
  constructor(private activatedRoute: ActivatedRoute,private albumService: AlbumService) {}

  ngOnInit() {
    // subscribe to router event

    this.activatedRoute.params.subscribe((params: Params) => {
        this.artistId = params['artistId'];
        console.log(this.artistId);
      });
  }

  model: Album = {
            title: '',
            genre: '',
            release: "2000-1-1",
            creator :this.artistId,
            meta: {
              score: 0,
              favs:  0
            }
          };

  newAlbum(){
    const model: Album = {
              title: '',
              genre: '',
              release: "2000-1-1",
              creator :this.artistId,
              meta: {
                score: 0,
                favs:  0
              }
            };
  }

  clearForm(){
   let temp: Album = {
          title: '',
          genre: '',
          release: "2000-1-1",
          creator :this.artistId,
          meta: {
            score: 0,
            favs:  0
          }
        };
    return temp;
  }
  handleCoverIDChange(file){
  console.log("zmiana")
  this.model.cover = file;


  }
  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this.model.creator = this.artistId;
    this.model.songs = this.list;
    console.log(this.model);
    this.albumService.createAlbum(this.model).then((createdAlbum: Album) => {
        this.model = this.clearForm();
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  
}