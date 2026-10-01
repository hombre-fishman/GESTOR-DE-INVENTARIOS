const SUPABASE_URL = "https://xxfgmsrsgnqlzwsbsjjv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wZj42hB9EhFTZ0DU2JDsYw__NI5jPBz";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("✅ Cliente de Supabase creado");


async function probarConexion() {

    const { data, error } = await db
        .from("productos")
        .select("*")
        .limit(5);

    if (error) {
        console.error("❌ Error con Supabase:", error);
        return;
    }

    console.log("✅ Conexión con Supabase funcionando");
    console.log("Productos:", data);
}

probarConexion();