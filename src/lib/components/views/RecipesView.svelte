<!-- NOTE: THIS COMPONENT VIEW MULTIPE RECIPIES, THIS IS NOT SINGLE RECIPE VIEW-->
<script>
  let {query, cuisine, diet} = $props()
  import CardList from "../CardList.svelte";
  import LoadingAnimation from "../LoadingAnimation.svelte";
  // searchRecipes(query, {cuisine : cuisine})
</script>
<p>this page should show <b>{query}</b> <b>{cuisine}</b> <b>{diet}</b> recipes</p>

<!-- {#await query}
  <LoadingAnimation />
{:then } 
  <CardList {recipes.query}/>
  
{/await} -->