const SUPABASE_URL = "https://xxfgmsrsgnqlzwsbsjjv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wZj42hB9EhFTZ0DU2JDsYw__NI5jPBz";

// Modificado: Se asigna a window.supabaseClient para que login.js pueda acceder a la conexión
window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("✅ Cliente de Supabase creado");

async function probarConexion() {
    // Modificado: Se utiliza window.supabaseClient en lugar de db
    const { data, error } = await window.supabaseClient.auth.getSession();

    if (error) {
        console.error("❌ Error de conexión:", error);
    } else {
        console.log("✅ Conexión con Supabase funcionando", data);
    }
}

probarConexion();