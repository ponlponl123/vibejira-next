export interface JiraIssue {
    fields: {
        labels: string[];
        status: { name: string };
        priority?: { name: string };
    };
}