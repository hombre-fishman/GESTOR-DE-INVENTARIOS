// Esperar a que cargue el documento
document.addEventListener('DOMContentLoaded', async () => {
    
    // Referencias a los elementos del DOM
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const formLogin = document.getElementById('form-login');
    const btnLogout = document.getElementById('btn-logout');
    const errorMsg = document.getElementById('login-error');
    const userEmailDisplay = document.getElementById('user-email-display');
    const btnSubmit = document.getElementById('btn-submit-login');

    // 1. VERIFICAR SESIÓN ACTIVA AL CARGAR LA PÁGINA
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        mostrarDashboard(session.user);
    } else {
        mostrarLogin();
    }

    // 2. MANEJAR EL EVENTO DE INICIO DE SESIÓN
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar que la página se recargue

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Estado de carga en el botón
        btnSubmit.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Ingresando...`;
        btnSubmit.disabled = true;
        errorMsg.classList.add('hidden');

        // Llamada a Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            // Mostrar error
            errorMsg.classList.remove('hidden');
            errorMsg.innerText = error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : error.message;
            btnSubmit.innerHTML = `Iniciar Sesión`;
            btnSubmit.disabled = false;
        } else {
            // Exito: Limpiar formulario y mostrar dashboard
            formLogin.reset();
            mostrarDashboard(data.user);
            btnSubmit.innerHTML = `Iniciar Sesión`;
            btnSubmit.disabled = false;
        }
        lucide.createIcons(); // Recargar iconos
    });

    // 3. MANEJAR EL EVENTO DE CERRAR SESIÓN
    btnLogout.addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            mostrarLogin();
        }
    });

    // --- Funciones auxiliares para cambiar de vista ---
    function mostrarDashboard(user) {
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        dashboardView.classList.add('flex'); // Recupera su layout flex
        userEmailDisplay.innerText = user.email; // Mostrar el correo real en la barra lateral
    }

    function mostrarLogin() {
        dashboardView.classList.add('hidden');
        dashboardView.classList.remove('flex');
        loginView.classList.remove('hidden');
    }
});
