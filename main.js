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

}