<template>
  <!-- This file is based on https://michael-verschoof.medium.com/create-an-animated-vue-3-component-when-scrolling-into-view-f8e793e221c8-->
  <div ref="target">
    <transition name="typing">
      <div v-if="animate" class="animated-component">
        <slot />
      </div>
      <!-- <div v-else style="width: 0"></div> -->
    </transition>
  </div>
</template>
<script lang="ts" src="./AnimatedComponent.ts"></script>
<style lang="scss" src="./AnimatedComponent.scss"></style>
