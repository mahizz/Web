import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { UserService } from '../../users/user.service'

@Component({
  selector: 'artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
  providers: [ArtistService]
})
export class ArtistDetailsComponent  {

  @Input()
  artist: Artist;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private artistService: ArtistService,
                private userService: UserService) {}

  createArtist(artist: Artist) {
    this.artistService.createArtist(artist).then((newArtist: Artist) => {
      this.createHandler(newArtist);
    });
  }

  updateArtist(artist: Artist): void {
    this.artistService.updateArtist(artist).then((updatedArtist: Artist) => {
      this.updateHandler(updatedArtist);
    });
  }

  deleteArtist(artistId: String): void {
    let id=artistId;
    this.artistService.deleteArtist(id).then(() => {
      this.deleteHandler(id);
    });
  }

  goToProductDetails(id) {

  }

  canChange(): Boolean {
    return this.userService.checkAccess();
  }

}
