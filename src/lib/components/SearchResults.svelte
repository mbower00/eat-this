<script>
  import LoadingAnimation from "./LoadingAnimation.svelte"
  import CardList from "./CardList.svelte"
  import Pagination from "./Pagination.svelte"
  import {searchRecipes} from "../external-services.mjs"
  let {query, options} = $props()
  let offset = $state(0)
  let number = $state(10)
  searchRecipes(query, {offset, number, ...options}).then((data) => {console.log(data)})
  let searchPromise = $state(searchRecipes(query, {offset, number, ...options}));
  // using code from https://svelte.dev/docs/svelte/$derived
  let pageNumber = $derived(
    ( offset / number ) + 1
  )
  let isLeftActive = $derived(
    offset - number >= 0
  )
  let isRightActive = $derived(
    true
  )
  function toPrevPage() {
    offset -= number
  }
  function toNextPage() {
    offset += number
  }
</script>

{#await searchPromise}
  <LoadingAnimation />
{:then recipes} 
  <CardList recipes={recipes.results}/>
  <Pagination {toNextPage} {toPrevPage} {pageNumber} {isLeftActive} {isRightActive}/>
{/await}