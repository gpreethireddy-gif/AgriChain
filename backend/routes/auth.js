// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // Get form values

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const role =
            document.getElementById("role").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // =========================
        // VALIDATION
        // =========================

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        if (role === "") {

            alert("Please select your role.");

            return;
        }


        // =========================
        // SEND DATA TO BACKEND
        // =========================

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        phone: phone,
                        role: role,
                        password: password

                    })
                }
            );


            const data = await response.json();


            // =========================
            // RESPONSE
            // =========================

            if (response.ok) {

                alert(data.message);

                registerForm.reset();

            }

            else {

                alert(data.message);

            }

        }

        catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );

        }

    });

}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const role =
            document.getElementById("loginRole").value;


        if (role === "") {

            alert("Please select your role.");

            return;

        }


        console.log("Login Data:", {

            email: email,
            password: password,
            role: role

        });


        alert(
            "Login API will be connected next."
        );

    });

}