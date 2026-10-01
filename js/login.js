document.addEventListener('DOMContentLoaded', async () => {
    
    // Referencias del DOM
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const btnLogout = document.getElementById('btn-logout');
    const btnToggleAuth = document.getElementById('btn-toggle-auth');
    
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const userEmailDisplay = document.getElementById('user-email-display');

    let isLoginMode = true;

    // 1. VERIFICAR SESIÓN AL CARGAR
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        mostrarDashboard(session.user);
    } else {
        mostrarLogin();
    }

    // 2. ALTERNAR ENTRE LOGIN Y REGISTRO
    btnToggleAuth.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            formLogin.classList.remove('hidden');
            formRegister.classList.add('hidden');
            authTitle.innerText = 'Bienvenido a Prostock';
            authSubtitle.innerText = 'Ingresa a tu cuenta para continuar';
            btnToggleAuth.innerText = '¿No tienes cuenta? Regístrate aquí';
        } else {
            formLogin.classList.add('hidden');
            formRegister.classList.remove('hidden');
            authTitle.innerText = 'Crear Nueva Cuenta';
            authSubtitle.innerText = 'Registra un nuevo usuario en el sistema';
            btnToggleAuth.innerText = '¿Ya tienes cuenta? Inicia sesión';
        }
    });

    // 3. PROCESAR LOGIN
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnSubmit = document.getElementById('btn-submit-login');
        const errorMsg = document.getElementById('login-error');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        btnSubmit.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Ingresando...`;
        btnSubmit.disabled = true;
        errorMsg.classList.add('hidden');

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            errorMsg.classList.remove('hidden');
            errorMsg.innerText = error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : error.message;
            btnSubmit.innerHTML = `Iniciar Sesión`;
            btnSubmit.disabled = false;
        } else {
            formLogin.reset();
            mostrarDashboard(data.user);
            btnSubmit.innerHTML = `Iniciar Sesión`;
            btnSubmit.disabled = false;
        }
        lucide.createIcons();
    });

    // 4. PROCESAR REGISTRO
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnSubmit = document.getElementById('btn-submit-register');
        const msgBox = document.getElementById('register-msg');
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        btnSubmit.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creando...`;
        btnSubmit.disabled = true;
        msgBox.classList.add('hidden');

        const { data, error } = await supabase.auth.signUp({ email, password });

        msgBox.classList.remove('hidden');
        if (error) {
            msgBox.className = 'text-sm p-3 rounded-lg text-center bg-red-500/10 border border-red-500/50 text-red-400 mb-4';
            msgBox.innerText = error.message;
            btnSubmit.innerHTML = `Crear Cuenta`;
            btnSubmit.disabled = false;
        } else {
            msgBox.className = 'text-sm p-3 rounded-lg text-center bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 mb-4';
            msgBox.innerText = '¡Cuenta creada con éxito! Ahora puedes iniciar sesión.';
            formRegister.reset();
            btnSubmit.innerHTML = `Crear Cuenta`;
            btnSubmit.disabled = false;
            
            // Si Supabase auto-loguea tras registro (depende de configuración)
            if (data.session) {
                mostrarDashboard(data.user);
            } else {
                // Volver a la vista de login automáticamente tras 3 segundos
                setTimeout(() => btnToggleAuth.click(), 3000);
            }
        }
        lucide.createIcons();
    });

    // 5. CERRAR SESIÓN
    btnLogout.addEventListener('click', async () => {
        await supabase.auth.signOut();
        mostrarLogin();
    });

    // --- Funciones de vista ---
    function mostrarDashboard(user) {
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        dashboardView.classList.add('flex');
        userEmailDisplay.innerText = user.email;
    }

    function mostrarLogin() {
        dashboardView.classList.add('hidden');
        dashboardView.classList.remove('flex');
        loginView.classList.remove('hidden');
    }
});
