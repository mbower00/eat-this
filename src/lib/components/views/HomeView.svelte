<script>
  import CardList from "../CardList.svelte";
  import LoadingAnimation from "../LoadingAnimation.svelte";
  let testId = $state(1);
  const exampleData=[
    {
      "id": 640123,
      "title": "Cornbread Panzanella",
      "image": "https://img.spoonacular.com/recipes/640123-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 658753,
      "title": "Roma Tomato Bruschetta",
      "image": "https://img.spoonacular.com/recipes/658753-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 1095751,
      "title": "Fresh Tomato Risotto with Grilled Green Vegetables",
      "image": "https://img.spoonacular.com/recipes/1095751-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 644205,
      "title": "Garden Vegetable Ravioli With Tomato Brodo",
      "image": "https://img.spoonacular.com/recipes/644205-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 643175,
      "title": "Focaccia with Tomato, Green Onion and Garlic",
      "image": "https://img.spoonacular.com/recipes/643175-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 716300,
      "title": "Plantain Pizza",
      "image": "https://img.spoonacular.com/recipes/716300-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 658024,
      "title": "Minestrone Soup",
      "image": "https://img.spoonacular.com/recipes/658024-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 638002,
      "title": "Chicken Cacciatore",
      "image": "https://img.spoonacular.com/recipes/638002-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 655847,
      "title": "Pesto Veggie Pizza",
      "image": "https://img.spoonacular.com/recipes/655847-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 664481,
      "title": "Vegan Risotto Cakes",
      "image": "https://img.spoonacular.com/recipes/664481-312x231.jpg",
      "imageType": "jpg"
    }
  ];
</script>

<h1>Let's Get Cooking</h1>
<!-- <p>This is the main page of the application.</p> -->

<div class="hero-image">
  <button class="hero-button">Find a  Recipe</button>
</div>

<a href="#recipe?id={testId}">test recipe #</a><input
  type="number"
  bind:value={testId}
/>

  <CardList recipes={exampleData}/>

<style>
  .hero-image {
    background-image: url(/hero-image-food.JPG);
    background-size: cover;
    background-position: center;
    height: 65vh;
    width: 100%;
    
  }
  .hero-button {
    position: relative;
    left: 40%;
    top: 50%;
    width: 15%;
    height: 15%;
    border-radius: 20px;
    font-family: "Roboto", "San Serif";
    font-size: x-large;
    font-weight: bold;
    border: white solid 3px;
    background-color: #688b41;
    color: white;
    box-shadow: #000 0px 3px 10px;
    transition: all .2s ease;
  }
  .hero-button:hover {
    color: #7a2a37;
    border-color: #7a2a37;
    transform: scale(1.01) translateY(-3px);
  }


    
</style>