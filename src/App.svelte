<script>
  import Header from "./lib/components/Header.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import HomeView from "./lib/components/views/HomeView.svelte";
  import LoginView from "./lib/components/views/LoginView.svelte";
  import RecipeView from "./lib/components/views/RecipeView.svelte";
  import SearchView from "./lib/components/views/SearchView.svelte";
  import UserHubView from "./lib/components/views/UserHubView.svelte";
  import ErrorView from "./lib/components/views/ErrorView.svelte";
  import RecipesView from "./lib/components/views/RecipesView.svelte";
  import ErrorBanner from "./lib/components/AlertBanner.svelte";
  import { checkSession } from "./lib/auth.svelte.js";
  import { onMount } from "svelte";
  import { alertData, userData } from "./lib/stores.svelte";
  import { showAlert } from "./lib/utils.mjs";

  let route = $state("");
  let idParam = $state();
  let queryParam = $state("");
  let cuisineParam = $state("");
  let dietParam = $state("");

  async function init() {
    await checkSession();
    updateRoute();
  }

  function updateRoute() {
    const [hashString, paramString] = window.location.hash.split("?");
    route = hashString;
    const urlParams = new URLSearchParams(paramString);
    idParam = urlParams.get("id");
    queryParam = urlParams.get("query");
    cuisineParam = urlParams.get("cuisine");
    dietParam = urlParams.get("diet");
  }

  window.addEventListener("popstate", updateRoute);
  onMount(init);
</script>

{#if alertData.isShown}
  <ErrorBanner />
{/if}

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
      {:else if route === "#recipes"}
        <RecipesView query={queryParam} cuisine={cuisineParam} diet={dietParam} />
      {:else if route === "#search"}
      <SearchView />
    {:else}
      <ErrorView error={{ code: 404, message: "The page was not found!" }} />
    {/if}
  </div>
</div>

<Footer />
