const phoneInput = document.querySelector('input[name=phone]');
const fieldSet = document.querySelector('fieldset');
const submitButton = document.querySelector('button');
const messageContainer = document.querySelector('.message')
const sheetURL = 'https://script.google.com/macros/s/AKfycbz22x_jH32hn88-uRqIj0fZQNt8yb85JOW0m4gviFITFOS4s2uOGjxpIpW-j69VnxJS/exec';

// customize validation message for phone number
phoneInput.oninvalid = function(event) {
  event.target.setCustomValidity('Enter valid phone number with country code');
}

phoneInput.oninput = function(event) {
  event.target.setCustomValidity('');
}

// handle form submit
async function handleSubmit(event) {
  event.preventDefault();
  fieldSet.setAttribute('disabled', true);
  submitButton.innerText = 'Submitting';
  messageContainer.innerText = '';
  messageContainer.className = 'message';

  const { email, phone, name, address } = event.target;
  const formData = new FormData()

  formData.append('Email', email.value);
  formData.append('Phone', phone.value);
  formData.append('Name', name.value);
  formData.append('Address', address.value);

  await fetch(sheetURL, {
    method: 'POST',
    body: formData,
  }).then(function(response) {
    console.log(response.text());
    messageContainer.innerHTML = 'Data submitted successfully!';
  event.target.reset();
  })
  .catch(function(error) {
    console.log(error);
    messageContainer.innerText = 'Fail for submit form data! Try again';
    messageContainer.classList.add('error');
  });

  fieldSet.removeAttribute('disabled');
  submitButton.innerText = 'Submit';
}