const axios = require('axios');
const { jira } = require('../config/config');

// Base64 encode your email and API token
const auth = Buffer.from(jira.email + ':' + jira.apiToken).toString('base64');

// Function to create an issue with ADF description
async function createIssue(projectKey, summary, descriptionText, issueType = 'Initiative') {
  const url = 'https://' + jira.domain + '/rest/api/3/issue';

  // ADF formatted description
  const description = {
    type: 'doc',
    version: 1,
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: descriptionText
          }
        ]
      }
    ]
  };

  const issueData = {
    fields: {
      project: {
        key: projectKey
      },
      summary: summary,
      description: description,
      issuetype: {
        name: issueType // Ensure that 'name' is the correct field here
      }
    }
  };

  console.log('Request payload:', JSON.stringify(issueData, null, 2)); // Log the request payload for debugging

  try {
    const response = await axios.post(url, issueData, {
      headers: {
        'Authorization': 'Basic ' + auth,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating issue:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { createIssue };
