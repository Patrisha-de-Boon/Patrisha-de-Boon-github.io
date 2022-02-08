<template>
  <div class="console">
    <div v-for="(section, index) in sections" :key="index">
      <ConsoleCell :section="section" :maxWidth="maxWidth" />
    </div>
  </div>
</template>
<script lang="ts" src="./ConsoleList.ts"></script>
<style lang="scss" src="./ConsoleList.scss"></style>
