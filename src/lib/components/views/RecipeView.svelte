<script>
  import { getRecipeById } from "../../external-services.mjs";
  // comment generated from vscode
  // @ts-ignore
  import LoadingAnimation from "../LoadingAnimation.svelte";
  import ErrorView from "./ErrorView.svelte";

  let { id } = $props();
  let promise = $state();

  promise = getRecipeById(id);
</script>

{#await promise}
  <LoadingAnimation />
{:then recipe}
  <!-- using code from https://svelte.dev/playground/32f4d35f41eb4914aa3be5e4a0eacbfa?version=5.23.0 -->
  <h1>{recipe.title}</h1>
  <img src={recipe.image} alt={recipe.title} />
  <p>{@html recipe.summary}</p>
  <ul>
    {#each recipe.extendedIngredients as ingredient}
      <li>
        {ingredient.original}
      </li>
    {/each}
  </ul>
  {#each recipe.analyzedInstructions as instructionSet}
    <ol>
      {#each instructionSet.steps as instruction}
        <li>
          {@html instruction.step}
        </li>
      {/each}
    </ol>
  {/each}
  <p>
    Recipe from <a href={recipe.sourceUrl} target="_blank"
      >{recipe.sourceName}</a
    >
  </p>
{:catch error}
  <ErrorView {error} />
{/await}
