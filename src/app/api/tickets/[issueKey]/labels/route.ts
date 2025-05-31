import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function PUT(
    req: NextApiRequest,
    { params }: { params: Promise<{ issueKey: string }> }
) {
    try {
        const { issueKey } = await params;
        const { label } = req.body;

        if (!issueKey)
            return Response.json({ message: 'Missing issue key' }, { status: 401 });

        if (!label)
            return Response.json({ message: 'Label is required.' }, { status: 400 });
        
        const jira = new JiraService();
        await jira.updateIssue(String(issueKey), {
            update: {
                labels: [
                    { add: label } 
                ]
            }
        });

        return Response.json(null, { status: 204 });

    } catch (err: AxiosError | any) {
        return Response.json({
            message: err.message
        }, {
            status: 500
        })
    }
}