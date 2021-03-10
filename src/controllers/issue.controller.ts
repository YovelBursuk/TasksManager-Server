import { Body, Get, Post, Res, Response, Route, SuccessResponse,  } from "tsoa";
import { Issue } from "../models/issue.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export interface IssueDocSwagger {
    issueId: number,
    title: string,
    text: string,
    column: number
}


@Route("api")
export class IssueController {
    @Get("/issues")
    @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
    @Response(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    public async getIssues(): Promise<IssueDocSwagger[]> {
        const issues = await Issue.find({});
        return issues;
    }

    @Post("/issues")
    @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
    public async createIssue(
        @Body() { title, text, column, issueId }: IssueDocSwagger
    ): Promise<void> {
        const issue = Issue.build({ title, text, column, issueId });
        await issue.save();
    }
}