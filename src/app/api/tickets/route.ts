import JiraService from "@/utils/jira";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    try {
        const { filter, jql, fields, startAt, maxResults } = req.query;
        let searchJql = String(jql);

        if (!searchJql)
            switch (filter) {
                case 'p1':
                    searchJql = 'priority = P1 ORDER BY updated DESC';
                    break;
                case 'p2':
                    searchJql = 'priority = P2 ORDER BY updated DESC';
                    break;
                case 'other':
                    searchJql = 'priority not in (P1, P2) ORDER BY updated DESC';
                    break;
                case 'myOpenIssues':
                    searchJql = 'assignee = currentUser() AND resolution = Unresolved ORDER BY updated DESC';
                    break;
                case 'reportedByMe':
                    searchJql = 'reporter = currentUser() ORDER BY created DESC';
                    break;
                case 'all':
                    searchJql = 'ORDER BY updated DESC';
                    break;
                case 'done':
                    searchJql = 'status = Done ORDER BY resolutiondate DESC';
                    break;
                default:
                    searchJql = 'assignee = currentUser() AND resolution = Unresolved ORDER BY updated DESC'; 
            }

        if (!searchJql)
            return Response.json({ message: 'Missing JQL query or valid filter parameter.' }, { status: 400 });
        
        const jira = new JiraService();
        const results = await jira.searchIssues(searchJql, {
            fields: String(fields) || 'summary,status,issuetype,priority,created,updated,assignee,labels,customfield_16104,customfield_15484',
            startAt: parseInt(String(startAt), 10) || 0,
            maxResults: parseInt(String(maxResults), 10) || 50
        });

        return Response.json(results);

    } catch (err: AxiosError | any) {
        return Response.json({
            message: err.message
        }, {
            status: 500
        })
    }
}