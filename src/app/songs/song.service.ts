import { Injectable } from '@angular/core';
import { Song } from './song';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SongService {
    private songsUrl = '/api/songs';

    constructor (private http: Http) {}

    // get("/api/songs")
    getSongs(): Promise<Song[]> {
      return this.http.get(this.songsUrl)
                 .toPromise()
                 .then(response => response.json() as Song[])
                 .catch(this.handleError);
    }

    // get("/api/songs/:id")
    getOneSong(songId): Promise<Song[]> {
      return this.http.get(this.songsUrl+songId)
                 .toPromise()
                 .then(response => response.json() as Song[])
                 .catch(this.handleError);
    }

    // post("/api/songs")
    createSong(newSong: Song): Promise<Song> {
      return this.http.post(this.songsUrl, newSong)
                 .toPromise()
                 .then(response => response.json() as Song)
                 .catch(this.handleError);
    }

    // get("/api/songs/:id") endpoint not used by Angular app

    // delete("/api/songs/:id")
    deleteSong(delSongId: String): Promise<String> {
      return this.http.delete(this.songsUrl + '/' + delSongId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/songs/:id")
    updateSong(putSong: Song): Promise<Song> {
      const putUrl = this.songsUrl + '/' + putSong._id;
      return this.http.put(putUrl, putSong)
                 .toPromise()
                 .then(response => response.json() as Song)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
