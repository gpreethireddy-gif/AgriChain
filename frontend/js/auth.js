const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const role =
            document.getElementById("role").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // Check role

        if (role === "") {

            alert("Please select your role.");

            return;
        }


        // Temporary registration data

        const user = {

            name: name,
            email: email,
            phone: phone,
            role: role

        };


        console.log("Registration Data:", user);


        alert(
            "Registration form submitted successfully!"
        );

    });

}

// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const role =
            document.getElementById("loginRole").value;


        // Check role

        if (role === "") {

            alert("Please select your role.");

            return;
        }


        console.log("Login Data:", {
            email: email,
            password: password,
            role: role
        });


        // Temporary login

        alert(
            "Login form submitted successfully!"
        );

    });

}