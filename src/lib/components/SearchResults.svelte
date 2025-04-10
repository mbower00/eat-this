<script>
  import LoadingAnimation from "./LoadingAnimation.svelte";
  import CardList from "./CardList.svelte";
  import Pagination from "./Pagination.svelte";
  import { searchRecipes } from "../external-services.mjs";
  let { query, options } = $props();
  let offset = $state(0);
  let number = $state(10);
  let totalResults = $state(0);
  // using code from https://svelte.dev/docs/svelte/$derived
  let searchPromise = $derived.by(async () => {
    let data = await searchRecipes(query || "", { offset, number, ...options });
    totalResults = data.totalResults;
    return data;
  });
  let pageNumber = $derived(offset / number + 1);
  let isLeftActive = $derived(offset - number >= 0);
  // TODO: test that this is correct...
  let isRightActive = $derived(offset + number < totalResults);

  function toPrevPage() {
    offset -= number;
  }
  function toNextPage() {
    offset += number;
  }
</script>

{#await searchPromise}
  <LoadingAnimation />
{:then recipes}
  <CardList recipes={recipes.results} />
  <Pagination
    {toNextPage}
    {toPrevPage}
    {pageNumber}
    {isLeftActive}
    {isRightActive}
  />
{/await}
