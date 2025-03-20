const form = document.getElementById('myForm');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get values from inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Display result
    const result = document.getElementById('result');
    if (name && email) {
        result.textContent = `Thank you, ${name}! We'll contact you at ${email}.`;
        result.style.color = 'green';
        form.reset(); // Clear the form
        console.log('name: ', name);
        console.log('email: ', email);
        webengage.user.login(email); //9SBOkLVMWvPX is the unique user identifier being used here
        webengage.user.setAttribute('name', name);
        webengage.user.setAttribute('email', email);
        webengage.track("form submit", {
            "name": name,
            "email": email
        })
    } else {
        result.textContent = 'Please fill out all fields.';
        result.style.color = 'red';
    }
});