const core = require('@actions/core');
const github = require('@actions/github');

async function run(){
    console.log('Running');
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');

    const octokit = github.getOctokit(GITHUB_TOKEN);
    console.log('octokit', JSON.stringify(octokit));
    console.log('octokit.rest.issues', JSON.stringify(octokit.rest.issues));

    const { context = {} } = github;
    const { pull_request } = context.payload;

    await octokit.rest.issues.createComment({
        ...github.context.repo,
        issue_number: pull_request.number,
        body: 'Thanks'
    });

}

run();