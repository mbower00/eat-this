import supabase from "./supabase.js";
import { userData } from "./stores.svelte.js";

export async function login(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signInWithPassword(credentials)
  if (error) {
    // TODO: show error banner
    console.error(error)
  } else {
    window.location.hash = ""
    userData.isLoggedIn = true
    userData.user = data.user
  }
}
export async function oauthLogin(provider) {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin
    }
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
  if (error) {
    console.error(error)
  } else if (data.session) {
    userData.user = data.session.user
    userData.isLoggedIn = true
  } else { 
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

export async function getFavoriteRecipes() {
  // placehholder...
  await setTimeout(() => {}, 1000)
  return [1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((number) => {
    return {
      title: `recipe id: ${number}`,
      id: number,
      // made using https://placehold.co/
      image: "https://placehold.co/300x200?text=Dev+Mode",
    };
  });
}

export async function getCustomRecipes() {
  // placehholder...
  await setTimeout(() => {}, 1000)
  return [1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((number) => {
    return {
      title: `recipe id: ${number}`,
      id: number,
      // made using https://placehold.co/
      image: "https://placehold.co/300x200?text=Dev+Mode",
    };
  });
}