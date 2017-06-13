import { db } from "./../db";

var mongoose = db.mongooseInstance;
var mongooseConnection = db.mongooseConnection;

let Schema = mongoose.Schema;

let artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
	genre:   String,
	meta: {
		score: Number,
		favs:  Number
	}
});

var artist = mongooseConnection.model("Artists", artistSchema);

export { artist };