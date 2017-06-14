import { Component, OnInit} from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { Song } from '../../songs/song';


@Component({
  selector: 'album-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
  providers: [AlbumService]
})

export class AlbumsListComponent implements OnInit {

  albums: Album[]
  selectedAlbum: Album
  songsList: Song[] = [];
  constructor(private albumService: AlbumService) { }


  ngOnInit() {
   this.albumService
    .getAlbums()
    .then((albums: Album[]) => {
      this.albums = albums.map((album) => {
        console.log(albums);
        return album;
      });
  });

  }
  
  coverExist(object): Boolean { 
    return typeof(object) !== 'undefined';
  }


  private getIndexOfAlbum = (albumId: String) => {
    return this.albums.findIndex((album) => {
      return album._id === albumId;
    });
  }

  selectAlbum(album: Album) {
    this.selectedAlbum = album;
    this.songsList = this.selectedAlbum.songs;
  }


}