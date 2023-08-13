// a class component that returns formatted String for logging.
// Used with loggers.js module to log information onto the files.

const ActionString = class {
  constructor(userid, route, requestType, request, requestStatus, Device) {
    const date = new Date()
    userid = String(userid)
    userid = userid.padEnd(35, ' ')
    route = '' + route
    route = route.padEnd(35, ' ')
    requestType = '' + requestType
    requestType = requestType.padEnd(12, ' ')
    request = '' + request
    request = request.padEnd(35, ' ')
    requestStatus = '' + requestStatus
    requestStatus = requestStatus.padEnd(9, ' ')

    // console.log(date+userid+route+requestType)
    this.actionString = `${
      date + '\t\t'
    }${userid}${route}${requestType}${request}${requestStatus}${
      '\tfrom: ' + Device
    }\n`
    // console.log(this.actionString)
  }
}

module.exports = ActionString
