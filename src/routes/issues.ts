import express, { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Issue, IssueDoc } from "../models/issue.model";

const router = express.Router();

router.get("/issues", async (req: Request, res: Response) => {
    const issues = await Issue.find({});
    return res.status(StatusCodes.OK).send(issues);
});

router.post("/issues", async (req: Request, res: Response) => {
    const { title, text, column } = req.body;

    try {
        const issue = Issue.build({ title, text, column });
        await issue.save();
        return res.status(StatusCodes.CREATED).send(issue);
    } catch (mongoErr) {
        // get the status code from the error itself
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(mongoErr.message);
    }
});

export {  router as issuesRouter };