<script>
  import { login, signup, oauthLogin } from "../../auth.svelte.js";

  let email = $state("");
  let password = $state("");

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }
  function handleSignup(e) {
    signup({ email, password });
  }
</script>

<h1>Login/Signup</h1>

<form onsubmit={handleLogin}>
  <label for="email">Email</label>
  <input bind:value={email} type="email" name="email" placeholder="Email" />
  <label for="password">Password</label>
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Password"
  />
  <button class="secondary-button" type="button" onclick={handleSignup}
    >Sign up</button
  >
  <button>Log in</button>
  <button
    class="tertiary-button"
    type="button"
    onclick={(e) => {
      oauthLogin("google");
    }}
  >
    <!-- line copied from fontawesome.com -->
    <i class="fa-brands fa-google"></i>
    Google
  </button>
  <button
    class="tertiary-button"
    type="button"
    onclick={(e) => {
      oauthLogin("github");
    }}
  >
    <!-- line copied from fontawesome.com -->
    <i class="fa-brands fa-github"></i>
    GitHub
  </button>
  <button
    class="tertiary-button"
    type="button"
    onclick={(e) => {
      oauthLogin("discord");
    }}
  >
    <!-- line copied from fontawesome.com -->
    <i class="fa-brands fa-discord"></i>
    Discord
  </button>
</form>

<style>
  form {
  }
  input {
    height: 20px;
  }
</style>
