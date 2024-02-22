const core = require("@actions/core");
const github = require("@actions/github");
const comment = require("./comment");

async function run() {
  try {
    const baseBranch = github.context.payload.pull_request.base.ref;
    const headBranch = github.context.payload.pull_request.head.ref;

    // Define allowed branch pairs
    const allowedBranchPairs = [
      { base: "main", headPrefix: "feature/" },
      { base: "main", headPrefix: "fix/" },
      { base: "23.09", headPrefix: "hotfix/" },
      { base: "24.03", headPrefix: "hotfix/" },
    ];

    // Check if the branch pair is allowed
    const isAllowedPair = allowedBranchPairs.some(pair =>
      baseBranch === pair.base && headBranch.startsWith(pair.headPrefix)
    );

    if (!isAllowedPair) {
      const message = 'Warning: This pull request has an invalid branch pair. Please check the branch naming convention.';
      // Add your logic to post the comment to the pull request
      await comment.create(message);

      // Fail the workflow
      core.setFailed(message);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
