import { db } from "./../db";

var mongoose = db.mongooseInstance;
var mongooseConnection = db.mongooseConnection;

let Schema = mongoose.Schema;

let songSchema = new Schema({
	name:  String,
	year: { type: Date, default: Date.now },
	length: String,
	meta: {
	score: Number,
	favs:  Number
	}
});


var song = mongooseConnection.model("Songs", songSchema);

export { song };