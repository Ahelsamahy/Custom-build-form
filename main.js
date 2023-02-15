var selectValue = []; // to store the input from user, that will be used in making the values in select list

// called after clicking the "Update value" button to add the user data in the list of select
function getInputForSelect() {
  selectValue = []
  var inputData = document.querySelectorAll("#selectInputContainer [type='text']");
  for (var i = 0; i < inputData.length; i++) {
    if (inputData[i].value.length > 0) {
      selectValue.push(String(inputData[i].value))
    }
  }
  console.log(selectValue);
  if (selectValue.length > 1) {
    document.getElementById("generateTable").style.display = "block";
  } else {
    alert("please at least enter two values in the values");
  }
  addSelectChild();
  return false;
}

function addSelectChild() {
  var selectParent = document.getElementById("userPreEnteredValue");
  selectParent.innerHTML = "";
  var html = "";
  for (var i = 0; i < selectValue.length; i++) {
    html += "<option value=" + selectValue[i] + ">" + selectValue[i] + "</option>" + "<br>";
  }

  selectParent.innerHTML = html;
}

var rowIndex = 0;

function duplicate() {
  var original = document.getElementById("tableRow");
  var GTB = document.getElementById("generateTableButton");
  var clone = original.cloneNode(true);
  clone.id = "duplicatedTableRow" + rowIndex++;
  GTB.before(clone);
  // original.parentNode.appendChild(clone);

}

function removeDiv(e) {
  if (e.parentNode.id != "tableRow") {
    e.parentElement.remove();
  }
}

function getSelectedData() {
  var inputData = document.querySelectorAll(".newEntry");
  console.log(inputData.length);
  let Dictionary = [];
  for (var x = 0; x < inputData.length; x++) {
    let selection = inputData[x].options[inputData[x].selectedIndex].text;
    //go one level up in the same div
    var parent = inputData[x].parentNode;
    //find the text input in the div and get the data in it
    let value = parent.querySelector("[type = 'text']").value;
    Dictionary.push([selection, value]);
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
    // console.log(bid[1]);
    //count the maximum entries for each data to decide the table rows
    if (tableRowCount < bid[1].split(",").length) {
      tableRowCount = bid[1].split(",").length + 1;
    }
  }
  createTable(totals, tableRowCount);
}