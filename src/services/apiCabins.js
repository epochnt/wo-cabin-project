import { supabase } from "./supabase";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Error loading data from supabase");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Error deleting cabin from supabase");
  }
}

export async function insertEditCabin(cabin, id) {
  const hasImagePath =
    typeof cabin.image === "string" && cabin.image.startsWith(SUPABASE_URL);
  const imagefileName = `${Math.random() * 1000}-${cabin.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? cabin.image
    : cabin.image
      ? `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imagefileName}`
      : "";

  let query = supabase.from("cabins");

  // For insert
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  } else {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().maybeSingle();

  if (error) {
    console.log(error);
    throw new Error(`Error ${id ? "inserting" : "editing"} cabin in supabase`);
  }

  if (!imagePath || hasImagePath) return data;

  const { error: fileUploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imagefileName, cabin.image);

  if (fileUploadError && !id) {
    console.log(fileUploadError);
    await deleteCabin(data.id);
  }
  return data;
}
