// js/productos.js

async function cargarProductos() {
    // Seleccionamos el contenedor interno de la sección de productos
    const contenedorProductos = document.querySelector('#seccion-productos > div');

    if (!window.supabaseClient) {
        console.error("Supabase no está inicializado.");
        return;
    }

    try {
        // Mensaje temporal de carga
        contenedorProductos.innerHTML = `<div class="py-12 text-center text-slate-400 font-medium animate-pulse">Cargando inventario...</div>`;

        // 1. Consultar los datos a Supabase
        const { data: productos, error } = await window.supabaseClient
            .from('productos')
            .select('*');

        if (error) throw error;

        // 2. Si no hay productos, mostrar el diseño vacío (el que ya tenías)
        if (productos.length === 0) {
            contenedorProductos.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50">
                    <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <i data-lucide="package-open" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-lg font-medium text-white mb-1">Tu inventario está vacío</h3>
                    <p class="text-slate-400 text-sm mb-4 max-w-sm">Comienza agregando tu primer producto.</p>
                    <button onclick="abrirModalProducto()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium">Agregar mi primer producto</button>
                </div>
            `;
        } else {
            // 3. Si hay productos, construir la tabla dinámica
            let htmlTabla = `
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-slate-300">
                        <thead class="text-xs text-slate-400 uppercase bg-slate-900/50">
                            <tr>
                                <th scope="col" class="px-4 py-3 rounded-tl-lg">Producto</th>
                                <th scope="col" class="px-4 py-3">SKU</th>
                                <th scope="col" class="px-4 py-3">Categoría</th>
                                <th scope="col" class="px-4 py-3 text-center">Stock</th>
                                <th scope="col" class="px-4 py-3">Precio</th>
                                <th scope="col" class="px-4 py-3 rounded-tr-lg text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            // Iterar sobre cada producto de la BD y crear una fila
            productos.forEach(prod => {
                // Validación para saber si el stock está por debajo del mínimo
                const alertaStock = prod.stock <= (prod.stock_min || 0) ? 'text-red-400 font-bold' : 'text-emerald-400 font-medium';

                htmlTabla += `
                    <tr class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td class="px-4 py-3 font-medium text-white">${prod.nombre}</td>
                        <td class="px-4 py-3 text-slate-400">${prod.sku || '-'}</td>
                        <td class="px-4 py-3">
                            <span class="bg-slate-800 text-slate-300 py-1 px-2 rounded text-xs border border-slate-700">${prod.categoria}</span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="${alertaStock}">${prod.stock}</span>
                        </td>
                        <td class="px-4 py-3 text-white">$${parseFloat(prod.precio).toFixed(2)}</td>
                        <td class="px-4 py-3 text-right">
                            <button class="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded transition-colors"><i data-lucide="edit" class="w-4 h-4"></i></button>
                            <button class="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors ml-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </td>
                    </tr>
                `;
            });

            htmlTabla += `
                        </tbody>
                    </table>
                </div>
            `;

            contenedorProductos.innerHTML = htmlTabla;
        }

        // Renderizar nuevamente los iconos de Lucide para los nuevos elementos en pantalla
        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error('Error al cargar productos:', error);
        contenedorProductos.innerHTML = `<div class="py-12 text-center text-red-400">Error al cargar los datos. Revisa la consola.</div>`;
    }
}