import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function PUT(req: NextApiRequest) {
    try {
        const { issueKey } = req.query;
        const { fieldId, value } = req.body;

        if (!issueKey)
            return Response.json({ message: 'Missing issue key' }, { status: 401 });

        if (!fieldId)
            return Response.json({ message: 'fieldId is required in the request body.' }, { status: 400 });

        if (!value)
            return Response.json({ message: 'value is required in the request body for the field.' }, { status: 400 });
        
        const jira = new JiraService();
        await jira.updateIssue(String(issueKey), {
            fields: {
                [fieldId]: value,
            },
        });

        return Response.json(null, { status: 204 });

    } catch (err: AxiosError | any) {
        return Response.json({
            message: "Failed to update ticket state",
            error: err.message
        }, {
            status: 500
        })
    }
}