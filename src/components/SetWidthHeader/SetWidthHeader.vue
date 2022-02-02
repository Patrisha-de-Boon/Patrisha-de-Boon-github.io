<template>
  <h1 ref="hidden-header" class="console-header hidden">
    {{ section.title }}
  </h1>
  <div :style="headerStyle">
    <AnimatedComponent animationType="typing" class="no-width">
      <h1 class="console-header">{{ section.title }}</h1>
    </AnimatedComponent>
  </div>
</template>
<script lang="ts" src="./SetWidthHeader.ts"></script>
<style scoped lang="scss" src="./SetWidthHeader.scss"></style>
