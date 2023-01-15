console.log("HELLO")

const billInput = document.getElementById("bill-Input");
const tipBtns = document.querySelectorAll(".tipBtn");
const tipInput = document.getElementById("tip-Input");
const peopleInput = document.getElementById("numberOfPeople-Input");
const tipAmountPersonHTML = document.getElementById("tipAmount/Person");
const totalPersonHTML = document.getElementById("total/Person");
const resetBTN = document.getElementById("resetBTN");
const containerLeft = document.getElementById("container-left");

let billValue = "";
let tipValue = "";
let peopleValue = "";


//Function to make inputs accept only numbers
const onlyNumbers = (event) => {
  const value = event.target.value;
  const newValue = value.replace(/[^0-9]/g, '').trim();
  event.target.value = newValue;
}

const resetValues = () => {
  billInput.value = "";
  billValue = "";
  tipBtns.forEach((btn) => {
    btn.classList.remove("active")
  })
  tipInput.value = "";
  tipValue = "";
  peopleInput.value = "";
  peopleValue = "";

  tipAmountPersonHTML.innerHTML = "$0.00";
  totalPersonHTML.innerHTML = "$0.00";

  splitterOperations();
}

//Function to make all the operations and actions
const splitterOperations = () => {
  let tipAmountPerson = "";
  let totalPerson = "";

  if ((billValue != "" && Number(billValue) != 0) && tipValue != "" && (peopleValue != "" && Number(peopleValue) != 0)) {
    tipAmountPerson = (billValue * (tipValue / 100)) / peopleValue;
    totalPerson = (billValue * (1 + (tipValue / 100)) / peopleValue);

    tipAmountPersonHTML.innerHTML = "$" + Number(tipAmountPerson).toFixed(2);
    totalPersonHTML.innerHTML = "$" + Number(totalPerson).toFixed(2);

    resetBTN.classList.remove("inactive");
    resetBTN.addEventListener('click', resetValues);

  } else {
    tipAmountPersonHTML.innerHTML = "$0.00";
    totalPersonHTML.innerHTML = "$0.00";
    resetBTN.classList.add("inactive");
    resetBTN.removeEventListener('click', resetValues);
  }
} 

//Inputs and btns EventListeners
billInput.addEventListener('input', (event) => {
  const value = billInput.value;
  if (!isNaN(value)) {
    billValue = billInput.value;
    splitterOperations();
  }

  onlyNumbers(event);
});

tipBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tipInput.value = "";

    tipBtns.forEach((btn) => {
      btn.classList.remove("active");
    })

    btn.classList.add("active");
    tipValue = btn.getAttribute("tip-percentage");

    splitterOperations();
  })
})

tipInput.addEventListener('input', (event) => {
  const value = tipInput.value;
  if (!isNaN(value)) {
    tipBtns.forEach((btn) => btn.classList.remove("active"));
    tipValue = tipInput.value;

    splitterOperations();
  }

  onlyNumbers(event);
})

peopleInput.addEventListener('input', (event) => {
  const value = peopleInput.value;
  if (!isNaN(value)) {
    peopleValue = peopleInput.value;
    splitterOperations();
  }

  onlyNumbers(event);
});



//Form validation section

//Validation Functions
const isRequired = value => value === '' ? false : true;
const notZero = value => Number(value) === 0 ? false : true;

//Functions that shows and eliminates "error"
const showError = (input, message) => {

  const formField = input.parentElement;

  formField.classList.remove('success');
  formField.classList.add('error');

  const error = formField.querySelector('small');
  error.textContent = message;
};

const deleteError = (input) => {
  const formField = input.parentElement;

  formField.classList.remove('error');

  const error = formField.querySelector('small');
  error.textContent = '';
}

//Validate Inputs
const checkBillInput = () => {
  let valid = false;
  const inputValue = billInput.value.trim();

  if (!isRequired(inputValue)) {
    showError(billInput, "Bill can't be blank");
  } else if (!notZero(inputValue)) {
    showError(billInput, "Bill can't be zero");
  } else {
    deleteError(billInput);
    valid = true;
  }

  return valid;
}

const checkPeopleInput = () => {
  let valid = false;
  const inputValue = peopleInput.value.trim();

  if (!isRequired(inputValue)) {
    showError(peopleInput, "People can't be blank");
  } else if (!notZero(inputValue)) {
    showError(peopleInput, "People can't be zero");
  } else {
    deleteError(peopleInput);
    valid = true;
  }

  return valid;
}

//Call to validate functions when there's a user types
containerLeft.addEventListener('input', function (e) {
  switch (e.target.id) {
    case 'bill-Input':
      checkBillInput();
      break;
    case 'numberOfPeople-Input':
      checkPeopleInput();
      break;
  }
})