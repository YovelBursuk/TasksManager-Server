import express, { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Issue, IIssue } from "../models/issue.model";
import IssueController from "../controllers/issue.controller";

const router = express.Router();

router.get("/issues", async (req: Request, res: Response) => {
    const controller = new IssueController();
    const issues = await controller.getIssues()
    return res.status(StatusCodes.OK).send(issues);
});

// router.post("/issues", async (req: Request, res: Response) => {
//     const { title, text, column } : IIssue = req.body;

//     const controller = new IssueController();
//     try {
//         controller.createIssue(title, text, column);
//         return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
//     } catch (mongoErr) {
//         // get the status code from the error itself
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(mongoErr.message);
//     }
// });

export {  router as issuesRouter };