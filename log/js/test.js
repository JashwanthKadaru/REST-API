// Just a test file to run the imported logger module to see if the functions do what they are meant to do.

const path = require('path')
const { logAdminAction, logUserAction, logSensitiveAction } = require(path.join(
  __dirname,
  'logger'
))
const ActionString = require(path.join(__dirname, 'logStrings'))

logAdminAction(
  new ActionString(
    '64a36d073fc6725c5a6819e0',
    '/',
    'POST',
    'add user',
    'SUCCESS',
    'Desktop'
  ).actionString
)

logUserAction(
  new ActionString(
    '64a36d073fc6725c5a6819e0',
    '/',
    'POST',
    'add user',
    'SUCCESS',
    'Desktop'
  ).actionString
)

logSensitiveAction(
  new ActionString(
    '64a36d073fc6725c5a6819e0',
    '/',
    'POST',
    'add user',
    'SUCCESS',
    'Desktop'
  ).actionString
)
