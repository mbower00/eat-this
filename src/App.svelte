<script>
  import Header from "./lib/components/Header.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import HomeView from "./lib/components/views/HomeView.svelte";
  import LoginView from "./lib/components/views/LoginView.svelte";
  import RecipeView from "./lib/components/views/RecipeView.svelte";
  import SearchView from "./lib/components/views/SearchView.svelte";
  import UserHubView from "./lib/components/views/UserHubView.svelte";
  import ErrorView from "./lib/components/views/ErrorView.svelte";
  import { checkSession } from "./lib/auth.svelte.js";
  import { onMount } from "svelte";
  import { userData } from "./lib/stores.svelte";

  let route = $state("");
  let idParam = $state();

  async function init() {
    await checkSession();
    updateRoute();
  }

  function updateRoute() {
    const [hashString, paramString] = window.location.hash.split("?");
    route = hashString;
    const urlParams = new URLSearchParams(paramString);
    idParam = urlParams.get("id");
  }

  window.addEventListener("popstate", updateRoute);
  onMount(init);
</script>

<Header />

<div class="main-container">
  <div class="main-view">
    {#if route === "" || route === "#home"}
      <HomeView />
    {:else if route === "#user"}
      {#if userData.isLoggedIn}
        <UserHubView />
      {:else}
        <LoginView />
      {/if}
    {:else if route === "#recipe"}
      <RecipeView id={idParam} />
    {:else if route === "#search"}
      <SearchView />
    {:else}
      <ErrorView error={{ code: 404, message: "The page was not found!" }} />
    {/if}
  </div>
</div>

<Footer />
