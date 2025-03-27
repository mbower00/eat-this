import supabase from "./supabase.js";
import { userData } from "./stores.svelte.js";

export async function login(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signInWithPassword(credentials)
  if (error) {
    // TODO: show error banner
    console.error(error)
  } else {
    console.log(data)
    window.location.hash = ""
    userData.isLoggedIn = true
    userData.user = data.user
  }
}

export async function oauthLogin(provider) {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  })
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
  } else {
    window.location.hash = ""
    userData.isLoggedIn = true
    userData.user = data.user
  }
}

export async function logout() {
  let { error } = await supabase.auth.signOut()
  if (error) {
    // TODO: show error banner
    console.error(error)
  } else {
    userData.isLoggedIn = false
    userData.user = {}
    window.location.hash = ""
  }
}

export async function checkSession() {
  let {data, error} = await supabase.auth.getSession()
  console.log(data)
  if (error) {
    console.error(error)
  } else if (data.session) {
    console.log("logged in")
    userData.user = data.session.user
    userData.isLoggedIn = true
  } else { 
    console.log("logged out")
    userData.isLoggedIn = false
    userData.user = {}
  }
}

export async function getUserSessionData() {
  let {data, error} = await supabase.auth.getSession()
  let isLoggedIn = false
  let user = {}
  if (error) {
    console.error(error)
  } else if (data.session) {
    user = data.session.user
    isLoggedIn = true
  }
  return {isLoggedIn, user}
}