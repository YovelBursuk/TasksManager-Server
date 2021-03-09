import mongoose from "mongoose";
import { Get, Post, Route } from "tsoa";
import { Issue } from "../models/issue.model";

@Route("api")
export default class IssueController {
    @Get("/issues")
    public async getIssues(): Promise<{title: string, text: string, column: number}[]> {
        const issues = await Issue.find({});
        return issues;
    }

    // @Post("/issues")
    // public async createIssue(title: string, text: string, column: number): Promise<void> {
    //     const issue = Issue.build({ title, text, column });
    //     await issue.save();
    // }
}