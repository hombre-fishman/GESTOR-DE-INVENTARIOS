const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorDiv = document.getElementById("login-error");

    const { data, error } = await db.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("❌ Error login:", error);
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");
        return;
    }

    console.log("✅ Login correcto:", data.user.email);

    document.getElementById("login-view").classList.add("hidden");
    document.getElementById("dashboard-view").classList.remove("hidden");

    document.getElementById("user-email-display").textContent =
        data.user.email;
});
