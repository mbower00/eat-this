<!-- using code from https://svelte.dev/tutorial/svelte/in-and-out and https://svelte.dev/docs/svelte/svelte-transition-->

<script>
  import { userData } from "../stores.svelte";
  import { slide } from "svelte/transition";
  let isRecipesMenuShown = $state(false);

  const recipeOptions = [
    { name: "Chicken", paramString: "?query=chicken" },
    { name: "American", paramString: "?cuisine=american" },
    { name: "Italian", paramString: "?cuisine=italian" },
    { name: "Mexican", paramString: "?query=mexican" },
    { name: "Asian", paramString: "?query=asian" },
    { name: "Vegitarian", paramString: "?diet=vegitarian" },
    { name: "Paleo", paramString: "?diet=paleo" },
  ];
</script>

<header>
  <nav>
    <a href="#home" class="header-link"
      ><h3>Eat This</h3>
      <img class="logo" alt="logo" src="eatThisIcon.png" />
    </a>
    <menu>
      <li class="hoverable-li">
        <a href="#home">Home</a>
        <div class="bar"></div>
      </li>
      <li
        class="recipes-menu-option"
        onmouseenter={() => {
          isRecipesMenuShown = true;
        }}
        onmouseleave={() => {
          isRecipesMenuShown = false;
        }}
      >
        Recipes
        {#if isRecipesMenuShown}
          <menu
            in:slide={{ duration: 200 }}
            out:slide={{ duration: 200 }}
            class="recipes-menu"
          >
            {#each recipeOptions as option}
              <li class="hoverable-li">
                <a href={`#recipes${option.paramString}`}>{option.name}</a>
                <div class="bar"></div>
              </li>
            {/each}
          </menu>
        {/if}
      </li>
      <li class="hoverable-li">
        <a href="#search">
          <!-- line copied from fontawesome.com -->
          <i class="fa-solid fa-magnifying-glass"></i>
        </a>
        <div class="bar"></div>
      </li>
      <li class="hoverable-li">
        <a href="#user">
          {#if userData.isLoggedIn}
            <!-- line copied from fontawesome.com -->
            <i class="fa-solid fa-user"></i>
          {:else}
            Login
          {/if}
        </a>
        <div class="bar"></div>
      </li>
    </menu>
  </nav>
</header>

<style>
  header {
    background-color: var(--primary-color);
  }
  nav {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    align-items: center;
    gap: 13px;
  }
  h3 {
    margin: 0;
  }
  menu {
    list-style: none;
    display: flex;
    gap: 13px;
    margin: 0;
    padding: 0;
    font-size: small;
    a {
      text-decoration: none;
      color: white;
    }
  }

  li {
    font-size: large;
    color: white;
  }
  .recipes-menu {
    position: absolute;
    flex-direction: column;
    background-color: var(--primary-color);
    padding: 15px;
    margin-left: -15px;
    border-radius: 0 0 8px 8px;
    .hoverable-li {
      width: fit-content;
    }
  }
  .hoverable-li {
    position: relative;
    .bar {
      position: absolute;
      transform: scaleX(0%);
      width: 100%;
      height: 2px;
      background-color: white;
      transition: all ease 0.2s;
      bottom: -4;
      border-radius: 3px;
    }
    &:hover {
      .bar {
        transform: scaleX(100%);
      }
    }
  }
  .header-link {
    text-decoration: none;
    font-size: larger;
    color: white;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .logo {
    width: 20px;
    height: inherit;
  }
  .recipes-menu-option {
    cursor: default;
  }
  @media (min-width: 400px) {
    nav {
      gap: 15px;
    }
  }
</style>
