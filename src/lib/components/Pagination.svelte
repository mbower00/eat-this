<script>
  let {toPrevPage, toNextPage, pageNumber, isLeftActive, isRightActive} = $props()

</script>

<div class="paginate">
  <!-- LEFT BUTTON -->
  <button onclick={toPrevPage} class="tertiary-button">
    <!-- code copied from fontawesome.com/ -->
    <i class="fa-solid fa-chevron-left"></i>
  </button>
  
  <!-- PAGE NUMBER -->
  <div>
    {pageNumber}
  </div>
  
  <!-- RIGHT BUTTON -->
  <button onclick={toNextPage} class="tertiary-button">
    <!-- code copied from fontawesome.com/ -->
    <i class="fa-solid fa-chevron-right"></i>
  </button>
</div>


<style>
  .paginate {
    display: flex;
    gap: 15px
  }
</style>