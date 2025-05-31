import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function PUT(req: NextApiRequest) {
    try {
        const { issueKey } = req.query;

        // Expected: 'pending', 'completed', 'moreInfo', 'rejected', 'nri'
        const { targetState } = req.body;

        if (!issueKey)
            return Response.json({ message: 'Missing issue key' }, { status: 401 });

        if (!targetState)
            return Response.json({ message: 'Target state is required.' }, { status: 400 });

        const labelsToRemove = [
            'RCCL_TRIAGE_PENDING',
            'RCCL_TRIAGE_COMPLETED',
            'RCCL_TRIAGE_NEED_MORE_INFO',
            'RCCL_TRIAGE_REJECTED',
            'RCCL_TRIAGE_NRI'
        ];

        let labelToAdd = '';
        switch (targetState) {
            case 'pending':
                labelToAdd = 'RCCL_TRIAGE_PENDING';
                break;
            case 'completed':
                labelToAdd = 'RCCL_TRIAGE_COMPLETED';
                break;
            case 'moreInfo':
                labelToAdd = 'RCCL_TRIAGE_NEED_MORE_INFO';
                break;
            case 'rejected':
                labelToAdd = 'RCCL_TRIAGE_REJECTED';
                break;
            case 'nri':
                labelToAdd = 'RCCL_TRIAGE_NRI';
                break;
            default:
                return Response.json({ message: 'Invalid target state.' }, { status: 400 });
        }

        const removeOperations = labelsToRemove.map(label => ({ remove: label }));
        const addOperation = [{ add: labelToAdd }];
        
        const jira = new JiraService();
        await jira.updateIssue(String(issueKey), {
            update: {
                labels: [
                    ...removeOperations,
                    ...addOperation
                ],
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