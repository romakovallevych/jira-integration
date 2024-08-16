const { createIssue, getIssue } = require('./src/jira');

async function main() {
  try {
    // Create an issue with a valid issue type (e.g., 'Task')
    const newIssue = await createIssue('TEST', 'Issue for MindyGem', 'This issue was created using the Jira REST API'); // Ensure 'Task' is a valid issue type
    console.log('New issue created:', newIssue);

    // Get the details of the newly created issue
    const issueKey = newIssue.key;
    const issueDetails = await getIssue(issueKey);
    console.log('Issue details:', issueDetails);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
