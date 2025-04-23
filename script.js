// Form validation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
const form = document.querySelector("form");
const inputs = document.querySelectorAll(".input");
const text = document.querySelectorAll(".text");
const email = document.querySelector("#email-id");
const invalid = document.querySelector(".invalid");
const invalidEmail = document.querySelector(".invalid-email");
const radios = document.querySelectorAll(".radio");
const radioOne = document.querySelector("#general-enquiry-id");
const radioTwo = document.querySelector("#support-request-id");
const selectedOne = document.querySelector(".radio-one-container");
const selectedTwo = document.querySelector(".radio-two-container");
const checkbox = document.querySelector(".checkbox");
const error = document.querySelectorAll(".error");

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const required = event.target
      .closest(".section")
      .querySelector(".required");
    // input text
    if (input.value.length === 0) {
      required.style.display = "block";
    } else {
      required.style.display = "none";
    }

    // input radio
    if (radioOne.checked) {
      selectedOne.style.border = "1px solid var(--Green-600)";
      selectedOne.style.backgroundColor = "var(--Green-200)";
    } else {
      selectedOne.style.border = "1px solid var(--Grey-500)";
      selectedOne.style.backgroundColor = "transparent";
    }
    
    if (radioTwo.checked) {
      selectedTwo.style.border = "1px solid var(--Green-600)";
      selectedTwo.style.backgroundColor = "var(--Green-200)";
    } else {
      selectedTwo.style.border = "1px solid var(--Grey-500)";
      selectedTwo.style.backgroundColor = "transparent";
    }
  });

  // error
  input.addEventListener("invalid", (event) => {
    const required = event.target
      .closest(".section")
      .querySelector(".required");
    // error text
    if (input.value.length === 0) {
      required.style.display = "block";
    } else {
      required.style.display = "none";
    }

    // error radio
    // https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
    const radioError = document.querySelector(".radio_error");
    for (const radio of radios) {
      if (radio.checked) {
        radioError.style.display = "none";
      } else {
        radioError.style.display = "block";
      }
    }

    // error checkbox on submit
    const checkboxError = document.querySelector(".checkbox_error");
    if (!checkbox.checked) {
      checkboxError.style.display = "block";
    } else {
      checkboxError.style.display = "none";
    }
  });
});

// error checkbox
checkbox.addEventListener("click", (event) => {
  const required = event.target.closest(".section").querySelector(".required");
  if (checkbox.checked) {
    required.style.display = "none";
  } else {
    required.style.display = "block";
  }
});

// Regular expression for email validation as per HTML specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Check if the email is valid
const isValidEmail = () => {
  const validity = email.value.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

// Update email input class based on validity
const setEmailClass = (isValid) => {
  email.className = isValid ? "valid" : "invalid";
};

// Update error message and visibility
const updateError = (isValidInput) => {
  if (isValidInput) {
    invalidEmail.style.display = "none";
  } else {
    invalidEmail.style.display = "block";
  }
};

// Initialize email validity on page load
const initializeValidation = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
};

// Handle input event to update email validity
const handleInput = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  updateError(emailInput);
};

// Handle form submission to show error if email is invalid
const handleSubmit = (event) => {
  event.preventDefault();

  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  updateError(emailInput);

  // display popup
  document.querySelector(".popup").style.display = "block";

  // Reset input
  form.reset();
  // Reset radios
  selectedOne.style.border = "1px solid var(--Grey-500)";
  selectedOne.style.backgroundColor = "transparent";
  selectedTwo.style.border = "1px solid var(--Grey-500)";
  selectedTwo.style.backgroundColor = "transparent";
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
window.addEventListener("load", initializeValidation);
// This defines what happens when the user types in the field
email.addEventListener("input", handleInput);
// This defines what happens when the user tries to submit the data
form.addEventListener("submit", handleSubmit);
