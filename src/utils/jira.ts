import axios, { AxiosError, AxiosInstance } from 'axios';

export type JiraOptions = {
    fields?: string;
    maxResults?: number;
    startAt?: number;
    expand?: string;
}

class JiraService {
    private instance: AxiosInstance;

    constructor() {
        const baseUrl = process.env.JIRA_BASE_URL;
        const auth = process.env.JIRA_PAT;

        if (!baseUrl || !auth) throw Error("BaseURL and Auth are required, Please provide both in evironment variables.");

        this.instance = axios.create({
            baseURL: baseUrl + '/rest/api/2/',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Searches for JIRA issues using JQL.
     * @param {string} jql - The JIRA Query Language string.
     * @param {JiraOptions} options - Optional parameters like fields, maxResults, startAt.
     * @returns {Promise<object>} - The search results from JIRA.
    */
    public async searchIssues(jql: string, options: JiraOptions = {}) {
        try {
            const params = {
                jql: jql,
                fields: options.fields || 'summary,status,issuetype,priority,created,updated,assignee,labels',
                expand: 'renderedFields',
                maxResults: options.maxResults || 50,
                startAt: options.startAt || 0,
                validateQuery: 'strict',
            };
            const response = await this.instance.get('/search', { params });
            return response.data;
        } catch (error: AxiosError | any) {
            console.error('JIRA API Error (searchIssues):', error.response ? error.response.data : error.message);
            throw new Error(`Failed to search JIRA issues: ${error.message}`);
        }
    }

    /**
     * Fetches details for a specific issue, optionally expanding fields like comments or changelog.
     * @param {string} issueIdOrKey - The JIRA issue ID or key (e.g., 'PROJECT-123').
     * @param {JiraOptions} options - Optional parameters like fields, expand.
     * @returns {Promise<object>} - The issue details from JIRA.
     */
    public async getIssue(issueKey: string, options: JiraOptions = {}) {
        try {
            const params = {
                fields: options.fields,
                expand: options.expand,
            };
            const response = await this.instance.get(`/issue/${issueKey}`, { params });
            return response.data;
        } catch (error: AxiosError | any) {
            console.error(`JIRA API Error (getIssue ${issueKey}):`, error.response ? error.response.data : error.message);
            throw new Error(`Failed to get JIRA issue ${issueKey}: ${error.message}`);
        }
    }

    /**
     * Fetches comments for a specific issue.
     * @param {string} issueIdOrKey - The JIRA issue ID or key.
     * @returns {Promise<object>} - The comments data from JIRA.
     */
    public async getIssueComments(issueKey: string) {
        try {
            const response = await this.instance.get(`/issue/${issueKey}/comment`, {
                params: {
                    orderBy: '-created'
                }
            });
            return response.data;
        } catch (error: AxiosError | any) {
            console.error(`JIRA API Error (getIssueComments ${issueKey}):`, error.response ? error.response.data : error.message);
            throw new Error(`Failed to get comments for JIRA issue ${issueKey}: ${error.message}`);
        }
    }

    /**
     * Adds a comment to a specific issue.
     * @param {string} issueIdOrKey - The JIRA issue ID or key.
     * @param {string} commentBody - The text content of the comment.
     * @returns {Promise<object>} - The newly created comment object from JIRA.
     */
    public async addIssueComment(issueKey: string, comment: string) {
        try {
            const response = await this.instance.post(`/issue/${issueKey}/comment`, {
                body: {
                    body: comment
                }
            });
            return response.data;
        } catch (error: AxiosError | any) {
            console.error(`JIRA API Error (addIssueComment ${issueKey}):`, error.response ? error.response.data : error.message);
            throw new Error(`Failed to add comment to JIRA issue ${issueKey}: ${error.message}`);
        }
    }

    /**
     * Updates an issue, commonly used for adding labels.
     * @param {string} issueIdOrKey - The JIRA issue ID or key.
     * @param {object} updatePayload - The payload describing the update.
     * @returns {Promise<void>} - Resolves on success.
     */
    public async updateIssue(issueKey: string, fields: object) {
        try {
            await this.instance.put(`/issue/${issueKey}`, fields);
        } catch (error: AxiosError | any) {
            console.error(`JIRA API Error (updateIssue ${issueKey}):`, error.response ? error.response.data : error.message);
            throw new Error(`Failed to update JIRA issue ${issueKey}: ${error.message}`);
        }
    }

    /**
     * Fetches details for the currently authenticated user (via PAT).
     * @returns {Promise<object>} - The user details object from JIRA.
     */
    public async getMyself() {
        try {
            const response = await this.instance.get('/myself');
            return response.data;
        } catch (error: AxiosError | any) {
            console.error('JIRA API Error (getMyself):', error.response ? error.response.data : error.message);
            throw new Error(`Failed to fetch JIRA user details: ${error.message}`);
        }
    }
}

export default JiraService;