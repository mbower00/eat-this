<script>
  import { logout } from "../../backend.svelte";
  import { userData } from "../../stores.svelte";
  import {
    getCustomRecipes,
    getFavoriteRecipes,
  } from "../../backend.svelte.js";
  import LoadingAnimation from "../LoadingAnimation.svelte";
  import CardList from "../CardList.svelte";

  let avatar = getAvatar();

  let customsPromise = $state(getCustomRecipes());
  let favoritesPromise = $state(getFavoriteRecipes());

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
  <div class="avatar-email-wrapper">
    {#if avatar}
      <img src={avatar} alt="avatar" class="avatar-img" />
    {:else}
      <!-- line copied from fontawesome.com () -->
      <i class="fa-regular fa-circle-user"></i>
    {/if}
    <p class="email">{userData.user.email}</p>
  </div>
  <div class="providers-logout-wrapper">
    <div class="providers-wrapper">
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
    </div>
    <!-- using code from https://www.w3schools.com/tags/att_global_title.asp -->
    <button
      class="logout-button tertiary-button"
      type="button"
      title="Log Out"
      onclick={logout}
    >
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-right-from-bracket"></i>
    </button>
  </div>
</section>

<h2>Favorites</h2>
<section class="favorites">
  {#await favoritesPromise}
    <LoadingAnimation />
  {:then favorites}
    {#if favorites.length > 0}
      <CardList recipes={favorites} />
    {:else}
      <p class="info-text">
        You have not added any recipes yet! <a href="#search">Find a recipe.</a>
      </p>
    {/if}
  {:catch error}
    <p class="info-text">There was an error getting your favorites.</p>
    <p class="info-text">{error.code}: {error.message}</p>
  {/await}
</section>

<h2>Custom Recipes</h2>
<section class="customs">
  {#await customsPromise}
    <LoadingAnimation />
  {:then customs}
    {#if customs.length > 0}
      <CardList recipes={customs} />
    {:else}
      <p class="info-text">
        You have not added any recipes yet! <a href="#search">Find a recipe.</a>
      </p>
    {/if}
  {:catch error}
    <p class="info-text">There was an error getting your favorites.</p>
    <p class="info-text">{error.code}: {error.message}</p>
  {/await}
  <form onsubmit={customAddedHandler}>
    <label for="recipe-name">Recipe Name</label>
    <input type="text" id="recipe-name" />
    <label for="recipe-description">Recipe Description</label>
    <textarea id="recipe-description" name="description" rows="6" cols="30"
    ></textarea>

    <button>Submit</button>
  </form>
</section>

<style>
  h1,
  h2 {
    text-align: center;
  }
  .profile-info {
    border: #ddd solid 1px;
    width: fit-content;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    position: relative;
  }
  .logout-button {
    display: block;
    height: fit-content;
    width: fit-content;
    position: absolute;
    top: 8px;
    right: 8px;
    color: rgb(225, 82, 82);
    border-color: rgb(225, 82, 82);
  }
  .avatar-email-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    gap: 15px;
  }
  .avatar-img {
    width: 75px;
    border-radius: 100%;
    box-shadow: #999 0px 2px 6px;
  }
  .email {
    width: fit-content;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
  }
  .logged-in-with {
    text-align: center;
    font-size: small;
    color: var(--light-text-color);
    margin-top: 30px;
  }
  .providers-flex {
    display: flex;
    width: fit-content;
    margin: 5px auto;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
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
  @media (min-width: 400px) {
    .providers-flex {
      flex-direction: row;
    }
    .avatar-email-wrapper {
      grid-template-columns: 75px 1fr;
    }
  }
</style>
