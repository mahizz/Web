import Mongoose = require("mongoose");

class db {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor () {
        db.connect();
    }

    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect("mongodb://testowy:qwer1234@ds149481.mlab.com:49481/somebookapp");
        return this.mongooseInstance;
    }
}

db.connect();
export { db };
