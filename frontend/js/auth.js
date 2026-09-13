// =========================
// REGISTRATION
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Get registration form values
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


        // Send registration data to backend
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


            console.log(
                "Registration Response:",
                data
            );


            if (response.ok) {

                alert(data.message);

                registerForm.reset();

            } else {

                alert(data.message);

            }


        } catch (error) {

            console.error(
                "Registration Error:",
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

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get login values
            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            const role =
                document.getElementById(
                    "loginRole"
                ).value;


            // Check role
            if (role === "") {

                alert(
                    "Please select your role."
                );

                return;
            }


            // Send login data to backend
            try {

                const response = await fetch(
                    "http://localhost:5000/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            email: email,
                            password: password,
                            role: role

                        })
                    }
                );


                const data =
                    await response.json();


                console.log(
                    "Login Response:",
                    data
                );


                if (response.ok) {

                    alert(data.message);


                    // Store user information
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );


                    // Redirect according to role
                    if (
                        data.user.role ===
                        "farmer"
                    ) {

                        window.location.href =
                            "farmer.html";

                    }
                    else if (
                        data.user.role ===
                        "buyer"
                    ) {

                        window.location.href =
                            "buyer.html";

                    }

                } else {

                    alert(data.message);

                }


            } catch (error) {

                console.error(
                    "Login Error:",
                    error
                );

                alert(
                    "Unable to connect to the server."
                );

            }

        }
    );
}