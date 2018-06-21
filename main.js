const registeredDrivers = new Set();

// string variable for displaying user error messages, prompts, etc
let userAlert;

function _printReport() {
  let driverList = document.getElementById('driverList');
  driverList.innerHTML = "";

  registeredDrivers.forEach(function(driverObj) {
    let driverListItem = document.createElement("li")

    let driverPrint;
    if (driverObj.distance === 0) {
      driverPrint = driverObj.name + ': ' +
        driverObj.distance;
    } else {
      driverPrint = driverObj.name + ': ' +
        driverObj.distance + ' miles @ ' + driverObj.mph + ' mph';
    }

    driverListItem.innerHTML = driverPrint;
    document.getElementById("driverList").appendChild(driverListItem);
  });
}


function logTrip() {
  let driverName = document.getElementById('driverSelect').value;
  let tripInfo = document.getElementById('tripInfo').value;

  function _findMinutes(timeString) {
    let hrs = new Number(timeString[0]);
    let mins = new Number(timeString[1]);
    return (hrs * 60) + mins;
  }

  let start = _findMinutes(tripInfo.substring(0,5).split(':'));
  let end = _findMinutes(tripInfo.substring(6,11).split(':'));
  let distance = Math.round(Number.parseFloat(tripInfo.substring(12,17)));

  let hours = (end - start)/60;
  let mph = distance / hours;

  if ((mph >= 5) && (mph <= 100)) {
    registeredDrivers.forEach(function(driverObj) {
      if (driverObj.name === driverName) {
        driverObj.distance += distance;
        driverObj.hours += hours;
        driverObj.mph = Math.round(driverObj.distance / (driverObj.hours));
      }
    });
  } else {
    userAlert = 'This trip did not meet the criteria. Please enter new values.';
  }

  _printReport();
}


function registerDriver() {
  console.log((typeof registeredDrivers))
  let driverName = document.getElementById('driverName').value;

  if (registeredDrivers.has(driverName)) {
    userAlert =
      'This driver has already been registered. Please choose another name.';
  } else {
    registeredDrivers.add(
      {
        name:driverName,
        mph:0,
        distance:0,
        hours:0,
      }
    );

    _buildSelectList(driverName);
    userAlert = 'Driver successfully registered.';
  }

  document.getElementById('userAlert').innerHTML = userAlert;
  document.getElementById('driverName').value = '';
}


function _buildSelectList(driverName) {
  let driverSelect = document.getElementById('driverSelect');
  let driverOption = document.createElement("option")

  driverOption.setAttribute("value", driverName);
  driverOption.setAttribute("id", driverName);
  driverOption.appendChild(document.createTextNode(driverName));

  document.getElementById("driverSelect").appendChild(driverOption);
}
