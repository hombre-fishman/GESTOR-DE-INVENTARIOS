// js/clientes.js

async function cargarClientes() {
    const contenedorClientes = document.querySelector('#seccion-clientes > div');

    if (!contenedorClientes) return;

    const client = window.supabaseClient || window.supabase;
    if (!client) {
        console.error("Supabase no está inicializado.");
        return;
    }

    try {
        contenedorClientes.innerHTML = `<div class="py-12 text-center text-slate-400 font-medium animate-pulse">Cargando directorio de clientes...</div>`;

        // Consulta a la tabla 'clientes' de Supabase
        const { data: clientes, error } = await client
            .from('clientes')
            .select('*');

        if (error) throw error;

        if (!clientes || clientes.length === 0) {
            contenedorClientes.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50">
                    <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <i data-lucide="user-check" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-lg font-medium text-white mb-1">No tienes clientes registrados</h3>
                    <p class="text-slate-400 text-sm mb-4 max-w-sm">Comienza agregando los datos de tu primer cliente.</p>
                    <button onclick="abrirModalCliente()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">Agregar mi primer cliente</button>
                </div>
            `;
        } else {
            let htmlTabla = `
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-slate-300">
                        <thead class="text-xs text-slate-400 uppercase bg-slate-900/50">
                            <tr>
                                <th scope="col" class="px-4 py-3 rounded-tl-lg">Cliente</th>
                                <th scope="col" class="px-4 py-3">Teléfono</th>
                                <th scope="col" class="px-4 py-3">Correo Electrónico</th>
                                <th scope="col" class="px-4 py-3">Dirección</th>
                                <th scope="col" class="px-4 py-3 rounded-tr-lg text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            clientes.forEach(cliente => {
                const nombre = cliente.nombre || '-';
                const telefono = cliente.telefono || '-';
                const correo = cliente.correo || '-';
                const direccion = cliente.direccion || '-';
                const id = cliente.id;

                htmlTabla += `
                    <tr class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td class="px-4 py-3 font-medium text-white">${nombre}</td>
                        <td class="px-4 py-3 text-slate-400">${telefono}</td>
                        <td class="px-4 py-3 text-slate-400">${correo}</td>
                        <td class="px-4 py-3 text-slate-400 max-w-xs truncate">${direccion}</td>
                        <td class="px-4 py-3 text-right">
                            <button onclick="editarCliente('${id}')" class="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded transition-colors" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button>
                            <button onclick="eliminarCliente('${id}')" class="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors ml-1" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </td>
                    </tr>
                `;
            });

            htmlTabla += `
                        </tbody>
                    </table>
                </div>
            `;

            contenedorClientes.innerHTML = htmlTabla;
        }

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error('Error al cargar clientes:', error);
        contenedorClientes.innerHTML = `<div class="py-12 text-center text-red-400">Error al cargar datos de clientes. Revisa la consola.</div>`;
    }
}

// Carga automática al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
});