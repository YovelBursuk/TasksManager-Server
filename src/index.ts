import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { issuesRouter } from "./routes/issues.router";
import swaggerUi from "swagger-ui-express";
import { Exception } from "tsoa";

const app = express();
const port = 8080; // default port to listen

app.use(json());
app.use(express.static("public"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: "/swagger.json" } }));

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
    res.redirect("/swagger")
} );

app.use((err: Exception, req: Request, res: Response, next: NextFunction) => {
    const status: number = err.status || 500;
    const message: string = err.message || "Oops... Something is not working";
    const stack: string = err.stack || "No stack trace available...";

    res.status(status).send({
        status,
        message,
        stack
    })
})

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );