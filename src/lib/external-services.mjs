const BASE_URL = "https://api.spoonacular.com"
// using code from https://vite.dev/guide/env-and-mode
const KEY_PARAM = `apiKey=${import.meta.env.VITE_API_KEY}`

export async function getRecipeById(id) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}/information?${KEY_PARAM}`)
    const data = await response.json()
    console.log(data)
    if (data.status === "failure") {
      throw data
    } else {
      return data
    }
  } catch (error) {
    throw error
  }

}