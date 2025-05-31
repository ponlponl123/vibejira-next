# VibeJira Next

> Note: **Disclamer** VibeJira Next is fork version of [VibeJira by Thananon](https://github.com/thananon/vibejira).

A web application to display and interact with JIRA tickets.

## Prerequisites

*   Node.js (v16 or later recommended)
*   npm (usually comes with Node.js) or bun (v1.2.5 or later)
*   A JIRA Cloud instance
*   A JIRA Personal Access Token (PAT) - See [Atlassian Documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) on how to create one. You'll need permissions to read/write JIRA issues.

## Screenshot

- Dark theme
    ![Screenshot](./docs/images/Screenshot_31-5-2025_22343_localhost.jpeg)
- Light theme
    ![Screenshot](./docs/images/Screenshot_31-5-2025_2240_localhost.jpeg)

## Installation

- **with node package manager**
    ```bash
    npm install
    ```
- **with bun**
    ```bash
    bun install
   ```

## Usage

- **Development**

    ```bash
    npm run dev
    ```
    or using bun
    ```bash
    bun run dev
    ```
    ```bash
    bun dev
    ```

- **Production**

    Let's build next.js first with:
    ```bash
    npm run build
    ```
    or using bun
    ```bash
    bun run build
    ```
    ```bash
    bun build
    ```

    Then start the production server:
    ```bash
    npm run start
    ```
    or using bun
    ```bash
    bun run start
    ```
    ```bash
    bun start
    ```

## Roadmap

- [ ] Refactor Code base
- [ ] Dockerimage support