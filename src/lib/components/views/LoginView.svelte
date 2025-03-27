<script>
  import { login, signup, oauthLogin } from "../../auth.svelte.js";
  import { searchRecipes, getRandomRecipes } from "../../external-services.mjs";

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

<h1>Login or Signup</h1>

<form onsubmit={handleLogin}>
  <!-- <label for="email">Email</label> -->
  <input bind:value={email} type="email" name="email" placeholder="Email" />
  <!-- <label for="password">Password</label> -->
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Password"
  />
  <div class="flex-buttons">
    <button class="secondary-button" type="button" onclick={handleSignup}
      >Sign up</button
    >
    <button>Log in</button>
  </div>

  <p>or use</p>

  <div class="flex-buttons">
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
  </div>
</form>

<style>
  form {
    width: fit-content;
    margin: 0 auto;
  }
  input {
    height: 20px;
    text-align: center;
    font-size: large;
    padding: 5px;
    display: block;
    margin: 0 auto 15px auto;
    width: 265px;
  }
  .flex-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 15px;
  }
  h1 {
    text-align: center;
  }
  p {
    text-align: center;
  }
</style>
