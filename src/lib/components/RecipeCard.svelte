<script>
  // below comment generated from vscode
  // @ts-nocheck

  // using code from https://svelte.dev/tutorial/svelte/default-values
  let { recipe, customAction = () => {} } = $props();
</script>

{#if recipe.custom}
  <button onclick={customAction} type="button" class="recipe-card">
    <h3>{recipe.title}</h3>
    <img src={recipe.image} alt="" />
  </button>
{:else}
  <a href="#recipe?id={recipe.id}" class="recipe-card">
    <h3>{recipe.title}</h3>
    <img src={recipe.image} alt="" />
  </a>
{/if}

<style>
  a {
    text-decoration: none;
    color: var(--text-color);
  }
  .recipe-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
    /* border: black solid 2px; */
    box-shadow: rgb(111, 111, 111) 0px 0px 3px;
    transition: all 0.15s ease;
    cursor: pointer;
    position: relative;
    padding: 0;
    border: none;
  }
  .recipe-card h3 {
    /* border-bottom: 2px solid var(--primary-color); */
    text-align: center;
    margin-top: 0px;
    font-weight: 100;
    position: absolute;
    bottom: 0;
    text-align: left;
    color: #ffffff;
    background-color: rgba(120, 16, 22, 0.7);
    padding: 3px 6px 3px 3px;
    border-radius: 0px 7px 7px 0px;
  }
  .recipe-card img {
    border-radius: 8px;
    width: 250px;
  }
  .recipe-card:hover {
    transform: scale(1) translateY(-5px);
    box-shadow: rgb(111, 111, 111) 0px 2px 6px;
  }
  .recipe-card:active {
    box-shadow: rgb(111, 111, 111) 0px 0px 3px;
    transform: scale(1) translateY(0px);
  }
</style>
