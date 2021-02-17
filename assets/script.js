//Functions
function getHistory() {
  return document.getElementById("history-value").innerText;
}
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = formattedNumber(num);
  }
}
function formattedNumber(num) {
  return Number(num).toLocaleString("en");
}
function removeFormat(num) {
  return Number(num.replace(/,/g, ""));
}

//Logics
let operators = document.getElementsByClassName("operator");
let numbers = document.getElementsByClassName("number");

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    let output = removeFormat(getOutput()).toString();
    if (output != "") {
      if (this.id === "clear") {
        printOutput("");
        printHistory("");
      } else if (this.id === "backspace") {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      } else {
        let output = getOutput();
        let history = getHistory();
        if (output == "" && history != "") {
          if (isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1) + this.id;
            printHistory(history);
          }
        }
        if (output != "") {
          output = removeFormat(output);
          history += output;
          if (this.id === "=") {
            let result = eval(history);
            printOutput(result);
            printHistory("");
          } else {
            history += this.id;
            printHistory(history);
            printOutput("");
          }
        }
      }
    }
  });
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    let output = removeFormat(getOutput());
    if (output != NaN) {
      output += this.id;
      printOutput(output);
    }
  });
}
