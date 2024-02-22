const core = require("@actions/core");
const github = require("@actions/github");

const GITHUB_TOKEN = core.getInput("github-token", { required: true });

/**
 * 
 * @param {string} body The message to write in a comment.
 */
export async function create(body) {
  const octokit = github.getOctokit(GITHUB_TOKEN);
  await octokit.rest.issues.createComment({
    issue_number: github.context.issue.number,
    owner: github.context.repo.owner,
    repo: github.context.repo,repo,
    body: body,
  })
}
