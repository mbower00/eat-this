const BASE_URL = "https://api.spoonacular.com"
// using code from https://vite.dev/guide/env-and-mode
const KEY_PARAM = `apiKey=${import.meta.env.VITE_API_KEY}`

export async function getRecipeById(id) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}/information?${KEY_PARAM}`)
    const data = await response.json()
    if (data.status === "failure") {
      throw data
    } else {
      return data
    }
  } catch (error) {
    throw error
  }

}

/*
see https://spoonacular.com/food-api/docs#Search-Recipes-Complex
for the various options. 
*/
export async function searchRecipes(query, options = {}) {
  // using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  let optionsString = ""
  for (let i of Object.keys(options)) {
    optionsString += `&${i}=${options[i]}`
  }
  try {
    const response = await fetch(`${BASE_URL}/recipes/complexSearch/?${KEY_PARAM}&query=${query}${optionsString}`)
    const data = await response.json()
    if (data.status === "failure") {
      throw data
    } else {
      console.log(data)
      return data
    }
  } catch (error) {
    throw error
  }
}

/*
see https://spoonacular.com/food-api/docs#Search-Recipes-Complex
for the various options. 
*/
export async function getRandomRecipes(number = 8, options = {}) {
  // using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  let optionsString = ""
  for (let i of Object.keys(options)) {
    optionsString += `&${i}=${options[i]}`
  }
  try {
    const response = await fetch(`${BASE_URL}/recipes/complexSearch/?${KEY_PARAM}&number=${number}${optionsString}`)
    const data = await response.json()
    if (data.status === "failure") {
      throw data
    } else {
      return data.results
    }
  } catch (error) {
    throw error
  }
}