document.addEventListener('DOMContentLoaded', () => {
    // 1. Ocultar el dashboard por defecto hasta verificar si hay sesión activa
    const dashboardApp = document.getElementById('dashboard-app');
    if (dashboardApp) {
        dashboardApp.classList.add('hidden');
    }

    
    const loginHTML = `
        <div id="pantalla-login" class="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4">
            <div class="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                <div class="text-center mb-8">
                    <div class="w-14 h-14 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                        <i data-lucide="boxes" class="w-8 h-8 text-white"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Prostock</h2>
                    <p class="text-sm text-slate-400 mt-1">Inicia sesión para continuar</p>
                </div>
                
                <form id="form-login" class="space-y-5">
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
                        <input type="email" id="login-email" required placeholder="admin@empresa.com" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1">Contraseña</label>
                        <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors">
                    </div>
                    
                    <p id="login-error" class="text-xs text-red-400 text-center hidden">Credenciales incorrectas.</p>
                    
                    <button type="submit" id="btn-submit-login" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/30 flex justify-center items-center gap-2">
                        Ingresar al Sistema
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loginHTML);
    
    // Renderizar los iconos de Lucide en el nuevo HTML inyectado
    if (window.lucide) {
        lucide.createIcons();
    }

    // 3. Capturar referencias a los elementos inyectados y del dashboard
    const pantallaLogin = document.getElementById('pantalla-login');
    const formLogin = document.getElementById('form-login');
    const emailLabel = document.getElementById('user-email');
    const avatar = document.getElementById('user-avatar');
    
    // Buscar el botón de cerrar sesión en el menú lateral (si existe)
    const btnLogout = document.getElementById('btn-logout') || document.querySelector('button[title="Cerrar sesión"]');

    // 4. Lógica de Autenticación con Supabase
    if (window.supabase) {
        
        // Escuchar el estado de la sesión (se dispara al cargar la página y al hacer login/logout)
        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                // Usuario logueado: Ocultar login, mostrar dashboard
                pantallaLogin.classList.add('hidden');
                if (dashboardApp) dashboardApp.classList.remove('hidden');
                
                // Actualizar perfil visual en el dashboard
                if (emailLabel) emailLabel.innerText = session.user.email;
                if (avatar) avatar.innerText = session.user.email.charAt(0).toUpperCase();
            } else {
                // Sin sesión: Mostrar login, ocultar dashboard
                pantallaLogin.classList.remove('hidden');
                if (dashboardApp) dashboardApp.classList.add('hidden');
            }
        });

        // Intentar iniciar sesión
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const btnSubmit = document.getElementById('btn-submit-login');
            const msjError = document.getElementById('login-error');
            
            msjError.classList.add('hidden');
            btnSubmit.innerHTML = 'Verificando...';
            btnSubmit.disabled = true;

            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                msjError.innerText = 'Correo o contraseña incorrectos.';
                msjError.classList.remove('hidden');
            } else {
                formLogin.reset();
            }
            
            btnSubmit.innerHTML = 'Ingresar al Sistema';
            btnSubmit.disabled = false;
        });

        // Cerrar sesión
        if (btnLogout) {
            btnLogout.addEventListener('click', async () => {
                await supabase.auth.signOut();
            });
        }
    } else {
        console.error('Supabase no está inicializado. Revisa tu archivo supabase.js.');
    }
});
