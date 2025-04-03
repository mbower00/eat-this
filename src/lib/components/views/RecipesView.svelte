<!-- NOTE: THIS COMPONENT VIEW MULTIPE RECIPIES, THIS IS NOT SINGLE RECIPE VIEW-->
<script>
  let {query, cuisine, diet} = $props()
  import CardList from "../CardList.svelte";
  import LoadingAnimation from "../LoadingAnimation.svelte";
  import Pagination from "../Pagination.svelte";
</script>
<!-- <p>this page should show <b>{query}</b> <b>{cuisine}</b> <b>{diet}</b> recipes</p> -->

<h1 class="queryTitle"><b>{query || cuisine || diet}</b></h1>

<style>
  .queryTitle {
    text-align: center;
    text-transform: capitalize;
    border-bottom: var(--primary-color) solid 3px;
  }
</style>