var selectValue = []; // to store the input from user, that will be used in making the values in select list

// called after clicking the "Update value" button to add the user data in the list of select
function getInputForSelect() {
  selectValue = []
  var inputData = document.querySelectorAll("#selectInputContainer [type='text']");
  for (var i = 0; i < inputData.length; i++) {
    //add the input to the selectValue array
    if (inputData[i].value.length > 0) {
      if (selectValue.includes(String(inputData[i].value))) {
        alert("please enter different values");
        inputData[i].value = "";
      }
      else if (inputData[i].value.length > 20) {
        alert("please enter less than 20 character");
        inputData[i].value = "";
      }
      else {
        selectValue.push(String(inputData[i].value))
      }
    }
  }

  if (selectValue.length > 1) {
    document.getElementById("generateTable").style.display = "block";
    addSelectChild();
  } else {
    alert("please at least enter two inputs in the text box");
  }

  return false;
}

//update all labels


function addSelectChild() {
  var selectParent = document.getElementById("userPreEnteredValue");
  selectParent.innerHTML = "";
  var html = "";
  for (var i = 0; i < selectValue.length; i++) {
    html += "<option value=" + selectValue[i] + ">" + selectValue[i] + "</option>" + "<br>";
  }

  selectParent.innerHTML = html;
}


var selectInputIndex = 3;
function createInputData() {
  if (selectInputIndex < 10) {
    var GTB = document.getElementById("selectInputActionButton");
    selectInputIndex++;
    var elDiv = document.createElement('div');    // the container div for new input
    const newLabelInput = document.createElement("label");
    const textnode = document.createTextNode(selectInputIndex + "th value");
    newLabelInput.appendChild(textnode);
    elDiv.appendChild(newLabelInput);

    const newTextInput = document.createElement("input");
    newTextInput.setAttribute("type", "text");
    elDiv.appendChild(newTextInput);

    elDiv.setAttribute("id", selectInputIndex + "thInputRowOrder");
    GTB.before(elDiv);
  } else {
    alert("you can't add more than 10 input")
  }
}

function removeLastInputDiv() {
  var e = confirm("Are you sure you want to delete this label? This action can't be undone.")
  if (e == true) {
    document.getElementById(selectInputIndex + "thInputRowOrder").remove();
    selectInputIndex--;
  }
}

var rowIndex = 0;
function duplicate() {
  var original = document.getElementById("tableRow"); // the main one that can't be deleted
  var GTB = document.getElementById("generateTableButton");
  var clone = original.cloneNode(true);
  clone.id = "duplicatedTableRow" + rowIndex++;
  GTB.before(clone);
}

function removeCurrentDiv(e) {
  if (e.parentNode.id != "tableRow") {
    e.parentElement.remove();
  }
}

function getSelectedData() {
  var inputData = document.querySelectorAll(".newEntry");
  let Dictionary = [];
  for (var x = 0; x < inputData.length; x++) {
    var selection = inputData[x].options[inputData[x].selectedIndex].text;
    //go one level up in the same div
    var parent = inputData[x].parentNode;
    //find the text input in the div and get the data in it
    var value = parent.querySelector("[type = 'text']").value;
    if (value.length > 0) { //to check if there is value in it
      Dictionary.push([selection, value]);
    }
  }
  if (Dictionary.length == 0) {
    alert("Please enter data to show in the table")
  } else {
    mergeCells(Dictionary);
  }
}

function mergeCells(Dictionary) {
  var totals = {}
  for (const element of Dictionary) {
    totals[element[0]] = (totals[element[0]] || 0) + "," + element[1];
  }
  totals = Object.entries(totals); //make it as an array

  var tableRowCount = 0;
  //remove the first zero that is added
  for (const bid of totals) {
    bid[1] = bid[1].substring(2);
    //count the maximum entries for each data to decide the table rows
    if (tableRowCount < bid[1].split(",").length) {
      tableRowCount = bid[1].split(",").length + 1; // +1 to save a place for the header
    }
  }
  createTable(totals, tableRowCount);
}

function createTable(Dictionary, tableRowCount) {

  //get the header title only from the dictionary
  var header = [];
  for (var x = 0; x < Dictionary.length; x++) {
    if (header.includes(Dictionary[x][0]) == false) {
      header.push(Dictionary[x][0])
    }
  }
  // Dictionary.sort((a, b) => a[0].localeCompare(b[0])); in case of showing in order

  const table = document.getElementById('resultedTable');
  table.innerHTML = "";

  //create empty table
  for (let rowIndex = 0; rowIndex < tableRowCount; rowIndex++) {
    var row = document.createElement("tr");
    for (let colIndex = 0; colIndex < header.length; colIndex++) {
      const cell = document.createElement('td');
      var cellContents = document.createTextNode("0");
      cell.appendChild(cellContents);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);

  console.log("rows = " + tableRowCount)

  //fill the table from user entries
  for (let x = 0; x < header.length; x++) {
    table.rows[0].cells[x].innerHTML = header[x];
    var entryArray = Dictionary[x][1].split(',');
    for (let innerDic = 0; innerDic < entryArray.length; innerDic++) {
      table.rows[innerDic + 1].cells[x].innerHTML = entryArray[innerDic];
    }
  }
}

