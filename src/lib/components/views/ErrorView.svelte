<script>
  let { error } = $props();
</script>

<!-- emoji code copied from https://www.w3schools.com/charsets/tryit.asp?deci=127837 -->
<h1>Uh oh spaghetti-O &#127837;</h1>
{#if error.code && error.message}
  <p><strong>{error.code}</strong> : {error.message}</p>
{:else}
  <p>There seems to have been an error!</p>
{/if}
<a href="#home">Back to home</a>
