import { Injectable } from '@angular/core';
import { Artist } from './artist';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtistService {
    private artistsUrl = '/api/artists';

    constructor (private http: Http) {}

    // get("/api/artists")
    getArtists(): Promise<Artist[]> {
      return this.http.get(this.artistsUrl)
                 .toPromise()
                 .then(response => response.json() as Artist[])
                 .catch(this.handleError);
    }

    // post("/api/artists")
    createArtist(newArtist: Artist): Promise<Artist> {
      return this.http.post(this.artistsUrl, newArtist)
                 .toPromise()
                 .then(response => response.json() as Artist)
                 .catch(this.handleError);
    }

    // get("/api/artists/:id") endpoint not used by Angular app

    // delete("/api/artists/:id")
    deleteArtist(delArtistId: String): Promise<String> {
      return this.http.delete(this.artistsUrl + '/' + delArtistId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/artists/:id")
    updateArtist(putArtist: Artist): Promise<Artist> {
      const putUrl = this.artistsUrl + '/' + putArtist._id;
      return this.http.put(putUrl, putArtist)
                 .toPromise()
                 .then(response => response.json() as Artist)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
