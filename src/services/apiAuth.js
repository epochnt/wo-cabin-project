import { supabase } from "./supabase";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // re-fetch user data
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // First update: password or fullName
  const updateData = password ? { password } : { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // Upload avatar if provided
  const fileName = `avatar-${data.user.id}-${Date.now()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  // Update user with avatar URL
  const avatarUrl = `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: { avatar: avatarUrl },
    });

  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}
