<script>
  import CardList from "../CardList.svelte";
  import LoadingAnimation from "../LoadingAnimation.svelte";
  import { getRandomRecipes } from "../../external-services.mjs";
  let getRecipes = getRandomRecipes;
  const mode = import.meta.env.VITE_MODE;

  if (mode === "dev") {
    getRecipes = generateDevRecipes;
  }

  async function generateDevRecipes() {
    let recipes = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((number) => {
      return {
        title: `recipe id: ${number}`,
        id: number,
        // made using https://placehold.co/
        image: "https://placehold.co/300x200?text=Dev+Mode",
      };
    });
    return recipes;
  }

  let randomRecipesPromise = $state(getRecipes());
</script>

<!-- <h1>Let's Get Cooking</h1> -->

<div class="hero-image">
  <a href="#search">
    <button class="hero-button">Find a Recipe</button>
  </a>
</div>

<h1 class="popularsTitle">Popular Recipes!</h1>

{#await randomRecipesPromise}
  <LoadingAnimation />
{:then recipes}
  <CardList {recipes} />
{/await}

<style>
  .hero-image {
    position: relative;
    left: -15px;
    background-image: url(/hero-image-food.JPG);
    background-size: cover;
    background-position: center;
    height: 65vh;
    width: calc(100% + 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .hero-button {
    position: relative;
    width: 200px;
    height: 70px;
    border-radius: 20px;
    font-family: "Roboto", "San Serif";
    font-size: x-large;
    font-weight: bold;
    border: white solid 3px;
    background-color: #688b41;
    color: white;
    box-shadow: #000 0px 3px 10px;
    transition: all 0.2s ease;
  }
  .hero-button:hover {
    color: #7a2a37;
    border-color: #7a2a37;
    transform: scale(1.01) translateY(-3px);
  }

  .popularsTitle {
    text-align: center;
    font-size: xx-large;
    border-bottom: 2px solid var(--primary-color);
    width: 100%;
  }
</style>
