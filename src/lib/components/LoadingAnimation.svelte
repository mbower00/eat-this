<div class="container">
  <div class="spoon-container">
    <div class="spoon-handle"></div>
    <div class="spoon-bowl"></div>
  </div>
  <div class="bowl"></div>
</div>

<style>
  /* using code from: 
    - https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
    - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations
 */

  .container {
    width: 75px;
    height: 75px;
    /* border: 1px black dashed; */
    position: relative;
    margin: 15px auto 25px auto;
  }
  .bowl {
    width: 75px;
    height: 30px;
    border-radius: 0 0 50px 50px;
    background-color: var(--primary-color);
    bottom: 0px;
    position: absolute;
  }
  .spoon-container {
    /* border: 1px black dashed; */
    width: 45px;
    height: 10px;
    display: flex;
    position: absolute;
    animation: use-spoon 2s ease infinite;
  }
  .spoon-handle {
    width: 25px;
    height: 3px;
    border-radius: 5px 0 0 5px;
    background-color: var(--primary-color);
  }
  .spoon-bowl {
    width: 20px;
    height: 10px;
    /* border-radius: 0 5px 25px 18px; */
    border-radius: 0 5px 50px 50px;
    background-color: var(--primary-color);
  }

  @keyframes use-spoon {
    0% {
      transform: rotate(15deg) translate(4px, 20px);
    }
    25% {
      transform: rotate(63deg) translate(35px, 24px);
    }
    50% {
      transform: rotate(56deg) translate(45px, 6px);
    }
    75% {
      transform: rotate(-19deg) translate(17px, 26px);
    }
    100% {
      transform: rotate(15deg) translate(4px, 20px);
    }
  }
</style>
