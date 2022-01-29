<template>
  <div class="popup">
      <div class="popup-inner">
          <slot />
      </div>
  </div>
</template>

<script setup>



</script>

<style>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
.popup .popup-inner {
    background: #FFF;
    padding: 32px;
    border-radius: 10px;
    border: rgb(75, 74, 74);
    border-width: 3px;
    border-style: solid;
}
</style>