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
        contenedorProveedores.innerHTML = `
            <div class="py-12 text-center text-stone-600 font-medium animate-pulse">
                Cargando directorio de proveedores...
            </div>`;

        const { data: proveedores, error } = await client
            .from('proveedores')
            .select('*');

        if (error) throw error;

        if (!proveedores || proveedores.length === 0) {
            contenedorProveedores.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-stone-300/70 rounded-2xl bg-[#FAF8F5]">
                    <div class="w-16 h-16 bg-stone-200/60 border border-stone-300/60 rounded-2xl flex items-center justify-center mb-4 text-stone-600 shadow-sm">
                        <i data-lucide="truck" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-lg font-bold text-stone-900 mb-1">Sin proveedores registrados</h3>
                    <p class="text-stone-600 text-sm mb-5 max-w-sm">Comienza agregando la información de tu primer proveedor al sistema.</p>
                    <button onclick="abrirModalProveedor()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
                        Agregar mi primer proveedor
                    </button>
                </div>
            `;
        } else {
            let htmlTabla = `
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-stone-800">
                        <thead class="text-xs text-stone-700 font-bold uppercase bg-stone-200/50 border-b border-stone-300/80">
                            <tr>
                                <th scope="col" class="px-4 py-3.5 rounded-tl-xl">Proveedor / Empresa</th>
                                <th scope="col" class="px-4 py-3.5">Contacto</th>
                                <th scope="col" class="px-4 py-3.5">Teléfono</th>
                                <th scope="col" class="px-4 py-3.5">Email</th>
                                <th scope="col" class="px-4 py-3.5">Dirección</th>
                                <th scope="col" class="px-4 py-3.5 rounded-tr-xl text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200/80">
            `;

            proveedores.forEach(prov => {
                const empresa = prov.nombre_empresa || prov.nombre || prov.empresa || '-';
                const contacto = prov.contacto_principal || prov.contacto || '-';
                const telefono = prov.telefono || prov.tel || '-';
                const email = prov.email || prov.correo || '-';
                const direccion = prov.direccion || '-';
                const id = prov.id || prov.id_proveedor;

                htmlTabla += `
                    <tr class="hover:bg-stone-200/40 transition-colors">
                        <td class="px-4 py-3.5 font-bold text-stone-900">${empresa}</td>
                        <td class="px-4 py-3.5 text-stone-700">${contacto}</td>
                        <td class="px-4 py-3.5 text-stone-600 font-mono text-xs">${telefono}</td>
                        <td class="px-4 py-3.5 text-stone-600">${email}</td>
                        <td class="px-4 py-3.5 text-stone-600 max-w-xs truncate">${direccion}</td>
                        <td class="px-4 py-3.5 text-right">
                            <button onclick="editarProveedor('${id}')" class="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80 active:bg-stone-300/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400/40" title="Editar">
                                <i data-lucide="edit" class="w-4 h-4"></i>
                            </button>
                            <button onclick="eliminarProveedor('${id}')" class="p-1.5 text-stone-600 hover:text-rose-800 hover:bg-rose-100/80 active:bg-rose-200/80 rounded-lg transition-colors ml-1 focus:outline-none focus:ring-2 focus:ring-rose-400/40" title="Eliminar">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
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
        contenedorProveedores.innerHTML = `
            <div class="py-8 text-center text-rose-800 font-semibold bg-rose-100/80 border border-rose-300/80 rounded-xl">
                Error al cargar los datos del directorio de proveedores.
            </div>`;
    }
}

// Carga automática al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();
});
