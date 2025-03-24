const form = document.getElementById('myForm');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get values from inputs
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();
    const city = document.getElementById('city').value.trim();

    // Display result
    const result = document.getElementById('result');

    if (email) {  // Only email is required
        result.textContent = `Thank you, ${firstName || "User"}! We'll contact you at ${email}.`;
        result.style.color = 'green';

        // Reset form
        form.reset();

        // Log data
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Age:', age);
        console.log('City:', city);

        // WebEngage SDK Calls (Only First Name, Last Name, and Email)
        webengage.user.login(email);
        webengage.user.setAttribute('name', `${firstName} ${lastName}`.trim());
        webengage.user.setAttribute('email', email);
        webengage.track("form submit", {
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        });

        //WebEngage API Call (Sending all details)
        const apiUrl = "https://practice-backend-project.vercel.app/api/webengage";
        const apiKey = "125a0a5c-e32f-41fd-9a4f-0713a6ac575e";

        const userData = {
            userId: email,
            firstName: firstName || "",
            lastName: lastName || "",
            email: email,
            age: age || null,
            city: city || ""
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`, 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("API Response:", data);
        } catch (error) {
            console.error("API Error:", error);
            result.textContent = "There was an error. Please try again.";
            result.style.color = "red";
        }
    } else {
        result.textContent = "Please enter your email.";
        result.style.color = "red";
    }
});