require('dotenv').config();

module.exports = {
  jira: {
    domain: process.env.JIRA_DOMAIN,
    email: process.env.JIRA_EMAIL,
    apiToken: process.env.JIRA_API_TOKEN
  }
};
