export const userData = $state({isLoggedIn: false, user: null})
// type options, "error", "success", anything else for default
export const alertData = $state({isShown: true, message: "", type: "error"})