import supabase from "./supabase.js";

export async function login(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signInWithPassword(credentials)
  if (error) {
    // TODO: show error banner
    console.error(error)
  }
}

export async function signup(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signUp(credentials)
  if (error) {
    // TODO: show error banner
    console.error(error)
  }
}

export async function logout() {
  let { error } = await supabase.auth.signOut()
  if (error) {
    // TODO: show error banner
    console.error(error)
  }
}