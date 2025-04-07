<!-- NOTE: THIS COMPONENT VIEW MULTIPE RECIPIES, THIS IS NOT SINGLE RECIPE VIEW-->
<script>
  import SearchResults from "../SearchResults.svelte";
  let { query, cuisine, diet } = $props();
</script>

<h1 class="queryTitle"><b>{query || cuisine || diet}</b></h1>
<SearchResults {query} options={{ cuisine, diet }} />

<style>
  .queryTitle {
    text-align: center;
    text-transform: capitalize;
    border-bottom: var(--primary-color) solid 3px;
  }
</style>
