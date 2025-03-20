import supabase from "./supabase.js";

export async function login(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signInWithPassword(credentials)
}

export async function signup() {
  let { data, error } = await supabase.auth.signUp({
  // credentials should have .email and .password
    email: 'someone@email.com',
    password: 'VuaGQuyQJkYyleqQqUhX'
  })
}