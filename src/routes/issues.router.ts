import express, { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Issue, IIssue } from "../models/issue.model";
import { IssueController } from "../controllers/issue.controller";

const router = express.Router();

router.get("/issues", async (req: Request, res: Response) => {
    const controller = new IssueController();
    const issues = await controller.getIssues()
    return res.status(StatusCodes.OK).send(issues);
});

router.post("/issues", async (req: Request, res: Response) => {
    const body : IIssue = req.body;

    const controller = new IssueController();
    await controller.createIssue({...body, issueId: Math.floor(Math.random() * 10000) + 1});
    return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
});

export {  router as issuesRouter };