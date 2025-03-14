<script>
  import Header from "./lib/components/Header.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import HomeView from "./lib/components/views/HomeView.svelte";
  import LoginView from "./lib/components/views/LoginView.svelte";
  import RecipeView from "./lib/components/views/RecipeView.svelte";
  import SearchView from "./lib/components/views/SearchView.svelte";
  import UserHubView from "./lib/components/views/UserHubView.svelte";
  import ErrorView from "./lib/components/views/ErrorView.svelte";

  let route = $state("");
  let idParam = $state();

  function updateRoute() {
    const [hashString, paramString] = window.location.hash.split("?");
    route = hashString;
    const urlParams = new URLSearchParams(paramString);
    idParam = urlParams.get("id");
  }

  window.addEventListener("popstate", updateRoute);
  updateRoute();
</script>

<Header />

<div class="main-container">
  <div class="main-view">
    {#if route === "" || route === "#home"}
      <HomeView />
    {:else if route === "#login"}
      <LoginView />
    {:else if route === "#recipe"}
      <RecipeView id={idParam} />
    {:else if route === "#search"}
      <SearchView />
    {:else if route === "#userhub"}
      <UserHubView />
    {:else}
      <ErrorView error={{ code: 404, message: "The page was not found!" }} />
    {/if}
  </div>
</div>

<Footer />
