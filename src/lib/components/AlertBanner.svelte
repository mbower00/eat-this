<!-- using code from https://svelte.dev/tutorial/svelte/in-and-out -->

<script>
  import { fly } from "svelte/transition";
  import { alertData } from "../stores.svelte.js";
  function getAlertClass() {
    switch (alertData.type) {
      case "success":
        return "success";
      case "error":
        return "error";
      default:
        return "";
    }
  }

  function closeAlertHandler() {
    alertData.isShown = false;
  }
</script>

<div class="alert-wrapper">
  <!-- below 2 comments generated with VSCode: -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={getAlertClass() + " alert"}
    in:fly={{ x: -50, duration: 500 }}
    out:fly={{ x: 50, duration: 500 }}
    onclick={closeAlertHandler}
  >
    {#if alertData.type === "success"}
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-circle-check"></i>
    {:else if alertData.type === "error"}
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-triangle-exclamation"></i>
    {:else}
      <!-- line copied from fontawesome.com -->
      <i class="fa-solid fa-bell"></i>
    {/if}
    <div>
      <div>{alertData.message}</div>
    </div>
  </div>
</div>

<style>
  .alert-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 40px;
  }
  .alert {
    box-shadow: #999 0px 2px 5px;
    max-width: 250px;
    z-index: 3;
    background-color: rgb(107, 107, 107);
    color: white;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    font-size: smaller;
    gap: 10px;
    cursor: pointer;
    i {
      font-size: 25px;
    }
    &:hover {
      animation: wobble 0.4s ease-out;
    }
  }
  .success {
    background-color: rgb(0, 179, 0);
  }
  .error {
    background-color: rgb(193, 0, 0);
  }
  @keyframes wobble {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
