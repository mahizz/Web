import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song';


@Component({
  selector: 'song-album-list',
  templateUrl: './song-album-list.component.html',
  styleUrls: ['./song-album-list.component.css']
})

export class SongAlbumListComponent implements OnInit {
  @Input()songs: Song[] =[];

  constructor() { }

  ngOnInit() {

  }


}