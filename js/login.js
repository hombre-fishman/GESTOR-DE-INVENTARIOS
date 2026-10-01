const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");

const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("login-email");
const inputPassword = document.getElementById("login-password");

const loginError = document.getElementById("login-error");
const btnLogin = document.getElementById("btn-submit-login");

const userEmailDisplay =
    document.getElementById("user-email-display");

const btnLogout =
    document.getElementById("btn-logout");


function mostrarLogin() {
    loginView.classList.remove("hidden");

    dashboardView.classList.add("hidden");
    dashboardView.classList.remove("flex");
}


async function mostrarDashboard(session) {

    loginView.classList.add("hidden");

    dashboardView.classList.remove("hidden");
    dashboardView.classList.add("flex");

    if (session?.user?.email) {
        userEmailDisplay.textContent =
            session.user.email;
    }

    lucide.createIcons();

    // Cuando ya inició sesión cargamos productos
    if (window.cargarProductos) {
        await window.cargarProductos();
    }
}


// =============================================
// INICIAR SESIÓN
// =============================================

formLogin.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        loginError.classList.add("hidden");

        btnLogin.disabled = true;

        const email =
            inputEmail.value.trim();

        const password =
            inputPassword.value;


        const { data, error } =
            await db.auth.signInWithPassword({
                email,
                password
            });


        btnLogin.disabled = false;


        if (error) {

            console.error(
                "Error iniciando sesión:",
                error
            );

            loginError.textContent =
                "Correo o contraseña incorrectos.";

            loginError.classList.remove("hidden");

            return;
        }


        console.log(
            "✅ Sesión iniciada:",
            data.user.email
        );

        await mostrarDashboard(
            data.session
        );
    }
);


// =============================================
// CERRAR SESIÓN
// =============================================

btnLogout.addEventListener(
    "click",
    async () => {

        await db.auth.signOut();

        mostrarLogin();
    }
);


// =============================================
// COMPROBAR SI YA EXISTE SESIÓN
// =============================================

async function comprobarSesion() {

    const {
        data: { session }
    } = await db.auth.getSession();


    if (session) {

        await mostrarDashboard(
            session
        );

    } else {

        mostrarLogin();
    }
}


comprobarSesion();