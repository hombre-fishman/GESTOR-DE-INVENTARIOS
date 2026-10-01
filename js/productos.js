async function cargarProductos() {
    const contenedorProductos = document.querySelector('#seccion-productos > div');

    if (!window.supabaseClient) {
        console.error("Supabase no está inicializado.");
        return;
    }

    try {
        contenedorProductos.innerHTML = `
            <div class="py-12 text-center text-stone-600 font-medium animate-pulse">
                Cargando inventario...
            </div>`;

        const { data: productos, error } = await window.supabaseClient
            .from('productos')
            .select('*');

        if (error) throw error;

        if (productos.length === 0) {
            contenedorProductos.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-stone-300/70 rounded-2xl bg-[#FAF8F5]">
                    <div class="w-16 h-16 bg-stone-200/60 border border-stone-300/60 rounded-2xl flex items-center justify-center mb-4 text-stone-600 shadow-sm">
                        <i data-lucide="package-open" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-lg font-bold text-stone-900 mb-1">Tu inventario está vacío</h3>
                    <p class="text-stone-600 text-sm mb-5 max-w-sm">Comienza agregando tu primer producto al sistema.</p>
                    <button onclick="abrirModalProducto()" class="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 active:bg-black text-stone-50 rounded-xl text-sm font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-stone-500/40">
                        Agregar mi primer producto
                    </button>
                </div>
            `;
        } else {
            let htmlTabla = `
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-stone-800">
                        <thead class="text-xs text-stone-700 font-bold uppercase bg-stone-200/50 border-b border-stone-300/80">
                            <tr>
                                <th scope="col" class="px-4 py-3.5 rounded-tl-xl">Producto</th>
                                <th scope="col" class="px-4 py-3.5">SKU</th>
                                <th scope="col" class="px-4 py-3.5">Categoría</th>
                                <th scope="col" class="px-4 py-3.5 text-center">Stock</th>
                                <th scope="col" class="px-4 py-3.5">Precio</th>
                                <th scope="col" class="px-4 py-3.5 rounded-tr-xl text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200/80">
            `;

            productos.forEach(prod => {
                const esBajoStock = prod.stock <= (prod.stock_min || 0);
                const badgeStock = esBajoStock 
                    ? 'text-rose-900 font-bold bg-rose-100/90 border border-rose-300 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5' 
                    : 'text-emerald-900 font-semibold bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-lg';

                htmlTabla += `
                    <tr class="hover:bg-stone-200/40 transition-colors">
                        <td class="px-4 py-3.5 font-bold text-stone-900">${prod.nombre}</td>
                        <td class="px-4 py-3.5 text-stone-600 font-mono text-xs">${prod.sku || '-'}</td>
                        <td class="px-4 py-3.5">
                            <span class="bg-stone-200/70 text-stone-800 py-1 px-2.5 rounded-lg text-xs border border-stone-300/70 font-semibold">${prod.categoria}</span>
                        </td>
                        <td class="px-4 py-3.5 text-center">
                            <span class="${badgeStock}">
                                ${esBajoStock ? '<i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-800"></i>' : ''}
                                ${prod.stock}
                            </span>
                        </td>
                        <td class="px-4 py-3.5 font-bold text-stone-900">$${parseFloat(prod.precio).toFixed(2)}</td>
                        <td class="px-4 py-3.5 text-right">
                            <button class="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80 active:bg-stone-300/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400/40" title="Editar">
                                <i data-lucide="edit" class="w-4 h-4"></i>
                            </button>
                            <button class="p-1.5 text-stone-600 hover:text-rose-800 hover:bg-rose-100/80 active:bg-rose-200/80 rounded-lg transition-colors ml-1 focus:outline-none focus:ring-2 focus:ring-rose-400/40" title="Eliminar">
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

            contenedorProductos.innerHTML = htmlTabla;
        }

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error('Error al cargar productos:', error);
        contenedorProductos.innerHTML = `
            <div class="py-8 text-center text-rose-800 font-semibold bg-rose-100/80 border border-rose-300/80 rounded-xl">
                Error al cargar los datos del inventario.
            </div>`;
    }
}
