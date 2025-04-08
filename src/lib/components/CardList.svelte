<script>
  import RecipeCard from "./RecipeCard.svelte";

  let { recipes, customAction = () => {} } = $props();
</script>

<section class="card-list">
  {#each recipes as recipe}
    <RecipeCard
      {recipe}
      customAction={() => {
        customAction(recipe);
      }}
    />
  {/each}
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
