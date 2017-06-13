import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';

import { UserService } from './users/user.service';

import { AppComponent } from './app.component';
import { ArtistAddComponent } from './artists/artist-add/artist-add.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistDetailsComponent } from './artists/artist-details/artist-details.component';
import { AlbumAddComponent } from './albums/album-add/album-add.component';
import { SongAddComponent } from './songs/song-add/song-add.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { AlbumImageComponent } from './albums/album-image/album-image.component';
import { AlbumsOfArtistListComponent } from './albums/albums-artist-list/albums-artist-list.component';
import { AlbumsListComponent } from './albums/albums-list/albums-list.component';


const appRoutes: Routes = [
  { path: '', component: AlbumsListComponent },
  { path: 'Artists', component: ArtistListComponent },
  { path: 'addArtist', component: ArtistAddComponent },
  { path: 'Artists/:artistId/addAlbum', component: AlbumAddComponent },
  { path: 'Artists/:artistId/Albums', component: AlbumsOfArtistListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ArtistAddComponent,
    ArtistListComponent,
    ArtistDetailsComponent,
    AlbumAddComponent,
    SongAddComponent,
    SongListComponent,
    AlbumImageComponent,
    AlbumsOfArtistListComponent,
    AlbumsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    NgUploaderModule
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
