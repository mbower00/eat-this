<script>
  import { getRecipeById } from "../../external-services.mjs";
  // comment generated from vscode
  // @ts-ignore
  import LoadingAnimation from "../LoadingAnimation.svelte";
  import ErrorView from "./ErrorView.svelte";
  import RelatedRecipes from "./RelatedRecipes.svelte"; // adjust path if needed
  import {
    addFavorite,
    checkIfFavorite,
    deleteFavorite,
  } from "../../backend.svelte";

  let { id } = $props();
  let promise = $state();
  let isFavoritePromise = $state();

  let isFavorite = $state(null);

  async function addFavoriteHandler(recipe) {
    await addFavorite({
      id: recipe.id,
      image: recipe.image,
      title: recipe.title,
    });
    isFavorite = true;
  }
  async function removeFavoriteHandler(recipe) {
    await deleteFavorite(recipe.id);
    isFavorite = false;
  }

  promise = getRecipeById(id).then(async (data) => {
    isFavoritePromise = checkIfFavorite(data.id).then((result) => {
      isFavorite = result;
      return result;
    });
    return data;
  });
</script>

{#await promise}
  <LoadingAnimation />
{:then recipe}
  <h1>{recipe.title}</h1>
  <img src={recipe.image} alt={recipe.title} />
  <!-- using code from https://www.w3schools.com/tags/att_global_title.asp -->
  {#await isFavoritePromise then}
    {#if isFavorite === true}
      <button
        class="favorite-button"
        onclick={() => {
          removeFavoriteHandler(recipe);
        }}
        type="button"
        title="Remove from Favorites"
      >
        <!-- line copied from fontawesome.com -->
        <i class="fa-solid fa-heart"></i>
      </button>
    {:else if isFavorite === false}
      <button
        class="favorite-button"
        onclick={() => {
          addFavoriteHandler(recipe);
        }}
        type="button"
        title="Add to Favorites"
      >
        <!-- line copied from fontawesome.com -->
        <i class="fa-regular fa-heart"></i>
      </button>
    {/if}
  {/await}

  <div class="meta-info">
    <div><strong>⏱️</strong> Ready in {recipe.readyInMinutes} mins</div>
    <div><strong>🍽️</strong> Servings: {recipe.servings}</div>

    {#if recipe.nutrition?.nutrients}
      {#each recipe.nutrition.nutrients as nutrient}
        {#if nutrient.name === "Calories"}
          <div><strong>🔥</strong> {nutrient.amount} {nutrient.unit}</div>
        {/if}
      {/each}
    {/if}
  </div>

  <h2>Ingredients</h2>
  <ul>
    {#each recipe.extendedIngredients as ingredient}
      <li>{ingredient.original}</li>
    {/each}
  </ul>

  <h2>Instructions</h2>
  {#each recipe.analyzedInstructions as instructionSet}
    <ol>
      {#each instructionSet.steps as instruction}
        <li>{@html instruction.step}</li>
      {/each}
    </ol>
  {/each}

  <!-- <p>{@html recipe.summary}</p> -->

  <p class="source">
    Recipe from
    <a href={recipe.sourceUrl} target="_blank">{recipe.sourceName}</a>
  </p>

  <!--Add Related Recipes component here -->
  <RelatedRecipes recipeId={recipe.id} />
{:catch error}
  <ErrorView {error} />
{/await}

<style>
  h1 {
    font-size: 2.8rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 700px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: block;
    margin: 0 auto 2rem;
  }

  .favorite-button {
    margin: 0 auto;
    display: block;
  }
</style>
