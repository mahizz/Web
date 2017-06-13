import { NextFunction, Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import { artist } from "../db/models/artistModel";

const artistsRouter: Router = Router();

/*type AuthorizedRequest = Request & { headers: { authorization: string } };

artistsRouter.use((request: AuthorizedRequest, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    console.log(token);
    verify(token, secret, (tokenError) => {
        if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first",
            });
        }

        next();
    });
});*/

artistsRouter.get("/", (request: Request, response: Response) => {
    artist.find(function (err, artists) {
      if (err) return response.json(err);
      else response.json(artists);
    })
});

artistsRouter.get("/:id", (request: Request, response: Response) => {
    artist.findOne({ _id: request.params.id})
    .exec(function(err, fullAlbum){
        response.json(fullAlbum);
    });
});

artistsRouter.post("/", (request: Request, response: Response) => {
    let temp = new artist(request.body);
    temp.save(function (err) {
      if (err) response.json(err)
      else response.json(temp); 
    })
});

artistsRouter.delete("/:id", (request: Request, response: Response) => {
    artist.findByIdAndRemove({ _id: request.params.id},(err) => {
      if (err) response.json(err).status(404).end()
      else response.status(204).end(); 
    })
});


export { artistsRouter };
