const allButtonsElement = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");
// console.log(allButtonsElement);

let calculus = "";

const operators = ["%", "/", "*", "-", "+"];

let lastOperator = "";

const buttonAction = (val) => {
  console.log(val);

  if (val === "AC") {
    calculus = "";

    return display();
  }

  if (val === "C") {
    // calculus = calculus.slice(0, -1);
    calculus = calculus.slice(0, -1);

    return displayTotal();
  }

  if (val === "=") {
    lastOperator = "";
    const lastChar = calculus.charAt(calculus.length - 1);
    if (operators.includes(lastChar)) {
      calculus = calculus.slice(0, -1);
    }
    return displayTotal();
  }
  // Allowing only one "." per number set

  if (val === ".") {
    const lastOperatorIndex = calculus.lastIndexOf(lastOperator);
    const lastNumberSet = calculus.slice(lastOperatorIndex);
    if (lastNumberSet === ".") {
      return;
    }
    if (!lastOperator && calculus.includes(".")) {
      return;
    }
  }

  if (operators.includes(val)) {
    lastOperator = val;
    const lastChar = calculus.charAt(calculus.length - 1);
    if (operators.includes(lastChar)) {
      calculus = calculus.slice(0, -1);
    }
  }
  calculus += val;
  display(calculus);
};

allButtonsElement.forEach((btn) => {
  //   console.log(btn);

  btn.addEventListener("click", () => {
    const btnText = btn.innerText;
    buttonAction(btnText);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.0";
};

// calculate

const displayTotal = () => {
  const total = eval(calculus);
  display(total);
  calculus = total.toString();
};
