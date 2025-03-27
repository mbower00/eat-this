import {getUserSessionData} from "./auth.svelte"
// const {isLoggedIn, user} = await getUserSessionData()
export const userData = $state({isLoggedIn: false, user: null})