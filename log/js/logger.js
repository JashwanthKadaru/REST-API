const fs = require('fs').promises
const path = require('path')

// Separation of work makes it easier to later improvize and specialize
// each of the loggers to suit their purpose.

// A logger to log admin Actions
async function logAdminAction(actionString) {
  try {
    await fs.appendFile(
      path.join(__dirname, '..', 'files', 'adminactions.txt'),
      actionString
    )
  } catch (err) {
    logAdminAction(actionString)
  }
}

// A logger to log admin Actions
async function logUserAction(actionString) {
  try {
    await fs.appendFile(
      path.join(__dirname, '..', 'files', 'useractions.txt'),
      actionString
    )
  } catch (err) {
    logUserAction(actionString)
  }
}

// A logger to log sensitive Actions (both admin and users)
// this involves actions that change the user data or change the application state or
// Standard admin operations that affect database state.
async function logSensitiveAction(actionString) {
  try {
    await fs.appendFile(
      path.join(__dirname, '..', 'files', 'sensitiveactions.txt'),
      actionString
    )
  } catch (err) {
    logSensitiveAction(actionString)
  }
}

module.exports = { logAdminAction, logUserAction, logSensitiveAction }
