import { Component, OnInit} from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';


@Component({
  selector: 'album-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
  providers: [AlbumService]
})

export class AlbumsListComponent implements OnInit {

  albums: Album[]
  selectedAlbum: Album
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

  private getIndexOfAlbum = (albumId: String) => {
    return this.albums.findIndex((album) => {
      return album._id === albumId;
    });
  }

  selectAlbum(album: Album) {
    this.selectedAlbum = album;
  }


}