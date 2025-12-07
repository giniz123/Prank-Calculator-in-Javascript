const allbuttonsElm = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");

let strToDisplay = "";

let lastOperator = "";

// loading audio
const audio = new Audio("./assets/prank.mp3");

const operators = ["%", "/", "*", "-", "+"];

// To retrive the actual value or text of buttons after getting clicked and passing
// to display function
const buttonAddingToString = (buttonText) => {
  displayElm.classList.remove("prank");
  console.log(buttonText);
  if (buttonText === "AC") {
    strToDisplay = "";
    return display(strToDisplay);
  }

  if (buttonText === "C") {
    console.log(strToDisplay);
    strToDisplay = strToDisplay.slice(0, -1);
    return display(strToDisplay);
  }

  if (buttonText === "=") {
    lastOperator = "";
    const lastCharacter = strToDisplay.charAt(strToDisplay.length - 1);

    if (operators.includes(lastCharacter)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
    return calculatingTotal();
  }

  if (operators.includes(buttonText)) {
    lastOperator = buttonText;
    const lastCharacter = strToDisplay.charAt(strToDisplay.length - 1);
    if (operators.includes(lastCharacter)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  if (buttonText === ".") {
    const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
    const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

    // Checking the condition of initial number set where there'll not be any latest
    // operator

    if (!lastOperator && strToDisplay.includes(".")) {
      return;
    }

    // Checking the condition of number sets after initial number set where
    // there'll be latest operator before number set

    if (lastNumberSet.includes(".")) {
      return;
    }
  }
  strToDisplay += buttonText;
  display(strToDisplay);
};

// Getting into each button with forEach method and trying to get each button. After
// that making each button clickable
allbuttonsElm.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.style.background = "white";
    btn.style.scale = "0.9";
  });
  btn.addEventListener("click", () => {
    btn.style.background = "yellow";
    btn.style.scale = "1";
    const value = btn.innerText;
    buttonAddingToString(value);
  });
});

// Whatever buttons are clicked, they're simply displaying in display element
const display = (str) => {
  displayElm.innerText = str || "0.0";
};

// Calculate total
const calculatingTotal = () => {
  const randomExtraValue = randomValue();
  if (randomExtraValue) {
    changeDisplayForRandomNum();
    audio.play();
  }
  const total = eval(strToDisplay) + randomExtraValue;
  strToDisplay = total.toString();
  return display(strToDisplay);
};
const randomValue = () => {
  const randomNum = Math.round(Math.random() * 10);

  return randomNum < 3 ? randomNum : 0;
};

const changeDisplayForRandomNum = () => {
  displayElm.classList.add("prank");
};
