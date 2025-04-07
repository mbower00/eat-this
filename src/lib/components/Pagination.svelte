<script>
  let { toPrevPage, toNextPage, pageNumber, isLeftActive, isRightActive } =
    $props();
</script>

<div class="paginate">
  <!-- LEFT BUTTON -->
  {#if isLeftActive}
    <button onclick={toPrevPage} class="tertiary-button">
      <!-- code copied from fontawesome.com/ -->
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  {:else}
    <div class="disabled">
      <!-- code copied from fontawesome.com/ -->
      <i class="fa-solid fa-chevron-left"></i>
    </div>
  {/if}

  <!-- PAGE NUMBER -->
  <div>
    {pageNumber}
  </div>

  <!-- RIGHT BUTTON -->
  {#if isRightActive}
    <button onclick={toNextPage} class="tertiary-button">
      <!-- code copied from fontawesome.com/ -->
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  {:else}
    <div class="disabled">
      <!-- code copied from fontawesome.com/ -->
      <i class="fa-solid fa-chevron-right"></i>
    </div>
  {/if}
</div>

<style>
  .paginate {
    display: flex;
    gap: 15px;
    align-items: center;
    width: fit-content;
    margin: 0 auto 15px auto;
  }
  .disabled {
    color: #999;
    border-radius: 3px;
    padding: 5px;
    border: 1px #999 dashed;
    font-size: small;
  }
</style>
