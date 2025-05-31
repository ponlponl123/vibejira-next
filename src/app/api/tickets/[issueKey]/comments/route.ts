import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    try {
        const { issueKey } = req.query;

        if (!issueKey)
            return Response.json({ message: 'Missing issue key' }, { status: 401 });
        
        const jira = new JiraService();
        const commentsData = await jira.getIssueComments(String(issueKey));

        return Response.json(commentsData);

    } catch (err: AxiosError | any) {
        return Response.json({
            message: err.message
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextApiRequest) {
    try {
        const { issueKey } = req.query;
        const { body } = req.body;

        if (!issueKey)
            return Response.json({ message: 'Missing issue key' }, { status: 401 });

        if (!body)
            return Response.json({ message: 'Comment body is required.' }, { status: 400 });
        
        const jira = new JiraService();
        const commentsData = await jira.addIssueComment(String(issueKey), body);

        return Response.json(commentsData, { status: 201 });

    } catch (err: AxiosError | any) {
        return Response.json({
            message: err.message
        }, {
            status: 500
        })
    }
}