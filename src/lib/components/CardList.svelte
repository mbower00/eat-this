<script>
  import RecipeCard from "./RecipeCard.svelte";
  import { getRandomRecipes } from "../external-services.mjs";

  let { recipes } = $props();

  // call getRandomRecipes function
  // let recipes = await getRandomRecipes();
</script>

<section class="card-list">
  {#each recipes as recipe}
    <RecipeCard {recipe} />
  {/each}

  <!-- displaying random recipies -->
  <!-- {#each recipes.slice(0, 14) as recipe}
        <RecipeCard recipe={recipe}/>
    {/each} -->
</section>

<style>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: space-around;
    margin: 20px 0;
  }
</style>
