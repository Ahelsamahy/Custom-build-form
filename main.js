var selectValue = [];

function getInputForSelect() {
  var inputData = document.querySelectorAll("#selectInputContainer [type='text']");
  for (var i = 0; i < inputData.length; i++) {
    if (inputData[i].value.length >0) {
      selectValue.push(inputData[i].value)
    }
  }
  console.log(selectValue);
  return false;
}

var i = 0;
var original = document.getElementsByClassName("tableRow")[0];

function duplicate() {
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "";
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.appendChild(clone);
}

