const registerForm = document.querySelector("#register-form");
const errorDiv = document.querySelector("#error");
const spinner = document.querySelector("#loading-spinner");
const registerButton = registerForm.querySelector('button[type="submit"]');

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword;
};

const pause = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1), milliseconds);
    });
};

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.classList.add("hidden");
    spinner.classList.remove("hidden");
    registerButton.disabled = true;
  
    const formData = new FormData(registerForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    try {
        await pause(3000);
        const res = await fetch("http://localhost:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!isPasswordMatch(password, confirmPassword)) {
          errorDiv.innerText = "Passwords do not match uh uh !";
          errorDiv.classList.remove("hidden");
          spinner.classList.add("hidden");
          registerButton.disabled = false;
          return;
        }

        if (password.length < 8) {
          errorDiv.innerText = "Passwords is to short uh uh (less than 8 characters) !";
          errorDiv.classList.remove("hidden");
          spinner.classList.add("hidden");
          registerButton.disabled = false;
          return;
        }

        if (!res.ok) {
          errorDiv.innerText = "Erreur survenue lors de la creation";
          errorDiv.classList.remove("hidden");
          spinner.classList.add("hidden");
          registerButton.disabled = false;
          console.error("Erreur survenue lors de la creation", res.status);
          return;
        }

        if (res.ok) {
          errorDiv.innerText = "FELICIDAD !!!"
          errorDiv.classList.add("bg-green-500")
          errorDiv.classList.remove("hidden");
          spinner.classList.add("hidden");
          registerButton.disabled = false;
          return;
        }

        const data = await res.json();

      } catch (err) {
        console.error("Erreur CATCH : ", err);
      }
});

