import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    try {
        const { selectedDateFilter, startDate, endDate, activeAssigneeFilter } = req.query;
        const defectTypeForCards = `issuetype = Defect`;
        const generalRcclTriageLabels = `labels in (RCCL_TRIAGE_COMPLETED, RCCL_TRIAGE_PENDING, RCCL_TRIAGE_NEED_MORE_INFO, RCCL_TRIAGE_REJECTED)`;

        let dateFilterJql = '';
        if (selectedDateFilter === 'week') dateFilterJql = ' AND updated >= -7d'; 
        else if (selectedDateFilter === 'month') dateFilterJql = ' AND updated >= -30d';
        else if (selectedDateFilter === 'range' && startDate && endDate) dateFilterJql = ` AND updated >= "${startDate}" AND updated <= "${endDate}"`;

        let assigneeFilterJql = '';
        if (activeAssigneeFilter === 'avinash') assigneeFilterJql = ' AND assignee = "Potnuru, Avinash"';
        else if (activeAssigneeFilter === 'marzieh') assigneeFilterJql = ' AND assignee = "Berenjkoub, Marzieh"';
        else if (activeAssigneeFilter === 'me') assigneeFilterJql = ' AND assignee = "Patinyasakdikul, Arm"';        interface JiraIssue {
            fields: {
                labels: string[];
                status: { name: string };
                priority?: { name: string };
            };
        }

        // Build a single consolidated JQL query
        const combinedJql = `${defectTypeForCards} AND (
            (labels = RCCL_TRIAGE_PENDING) OR
            (labels = RCCL_TRIAGE_NEED_MORE_INFO) OR
            (${generalRcclTriageLabels} AND status in (Opened, Assessed, Analyzed)${assigneeFilterJql}${dateFilterJql}) OR
            (${generalRcclTriageLabels} AND priority = "P1 (Gating)" AND status in (Opened, Assessed, Analyzed)${assigneeFilterJql}${dateFilterJql}) OR
            (${generalRcclTriageLabels} AND status in (Implemented, Closed)${assigneeFilterJql}${dateFilterJql}) OR
            ((labels = RCCL_TRIAGE_REJECTED OR (${generalRcclTriageLabels} AND status = Rejected))${assigneeFilterJql}${dateFilterJql})
        )`;

        const jira = new JiraService();
        const searchResult = await jira.searchIssues(combinedJql);
        
        // Process results to count issues in each category
        const triagePendingCount = (searchResult.issues as JiraIssue[]).filter(issue => 
            issue.fields.labels.includes('RCCL_TRIAGE_PENDING')).length;
            
        const waitingForInfoCount = (searchResult.issues as JiraIssue[]).filter(issue => 
            issue.fields.labels.includes('RCCL_TRIAGE_NEED_MORE_INFO')).length;
            
        const inProgressCount = (searchResult.issues as JiraIssue[]).filter(issue => 
            ['Opened', 'Assessed', 'Analyzed'].includes(issue.fields.status.name) &&
            !issue.fields.labels.includes('RCCL_TRIAGE_PENDING') &&
            !issue.fields.labels.includes('RCCL_TRIAGE_NEED_MORE_INFO')).length;
            
        const activeP1Count = (searchResult.issues as JiraIssue[]).filter(issue => 
            ['Opened', 'Assessed', 'Analyzed'].includes(issue.fields.status.name) &&
            issue.fields.priority?.name === 'P1 (Gating)').length;
            
        const completedCount = (searchResult.issues as JiraIssue[]).filter(issue => 
            ['Implemented', 'Closed'].includes(issue.fields.status.name)).length;
            
        const rejectedCount = (searchResult.issues as JiraIssue[]).filter(issue => 
            issue.fields.labels.includes('RCCL_TRIAGE_REJECTED') ||
            issue.fields.status.name === 'Rejected').length;
    
        return Response.json({
            triagePending: triagePendingCount,
            inProgress: inProgressCount,
            activeP1: activeP1Count,
            completedToday: completedCount,
            rejected: rejectedCount,
            waitingForInfo: waitingForInfoCount,
        });

    } catch (err: AxiosError | any) {
        return Response.json({
            message: "Failed to fetch dashboard summary data",
            error: err.message
        }, {
            status: 500
        })
    }
}