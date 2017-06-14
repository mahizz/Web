import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Song } from '../../songs/song';
import { Album } from '../album';
import { AlbumService } from '../album.service';
//import { AlbumDetailsComponent } from '../album-details/album-details.component';

@Component({
  selector: 'album-artist-list',
  templateUrl: './albums-artist-list.component.html',
  styleUrls: ['./albums-artist-list.component.css'],
  providers: [AlbumService]
})

export class AlbumsOfArtistListComponent implements OnInit {

  albums: Album[]
  selectedAlbum: Album
  artistId: string
  songsList: Song[] = [];
  constructor(private activatedRoute: ActivatedRoute,private albumService: AlbumService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.artistId = params['artistId'];
       this.albumService
        .getAtristAlbums(this.artistId)
        .then((albums: Album[]) => {
          this.albums = albums.map((album) => {
            return album;
          });
          console.log(this.albums);
        });
  })
  }

  coverExist(object): Boolean { 
    return typeof(object) !== 'undefined';
  }

  selectAlbum(Album) {
    this.selectedAlbum = Album;
    this.songsList = this.selectedAlbum.songs;
  }
}