import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { issuesRouter } from "./routes/issues";

const app = express();
const port = 8080; // default port to listen

app.use(json());

mongoose.connect("mongodb://localhost:27017/jira", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    // tslint:disable-next-line:no-console
    console.log("Connected to DB!")
})

app.use("/api", issuesRouter);

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );