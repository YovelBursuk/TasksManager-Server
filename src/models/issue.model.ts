import mongoose from "mongoose";

interface IIssue {
    title: string,
    text: string,
    column: number
}

interface IssueModelInterface extends mongoose.Model<IssueDoc> {
    build(attr: IIssue): IssueDoc
}

interface IssueDoc extends mongoose.Document {
    title: string,
    text: string,
    column: number
}

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    column: {
        type: Number,
        required: true
    }
})

issueSchema.statics.build = (attr: IIssue) => {
    return new Issue(attr);
}

const Issue = mongoose.model<IssueDoc, IssueModelInterface>("issues", issueSchema);

export { Issue, IIssue, IssueDoc };