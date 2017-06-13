import { Request, Response, Router } from "express";
import { song } from "./../db/models/songModel";

const songsRouter: Router = Router();

songsRouter.get("/", (request: Request, response: Response) => {
    song.find(function (err, songs) {
      if (err) return response.json(err);
      else response.json(songs);
    })
});

songsRouter.get("/:id", (request: Request, response: Response) => {
    song.findOne({ _id: request.params.id})
    .exec(function(err, fullAlbum){
        response.json(fullAlbum);
    });
});

songsRouter.post("/", (request: Request, response: Response) => {
    let temp = new song(request.body);
    temp.save(function (err) {
      if (err) response.json(err)
      else response.json(temp); 
    })
});

songsRouter.delete("/:id", (request: Request, response: Response) => {
    song.remove({_id: request.params.id})
    response.status(204).end();
});

export { songsRouter };
