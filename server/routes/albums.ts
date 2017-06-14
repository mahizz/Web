import { Request, Response, Router } from "express";
import { album } from "./../db/models/albumModel";
import { song } from "./../db/models/songModel";


const albumsRouter: Router = Router();

albumsRouter.get("/", (request: Request, response: Response) => {
    album.find()
    .populate('songs')
    .exec(function(err, fullAlbum){
        response.json(fullAlbum);
    });
});

albumsRouter.get("/:id", (request: Request, response: Response) => {
    album.findOne({ _id: request.params.id})
    .populate('songs')
    .populate('creator')
    .exec(function(err, fullAlbum){
        response.json(fullAlbum);
    });
});

albumsRouter.get("/ofArtist/:id", (request: Request, response: Response) => {

    album.find({ creator: request.params.id})
    .populate('songs')
    .exec(function(err, fullAlbum){
        response.json(fullAlbum);
    });
});

albumsRouter.post("/", (request: Request, response: Response) => {
    let temp = new album(request.body);
    console.log(request.body);
    temp.save(function (err) {
      if (err) response.json(err)
      else response.json(temp) 
    })
});

albumsRouter.delete("/:id", (request: Request, response: Response) => {
    let Id = request.params.id
    album.findOne({ _id: request.params.id})
    .exec(function(err, Album){
        for (let temp of Album.songs) {
            song.findByIdAndRemove({ _id: temp},(err) => {
                  if (err) response.json(err).status(404).end()
            })
        }
        album.findByIdAndRemove({ _id: Id},(err) => {
          if (err) response.json(err).status(404).end()
          else response.status(204).end(); 
        })

    });
});



export { albumsRouter };
