<script>
  import LoadingAnimation from "../LoadingAnimation.svelte";
  let testId = $state(1);
</script>

<h1>Welcome to the Home Page</h1>
<p>This is the main page of the application.</p>
<a href="#recipe?id={testId}">test recipe #</a><input
  type="number"
  bind:value={testId}
/>
