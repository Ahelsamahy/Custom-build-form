var selectValue = []; // to store the input from user, that will be used in making the values in select list

function getInputForSelect() {
  var inputData = document.querySelectorAll("#selectInputContainer [type='text']");
  for (var i = 0; i < inputData.length; i++) {
    if (inputData[i].value.length > 0) {
      selectValue.push(inputData[i].value)
    }
  }
  console.log(selectValue);
  return false;
}

var i = 0;
var original = document.getElementById("tableRow");
var GTB = document.getElementById("generateTableButton");


function duplicate() {
  var clone = original.cloneNode(true);
  clone.id = "duplicatedTableRow" + i++;
  GTB.before(clone)
  // original.parentNode.appendChild(clone);
}

function removeDiv(e) {
  if (e.parentNode.id != "tableRow") {
    e.parentElement.remove();
    i--;
  }
}