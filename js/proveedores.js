// js/proveedores.js

async function cargarProveedores() {
    const contenedorProveedores = document.querySelector('#seccion-proveedores > div');

    if (!contenedorProveedores) return;

    const client = window.supabaseClient || window.supabase;
    if (!client) {
        console.error("Supabase no está inicializado.");
        return;
    }

    try {
        contenedorProveedores.innerHTML = `<div class="py-12 text-center text-slate-400 font-medium animate-pulse">Cargando directorio de proveedores...</div>`;

        const { data: proveedores, error } = await client
            .from('proveedores')
            .select('*');

        if (error) throw error;

        if (!proveedores || proveedores.length === 0) {
            contenedorProveedores.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50">
                    <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <i data-lucide="users" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-lg font-medium text-white mb-1">No tienes proveedores registrados</h3>
                    <p class="text-slate-400 text-sm mb-4 max-w-sm">Comienza agregando los datos de tu primer proveedor.</p>
                    <button onclick="abrirModalProveedor()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium">Agregar mi primer proveedor</button>
                </div>
            `;
        } else {
            let htmlTabla = `
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-slate-300">
                        <thead class="text-xs text-slate-400 uppercase bg-slate-900/50">
                            <tr>
                                <th scope="col" class="px-4 py-3 rounded-tl-lg">Proveedor / Empresa</th>
                                <th scope="col" class="px-4 py-3">Contacto</th>
                                <th scope="col" class="px-4 py-3">Teléfono</th>
                                <th scope="col" class="px-4 py-3">Email</th>
                                <th scope="col" class="px-4 py-3">Dirección</th>
                                <th scope="col" class="px-4 py-3 rounded-tr-lg text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            proveedores.forEach(prov => {
                const empresa = prov.nombre_empresa || prov.nombre || prov.empresa || '-';
                const contacto = prov.contacto_principal || prov.contacto || '-';
                const telefono = prov.telefono || prov.tel || '-';
                const email = prov.email || prov.correo || '-';
                const direccion = prov.direccion || '-';
                const id = prov.id || prov.id_proveedor;

                htmlTabla += `
                    <tr class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td class="px-4 py-3 font-medium text-white">${empresa}</td>
                        <td class="px-4 py-3 text-slate-300">${contacto}</td>
                        <td class="px-4 py-3 text-slate-400">${telefono}</td>
                        <td class="px-4 py-3 text-slate-400">${email}</td>
                        <td class="px-4 py-3 text-slate-400 max-w-xs truncate">${direccion}</td>
                        <td class="px-4 py-3 text-right">
                            <button onclick="editarProveedor('${id}')" class="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded transition-colors" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button>
                            <button onclick="eliminarProveedor('${id}')" class="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors ml-1" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </td>
                    </tr>
                `;
            });

            htmlTabla += `
                        </tbody>
                    </table>
                </div>
            `;

            contenedorProveedores.innerHTML = htmlTabla;
        }

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error('Error al cargar proveedores:', error);
        contenedorProveedores.innerHTML = `<div class="py-12 text-center text-red-400">Error al cargar datos. Revisa la consola.</div>`;
    }
}

// Carga automática al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();
});