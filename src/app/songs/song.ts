export class Song {
	_id?: string;
	name: string;
	year: string;
	length: string;
	meta: {
		score: number,
		favs:  number
	}; 
}
