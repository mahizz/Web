import { Request, Response, Router } from "express";
import { album } from "./../db/models/albumModel";

const albumsRouter: Router = Router();

albumsRouter.get("/", (request: Request, response: Response) => {
    album.find(function (err, albums) {
      if (err) return response.json(err);
      else response.json(albums);
    })
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
      else response.json(temp); 
    })
});

albumsRouter.delete("/:id", (request: Request, response: Response) => {
    album.remove({_id: request.params.id})
    response.status(204).end();
});

export { albumsRouter };
