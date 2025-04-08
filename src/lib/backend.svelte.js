import supabase from "./supabase.js";
import { userData } from "./stores.svelte.js";
import { showAlert } from "./utils.mjs";

export async function login(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signInWithPassword(credentials)
  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    window.location.hash = ""
    userData.isLoggedIn = true
    userData.user = data.user
    showAlert("Logged in.", "success")
  }
}
export async function oauthLogin(provider) {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  })
  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    showAlert("Logged in.", "success")
  }
}

export async function signup(credentials) {
  // credentials should have .email and .password
  let { data, error } = await supabase.auth.signUp(credentials)
  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    window.location.hash = ""
    userData.isLoggedIn = true
    userData.user = data.user
    showAlert("Signed up.", "success")
  }
}

export async function logout() {
  let { error } = await supabase.auth.signOut()
  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    userData.isLoggedIn = false
    userData.user = {}
    window.location.hash = ""
    showAlert("Logged out.")
  }
}

export async function checkSession() {
  let {data, error} = await supabase.auth.getSession()
  if (error) {
    showAlert(error.message, "error")
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
    showAlert(error.message, "error")
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
  return [1, 2, 3, 4,].map((number) => {
    return {
      title: `recipe id: ${number}`,
      id: number,
      // made using https://placehold.co/
      image: "https://placehold.co/300x200?text=Dev+Mode",
    };
  });
}

// using code from:
// - https://supabase.com/docs/guides/storage/uploads/standard-uploads
// - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
// using method from:
// - https://www.reddit.com/r/Supabase/comments/10twlwn/easiest_way_to_add_an_image_to_a_row_of_data/?rdt=52894
export async function addImage(file) {
  const file_path = `${userData.user.id}/${new Date().getTime()}${file.name}`
  const {data, error} = await supabase.storage.from("images").upload(file_path, file, {upsert: true})
  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    return `/storage/v1/object/public/images/${file_path}`
  }
}

export async function addCustom(customData) {
  // code copied/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=customs
  const { data, error } = await supabase
  .from('customs')
  .insert([
    customData,
  ])
  .select()
  
  if(error) {
    showAlert(error.message, "error")
    console.error(error)
  }else {
    showAlert("Custom recipe added.", "success")
    return data
  }
}

export async function getCustomRecipes() {
  // code copied/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=customs
  let { data: customs, error } = await supabase
  .from('customs')
  .select("*")
  .eq('profile_id', userData.user.id)

  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    
    return customs.map((custom) => {
      return {
        ...custom,
        image: `${import.meta.env.VITE_SUPABASE_URL}${custom.image}`,
        custom: true
      }
    })
  }
}
