<script>
  import { logout } from "../../auth.svelte";
</script>

<h1>User Hub</h1>
<p>Welcome to your dashboard.</p>
<button type="button" onclick={logout}>Log out</button>
