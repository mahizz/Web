import { db } from "./../db";

var mongoose = db.mongooseInstance;
var mongooseConnection = db.mongooseConnection;

let Schema = mongoose.Schema;

let albumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    creator : {
        type: Schema.ObjectId,
        ref: 'Artists',
        required: true },
    songs: [{
       type: Schema.ObjectId, ref: 'Songs'
    }],
    genre:   String,
    cover:   String,
    release: { type: Date, default: Date.now },
    meta: {
        score: Number,
        favs:  Number
    }
});

albumSchema.methods.test = function () {
  var greeting = this.title
    ? "title is " + this.title
    : "I don't have a title";
     return greeting;
}


var album = mongooseConnection.model("Albums", albumSchema);

export { album };