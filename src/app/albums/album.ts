import { Song } from '../songs/song';


export class Album {
	_id?: string;
	title: string;
	genre: string;
	release: string;
	creator: string;
	cover?: string;
	songs?: Song[];
	meta: {
		score: number,
		favs:  number
	}; 
}
