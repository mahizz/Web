import { Injectable } from '@angular/core';
import { Album } from './album';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlbumService {
    private albumsUrl = '/api/albums';

    constructor (private http: Http) {}

    // get("/api/albums")
    getAlbums(): Promise<Album[]> {
      return this.http.get(this.albumsUrl)
                 .toPromise()
                 .then(response => response.json() as Album[])
                 .catch(this.handleError);
    }

    getAtristAlbums(artistId: String): Promise<Album[]> {
      return this.http.get(this.albumsUrl + '/ofArtist/' + artistId)
                 .toPromise()
                 .then(response => response.json() as Album[])
                 .catch(this.handleError);
    }

    // post("/api/albums")
    createAlbum(newAlbum: Album): Promise<Album> {
      return this.http.post(this.albumsUrl, newAlbum)
                 .toPromise()
                 .then(response => response.json() as Album)
                 .catch(this.handleError);
    }

    // get("/api/albums/:id") endpoint not used by Angular app

    // delete("/api/albums/:id")
    deleteAlbum(delAlbumId: String): Promise<String> {
      return this.http.delete(this.albumsUrl + '/' + delAlbumId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/albums/:id")
    updateAlbum(putAlbum: Album): Promise<Album> {
      const putUrl = this.albumsUrl + '/' + putAlbum._id;
      return this.http.put(putUrl, putAlbum)
                 .toPromise()
                 .then(response => response.json() as Album)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
