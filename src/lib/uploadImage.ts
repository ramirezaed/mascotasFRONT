import { supabase } from "@/lib/supabaseClient";

export async function uploadImage(file: File): Promise<string> {
  const fileName = `imagen-${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("mascotas")
    .upload(fileName, file);

  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error("Error subiendo imagen");
  }

  const { data } = supabase.storage.from("mascotas").getPublicUrl(fileName);

  return data.publicUrl; // ✅ URL completa
}
