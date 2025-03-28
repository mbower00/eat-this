<script>
  import { logout } from "../../auth.svelte";
  import { userData } from "../../stores.svelte";

  let avatar = getAvatar();

  function getAvatar() {
    const avatarIdentities = userData.user.identities.filter((identity) => {
      return identity.identity_data.avatar_url;
    });
    return avatarIdentities[0]?.identity_data?.avatar_url;
  }

  function customAddedHandler(e) {
    e.preventDefault();
  }
</script>

<h1>My Hub</h1>

<section class="profile-info">
  <div class="avatar-div">
    {#if avatar}
      <img src={avatar} alt="Profile avatar" class="avatar-img" />
    {:else}
      <!-- line copied from fontawesome.com () -->
      <i class="fa-regular fa-circle-user"></i>
    {/if}
  </div>
  <p class="email">{userData.user.email}</p>
  <p class="logged-in-with">logged in with:</p>
  <div class="providers-flex">
    {#each userData.user.app_metadata.providers as provider}
      <span class="provider-flex">
        {#if provider === "email"}
          <!-- line copied from fontawesome.com -->
          <i class="fa-solid fa-envelope"></i>
          <span>Email</span>
        {:else if provider === "google"}
          <!-- line copied from fontawesome.com -->
          <i class="fa-brands fa-google"></i>
          <span>Google</span>
        {:else if provider === "github"}
          <!-- line copied from fontawesome.com -->
          <i class="fa-brands fa-github"></i>
          <span>Github</span>
        {:else if provider === "discord"}
          <!-- line copied from fontawesome.com -->
          <i class="fa-brands fa-discord"></i>
          <span>Discord</span>
        {/if}
      </span>
    {/each}
  </div>
  <button class="logout-button secondary-button" type="button" onclick={logout}
    >Log out</button
  >
</section>

<h2>Favorites</h2>
<section class="favorites-grid">
  <p class="info-text">
    You have not added any recipes yet! <a href="#search">Find a recipe.</a>
  </p>
</section>

<h2>Custom Recipes</h2>
<section class="customs-grid">
  <p class="info-text">You have not created any recipes yet!</p>
  <form onsubmit={customAddedHandler}></form>
</section>

<style>
  h1,
  h2 {
    text-align: center;
  }
  .logout-button {
    margin: 15px auto;
    display: block;
  }
  .email {
    width: fit-content;
    margin: 20px auto 15px auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
  }
  .logged-in-with {
    text-align: center;
    font-size: small;
    color: var(--light-text-color);
  }
  .providers-flex {
    display: flex;
    width: fit-content;
    margin: 5px auto;
    justify-content: center;
    gap: 10px;
  }
  .provider-flex {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--light-text-color);
    /* padding: 5px; */
    /* border-radius: 5px; */
    /* border: var(--light-text-color) 1px dashed; */
  }
  .avatar-div {
    margin: 0 auto;
    width: fit-content;
  }
  .avatar-img {
    width: 75px;
    border-radius: 100%;
    box-shadow: #999 0px 2px 6px;
  }
  .fa-circle-user {
    font-size: 75px;
    /* box-shadow: #999 0px 2px 6px;
    border-radius: 100%; */
  }
  .info-text {
    color: var(--light-text-color);
    text-align: center;
    a {
      color: var(--secondary-color);
    }
  }
</style>
