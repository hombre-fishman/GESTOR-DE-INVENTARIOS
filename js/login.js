document.addEventListener('DOMContentLoaded', () => {
    const dashboardApp = document.getElementById('dashboard-app');
    if (dashboardApp) {
        dashboardApp.classList.add('hidden');
    }

    const loginHTML = `
        <div id="pantalla-login" class="fixed inset-0 z-[100] bg-[#F5F3EF] flex items-center justify-center p-4">
            <div class="bg-white border border-stone-200/90 p-8 rounded-2xl shadow-xl max-w-sm w-full">
                <div class="text-center mb-8">
                    <div class="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20 text-white">
                        <i data-lucide="boxes" class="w-8 h-8"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-stone-900 tracking-tight">Prostock</h2>
                    <p class="text-sm text-stone-600 mt-1">Inicia sesión para continuar</p>
                </div>
                
                <form id="form-login" class="space-y-5">
                    <div>
                        <label class="block text-xs font-bold text-stone-700 mb-1.5">Correo Electrónico</label>
                        <input type="email" id="login-email" required placeholder="admin@empresa.com" class="w-full bg-[#FAF8F5] border border-stone-300/80 rounded-xl p-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-stone-700 mb-1.5">Contraseña</label>
                        <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-[#FAF8F5] border border-stone-300/80 rounded-xl p-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    </div>
                    
                    <p id="login-error" class="text-xs text-rose-800 bg-rose-50 border border-rose-200/80 p-3 rounded-xl font-medium text-center hidden">Credenciales incorrectas.</p>
                    
                    <button type="submit" id="btn-submit-login" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
                        Ingresar al Sistema
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loginHTML);
    
    if (window.lucide) {
        lucide.createIcons();
    }

    const pantallaLogin = document.getElementById('pantalla-login');
    const formLogin = document.getElementById('form-login');
    const emailLabel = document.getElementById('user-email');
    const avatar = document.getElementById('user-avatar');
    const btnLogout = document.getElementById('btn-logout') || document.querySelector('button[title="Cerrar sesión"]');

    if (window.supabaseClient) {
        window.supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session) {
                pantallaLogin.classList.add('hidden');
                if (dashboardApp) dashboardApp.classList.remove('hidden');
                
                if (emailLabel) emailLabel.innerText = session.user.email;
                if (avatar) avatar.innerText = session.user.email.charAt(0).toUpperCase();

                if (typeof cargarProductos === 'function') {
                    cargarProductos();
                }
            } else {
                pantallaLogin.classList.remove('hidden');
                if (dashboardApp) dashboardApp.classList.add('hidden');
            }
        });

        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const btnSubmit = document.getElementById('btn-submit-login');
            const msjError = document.getElementById('login-error');
            
            msjError.classList.add('hidden');
            btnSubmit.innerHTML = 'Verificando...';
            btnSubmit.disabled = true;

            const { error } = await window.supabaseClient.auth.signInWithPassword({
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

        if (btnLogout) {
            btnLogout.addEventListener('click', async () => {
                await window.supabaseClient.auth.signOut();
            });
        }
    } else {
        console.error('Supabase no está inicializado. Revisa tu archivo supabase.js.');
    }
});
