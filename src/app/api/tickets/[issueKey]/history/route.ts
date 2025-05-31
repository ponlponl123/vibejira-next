import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function GET(
    req: NextApiRequest,
    { params }: { params: Promise<{ issueKey: string }> }
) {
    try {
        const { issueKey } = await params;

        if (!issueKey)
            return Response.json({ message: 'Missing issue key' }, { status: 401 });
        
        const jira = new JiraService();
        const issueData = await jira.getIssue(String(issueKey), { expand: 'changelog' });

        return Response.json(issueData, { status: 204 });

    } catch (err: AxiosError | any) {
        return Response.json({
            message: err.message
        }, {
            status: 500
        })
    }
}