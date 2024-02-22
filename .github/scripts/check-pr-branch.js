module.exports = async ({ core, github, context }) => {
  try {
    const baseBranch = context.payload.pull_request.base.ref;
    const headBranch = context.payload.pull_request.head.ref;

    // Define allowed branch pairs
    const allowedBranchPairs = [
      { base: "main", headPrefix: "feature/" },
      { base: "main", headPrefix: "fix/" },
      { base: "23.09", headPrefix: "hotfix/" },
      { base: "23.09", headPrefix: "hotfix/" },
    ];

    // Check if the branch pair is allowed
    const isAllowedPair = allowedBranchPairs.some((pair) =>
      baseBranch === pair.base && headBranch.startsWith(pair.headPrefix)
    );

    if (!isAllowedPair) {
      const message = "Warning: This pull request has an invalid branch pair. Please check the branch naming convention.";
      await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: body,
      });

      // Fail the workflow
      core.setFailed(message);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
