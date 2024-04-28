function createEmployeeRecord(employeeArray) {
    let employeeRecord = {}
    employeeRecord.firstName = employeeArray[0]
    employeeRecord.familyName = employeeArray[1]
    employeeRecord.title = employeeArray[2]
    employeeRecord.payPerHour = employeeArray[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays){
    let employeeRecords = []
    for (let i = 0; i < arrayOfArrays.length; i++){
        let employeeRecord = createEmployeeRecord(arrayOfArrays[i])
        employeeRecords.push(employeeRecord)
    }
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateTimeString){
    let [date, time] = dateTimeString.split(" ")
    let timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10)
    }

    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString){
    let [date, time] = dateTimeString.split(" ")
    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    }

    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeInDate = employeeRecord.timeInEvents.find(element => element.date === date)
    let timeOutDate =  employeeRecord.timeOutEvents.find(element => element.date === date)

    if (timeInDate && timeOutDate){
        let hoursWorked = (timeOutDate.hour - timeInDate.hour) / 100
        return hoursWorked
    }
    else {
        return 0
    }
}

function wagesEarnedOnDate(employeeRecord, date){
    let hours = hoursWorkedOnDate(employeeRecord, date)
    let wage = parseInt(employeeRecord.payPerHour, 10)
    return hours * wage
}

function allWagesFor(employeeRecord){
    let totalWages = employeeRecord.timeInEvents.reduce((acc, timeInEvent) => {
      let date = timeInEvent.date
      let wagesEarned = wagesEarnedOnDate(employeeRecord, date)
      return acc + wagesEarned
    }, 0)
  
    return totalWages
  }

function calculatePayroll(employeeRecords){
    let totalPayroll = employeeRecords.reduce((acc, employeeRecord) => {
        let wages = allWagesFor(employeeRecord)
        return acc + wages
    }, 0)

    return totalPayroll
}