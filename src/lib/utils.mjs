import {alertData} from "./stores.svelte.js"

export function showAlert(message, type = "") {
  alertData.message = message
  alertData.type = type
  alertData.isShown = true
  // TODO: Solve error so that the timeout does not close the 
  // next alert, if a next one is opened too quick
  setTimeout(() => {alertData.isShown = false}, 5000)
}