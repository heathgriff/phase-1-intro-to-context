// Your code here
function createEmployeeRecord(employee) {
    // console.log(employee)

    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(" ");
    // console.log("event", dateStamp)
    // const arrFromDate = event.toString().split(" ")
    // const date = arrFromDate[0]
    // const hour = arrFromDate[1]

    //console.log("date, hour", date, hour)

    const eventObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    };

    //console.log(timeIn)

    //employee.timeInEvents = [...employee.timeInEvents, eventObj]

    employee.timeInEvents.push(eventObj)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    const eventObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    };

    employee.timeOutEvents.push(eventObj)
    return employee
}

function hoursWorkedOnDate(employee, workDate) {
    // console.log("date", date)
    const timeIn = employee.timeInEvents.find(e => e.date === workDate)
    const timeOut = employee.timeOutEvents.find(e => e.date === workDate)

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, targetDate) {
    const hours = hoursWorkedOnDate(employee, targetDate)

    // console.log("date", date)
    // console.log("hours", hours)

    console.log(employee)

    const wagesEarned = employee.payPerHour * hours

    return wagesEarned

    // return hoursWorkedOnDate.call(employee, targetDate) * employee.payPerHour
}

function calculatePayroll(employeeRecords) {
    // console.log("employee records", employeeRecords)

//    const record = employeeRecords.map(employee => allWagesFor.bind(employee))
//     console.log(record)

    return employeeRecords.map(employee => allWagesFor.call(employee)).reduce((currentValue, total) => currentValue + total)    

}

function findEmployeeByFirstName(employees, firstNameString) {
    //console.log(employees)

    return employees.find(emp => emp.firstName === firstNameString)
}

const allWagesFor = function () {
    const eligableDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligableDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}