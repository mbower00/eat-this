<script>
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";
  import HomeView from "./lib/views/HomeView.svelte";
  import LoginView from "./lib/views/LoginView.svelte";
  import RecipeView from "./lib/views/RecipeView.svelte";
  import SearchView from "./lib/views/SearchView.svelte";
  import UserHubView from "./lib/views/UserHubView.svelte";
  import NotFoundView from "./lib/views/NotFoundView.svelte";

  let route = $state("");

  window.addEventListener("popstate", updateRoute);

  function updateRoute() {}
</script>

<Header />

{#if route === "" || route === "#home"}
  <HomeView />
{:else if route === "#login"}
  <LoginView />
{:else if route === "#recipe"}
  <RecipeView />
{:else if route === "#search"}
  <SearchView />
{:else if route === "#userhub"}
  <UserHubView />
{:else}
  <NotFoundView />
{/if}

<Footer />
