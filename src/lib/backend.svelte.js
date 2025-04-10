import supabase from "./supabase.js";
import { userData } from "./stores.svelte.js";
import { showAlert } from "./utils.mjs";

export const DEFAULT_IMAGE_PATH = "/storage/v1/object/public/default/default_dish.jpeg"

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

export async function deleteCustom(customData) {
  // code copy/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=customs
  const { error } = await supabase
  .from('customs')
  .delete()
  .eq('id', customData.id)
  
  if (customData.image !== `${import.meta.env.VITE_SUPABASE_URL}${DEFAULT_IMAGE_PATH}`) {
    // recieved help from chatgpt

    // format image string
    const imageString = customData.image.split("/").slice(8).join("/")

    // code copy/pasted from: 
    // - https://supabase.com/docs/guides/storage/management/delete-objects 
    // - https://supabase.com/docs/reference/javascript/storage-from-copy
    const { data, error } = await supabase.storage.from('images').remove([imageString])
    if (error) {
      showAlert(error.message)
      console.error(error)
    }
  }
  
  if (error) {
    showAlert(error.message, "error")
    console.error(error)
  } else {
    showAlert("Custom recipe deleted.")
  }
}

export async function getFavoriteRecipes() {
  // code copy/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=favorites
  let { data: favorites, error } = await supabase
  .from('favorites')
  .select("*")
  .eq('profile_id', userData.user.id)

  if (error) {
    showAlert(error.message, "error")
    console.error(error.message)
  } else {
    return favorites.map((favorite) => {
      return {
        ...favorite,
        id: favorite.recipe_id,
        favoriteId: favorite.id
      }
    })
  }
}

export async function addFavorite(recipeData) {
  // code copy/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=favorites
  const { data, error } = await supabase
  .from('favorites')
  .insert([
    { recipe_id: recipeData.id, 
      title: recipeData.title, 
      image: recipeData.image, 
      profile_id: userData.user.id 
    },
  ])
  .select()

  if (error) {
    showAlert(error.message, "error")
    console.error(error.message)
  } else {
    showAlert("Favorite added.", "success")
    return data
  }
}

export async function checkIfFavorite(recipeId) {
  // code copy/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=favorites
  let { data: favorites, error } = await supabase
  .from('favorites')
  .select("*")
  .eq('recipe_id', recipeId)
  .eq('profile_id', userData.user.id)

  if (error) {
    showAlert(error.message, "error")
    console.error(error.message)
  } else {
    return favorites.length > 0
  }
}

export async function deleteFavorite(recipeId) {
  // code copy/pasted from https://supabase.com/dashboard/project/ibswtaypwyvbfdkokmtp/api?resource=favorites
  const { error } = await supabase
  .from('favorites')
  .delete()
  .eq("profile_id", userData.user.id)
  .eq("recipe_id", recipeId)
  
  if (error) {
    showAlert(error.message, "error")
    console.error(error.message)
  } else {
    showAlert("Favorite removed.",)
  }
}
