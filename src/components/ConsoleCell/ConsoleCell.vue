<template>
  <div
    v-if="section"
    class="console-container"
    :style="'max-width: ' + maxWidth"
  >
    <SetWidthHeader :title="section.title" />
    <div class="body-section">
      <div class="body-left" v-if="section.imageSrc || section.iframeSrc">
        <a v-if="section.imageSrc" :href="section.href">
          <img :src="require('@/assets/' + section.imageSrc)" />
        </a>
        <div class="body-spacer"></div>
        <div v-if="section.iframeSrc" class="video-container">
          <iframe
            width="100%"
            height="100%"
            :src="section.iframeSrc"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="console-body body-right">
        <p>
          {{ section.body }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./ConsoleCell.ts"></script>
<style scoped lang="scss" src="./ConsoleCell.scss"></style>
