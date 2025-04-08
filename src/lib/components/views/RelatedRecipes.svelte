<script>
  import { onMount } from "svelte";
  import { getRelatedRecipes } from "../../external-services.mjs"; // Correct the path if needed

  export let recipeId;

  let relatedRecipes = [];
  let error = null;
  let loading = true;

  onMount(async () => {
    try {
      relatedRecipes = await getRelatedRecipes(recipeId, 4); // Fetch 4 related recipes
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading related recipes...</p>
{:else if error}
  <p>Error: {error}</p>
{:else if relatedRecipes.length}
  <h2>Similar Recipes</h2>
  <div class="related-recipes">
    {#each relatedRecipes as r}
      <div class="recipe-card">
        <a href={`#recipe?id=${r.id}`} onclick={() => {
          window.location.hash = `#home?id=${r.id}`
          setTimeout(() => {
            window.location.hash = `#recipe?id=${r.id}`
          }, 1);
        }}>
          <img src={`https://spoonacular.com/recipeImages/${r.id}-312x231.${r.imageType}`} alt={r.title} />
          <div>{r.title}</div>
        </a>
      </div>
    {/each}
  </div>
{:else}
  <p>No related recipes found.</p>
{/if}

<style>
  .related-recipes {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-around;
  }

  .recipe-card {
    width: 300px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 32px;
  }

  .recipe-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .recipe-card div {
    padding: 8px;
    background-color: #f9f9f9;
    font-weight: bold;
  }

  .recipe-card a {
    text-decoration: none;
    color: inherit;
  }
</style>
