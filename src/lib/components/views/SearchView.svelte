<script>
    import { onMount } from "svelte";
    import { searchRecipes, getRandomRecipes } from "../../external-services.mjs";
    import CardList from "../CardList.svelte";
    import LoadingAnimation from "../LoadingAnimation.svelte";
  
    let query = "";
    let recipes = [];
    let loading = false;
    let error = "";
    let showingSuggestions = true;
  
    // Load suggestions on mount
    onMount(async () => {
      await loadSuggestedRecipes();
    });
  
    async function loadSuggestedRecipes() {
      loading = true;
      error = "";
      showingSuggestions = true;
      try {
        const suggested = await getRandomRecipes(12);
        recipes = suggested;
      } catch (err) {
        console.error(err);
        error = "Failed to load suggested recipes.";
      } finally {
        loading = false;
      }
    }
  
    // Triggered every time the query changes
    $: if (query.trim().length > 0) {
      liveSearch(query);
    } else {
      loadSuggestedRecipes();
    }
  
    // Debounce-like guard to avoid triggering too many searches
    let lastQuery = "";
    async function liveSearch(text) {
      if (text === lastQuery) return;
      lastQuery = text;
  
      loading = true;
      error = "";
      showingSuggestions = false;
  
      try {
        const result = await searchRecipes(text);
        recipes = result.results;
        if (recipes.length === 0) {
          error = "No recipes found. Try something else.";
        }
      } catch (err) {
        console.error(err);
        error = "Error fetching search results.";
      } finally {
        loading = false;
      }
    }
  </script>
  
  <h1>Search Recipes</h1>
  
  <form class="search-form" on:submit|preventDefault>
    <input
      bind:value={query}
      type="text"
      placeholder="Search for a recipe..."
    />
  </form>
  
  {#if loading}
    <LoadingAnimation />
  {:else if error}
    <p class="error">{error}</p>
  {:else if recipes.length > 0}
    {#if showingSuggestions}
      <p class="info">Search for any specific recipe, otherwise here are some suggestions:</p>
    {/if}
    <CardList {recipes} />
  {/if}
  
  <style>
    h1 {
      text-align: center;
    }
  
    .search-form {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
  
    input {
      width: 300px;
      padding: 10px;
      font-size: 16px;
    }
  
    .error {
      color: red;
      text-align: center;
      margin-top: 20px;
    }
  
    .info {
      text-align: center;
      color: #555;
      font-style: italic;
      margin-bottom: 15px;
    }
  </style>
  