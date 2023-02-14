function getInputForSelect() {
  var mainContainer = document.querySelectorAll("#selectInputContainer [type='text']");
  var selectValue = [];
  for (var i = 0; i < mainContainer.length; i++) {
     selectValue.push(mainContainer[i].value)
  }
  console.log(selectValue[1]);
}