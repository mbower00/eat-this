<script>
  // using code from:
  // - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
  // - https://www.npmjs.com/package/base64-2-img
  // using method from:
  // - https://www.reddit.com/r/Supabase/comments/10twlwn/easiest_way_to_add_an_image_to_a_row_of_data/?rdt=52894

  import {
    logout,
    addImage,
    addCustom,
    deleteCustom,
  } from "../../backend.svelte";
  import { userData } from "../../stores.svelte";
  import {
    getCustomRecipes,
    getFavoriteRecipes,
  } from "../../backend.svelte.js";
  import LoadingAnimation from "../LoadingAnimation.svelte";
  import CardList from "../CardList.svelte";
  import { onMount } from "svelte";
  import { showAlert } from "../../utils.mjs";

  let avatar = $state();

  let customsPromise = $state(getCustomRecipes());
  let favoritesPromise = $state(getFavoriteRecipes());

  let shownCustom = $state(null);
  let recipeName = $state("");
  let recipeDescription = $state("");
  let recipeIngredients = $state([]);
  let recipeInstructions = $state([]);

  let ingredientsNumber = $state(1);
  let instructionsNumber = $state(1);
  // using code from https://svelte.dev/docs/svelte/$derived
  let ingredientsRange = $derived(new Array(ingredientsNumber));
  let instructionsRange = $derived(new Array(instructionsNumber));

  function getAvatar() {
    const avatarIdentities = userData.user.identities.filter((identity) => {
      return identity.identity_data.avatar_url;
    });
    return avatarIdentities[0]?.identity_data?.avatar_url;
  }

  async function customAddedHandler(e) {
    e.preventDefault();
    recipeIngredients.length = ingredientsNumber;
    recipeInstructions.length = instructionsNumber;

    const ingredients = JSON.stringify({
      data: recipeIngredients,
    });
    const instructions = JSON.stringify({
      data: recipeInstructions,
    });

    // below comment generated from vscode
    // @ts-ignore
    const imageFile = document.getElementById("recipe-img").files[0];
    const image = await addImage(imageFile);

    const customsData = {
      title: recipeName,
      description: recipeDescription,
      ingredients,
      instructions,
      image,
      profile_id: userData.user.id,
    };

    addCustom(customsData);

    customsPromise = getCustomRecipes();
    e.reset();
  }

  function showCustomRecipe(recipe) {
    shownCustom = recipe;
    // using code from https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    document.getElementById("customs-header").scrollIntoView(true);
  }

  async function deleteCustomHandler() {
    await deleteCustom(shownCustom);
    shownCustom = null;
    customsPromise = getCustomRecipes();
  }

  function init() {
    avatar = getAvatar();
  }
  onMount(init);
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
      class="logout-button red-button tertiary-button"
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

<h2 id="customs-header">Custom Recipes</h2>
<section class="customs">
  {#if shownCustom}
    <div class="showing-custom customs-card">
      <button
        class="tertiary-button x-button"
        onclick={() => {
          shownCustom = null;
        }}
      >
        <!-- line copied from fontawesome.com -->
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h3>{shownCustom.title}</h3>
      <img src={shownCustom.image} alt={shownCustom.title} />
      <p>{shownCustom.description}</p>
      <h4>Ingredients</h4>
      <ul>
        {#each JSON.parse(shownCustom.ingredients).data as ingredient}
          <li>
            {ingredient}
          </li>
        {/each}
      </ul>
      <h4>Instructions</h4>
      <ol>
        {#each JSON.parse(shownCustom.instructions).data as instruction}
          <li>
            {instruction}
          </li>
        {/each}
      </ol>
      <!-- using code from https://www.w3schools.com/tags/att_global_title.asp -->
      <button
        class="tertiary-button red-button trash-button"
        onclick={deleteCustomHandler}
        title="Delete recipe"
      >
        <!-- line copied from fontawesome.com -->
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  {/if}

  {#await customsPromise}
    <LoadingAnimation />
  {:then customs}
    {#if customs.length > 0}
      <CardList recipes={customs} customAction={showCustomRecipe} />
    {:else}
      <p class="info-text">
        You have not added any recipes yet! Add one in the form below.
      </p>
    {/if}
  {:catch error}
    <p class="info-text">There was an error getting your custom recipe.</p>
    <p class="info-text">{error.code}: {error.message}</p>
  {/await}

  <form class="customs-form customs-card" onsubmit={customAddedHandler}>
    <h3>Create a Recipe</h3>

    <label for="recipe-name">
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-pen"></i>
      Recipe Name</label
    >
    <input
      type="text"
      class="text-input"
      id="recipe-name"
      bind:value={recipeName}
    />

    <label for="recipe-description">
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-pen-to-square"></i>
      Recipe Description
    </label>
    <textarea
      id="recipe-description"
      name="description"
      bind:value={recipeDescription}
      rows="6"
      cols="30"
    ></textarea>

    <span>
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-carrot"></i>
      Ingredients (
      <input
        type="number"
        class="number-input"
        min="1"
        bind:value={ingredientsNumber}
      /> )
    </span>
    <ul>
      <!-- using code from https://svelte.dev/docs/svelte/each -->
      {#each ingredientsRange as value, i}
        <li>
          <input
            type="text"
            class="text-input"
            bind:value={recipeIngredients[i]}
          />
        </li>
      {/each}
    </ul>

    <span>
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-list-ol"></i>
      Instructions (
      <input
        type="number"
        class="number-input"
        min="1"
        bind:value={instructionsNumber}
      /> )
    </span>
    <ol>
      <!-- using code from https://svelte.dev/docs/svelte/each -->
      {#each instructionsRange as value, i}
        <li>
          <input
            type="text"
            class="text-input"
            bind:value={recipeInstructions[i]}
          />
        </li>
      {/each}
    </ol>

    <label for="recipe-img">
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-image"></i>
      Picture</label
    >
    <input id="recipe-img" type="file" />

    <button class="customs-submit">Submit</button>
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
  .red-button {
    display: block;
    height: fit-content;
    width: fit-content;
    position: absolute;
    color: rgb(225, 82, 82);
    border-color: rgb(225, 82, 82);
  }
  .logout-button {
    top: 8px;
    right: 8px;
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
  .showing-custom {
    position: relative;
    img {
      width: 100%;
      max-width: 300px;
      border-radius: 10px;
      margin: 0 auto;
    }
    ol,
    ul {
      margin: 0;
    }
    p,
    h4 {
      margin: 10px 0 0 0;
    }
  }
  .x-button {
    position: absolute;
    right: 8px;
    top: 8px;
    color: #aaa;
    border-color: #aaa;
    line-height: 0;
    padding: 3.5px 5px;
  }
  .trash-button {
    bottom: 8px;
    right: 8px;
    font-size: x-small;
    padding: 5px;
    line-height: 0;
  }
  .customs-card {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 auto 15px auto;
    border-radius: 10px;
    border: #ddd solid 1px;
    max-width: 500px;
    h3 {
      text-align: center;
      margin: 0 0 20px 0;
    }
  }
  .customs-form {
    ul,
    ol {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
  }
  .customs-submit {
    width: fit-content;
    align-self: center;
  }
  .text-input {
    max-width: 200px;
  }
  .number-input {
    width: 35px;
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
