<template>
  <div class="console">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="console-container"
      :style="'max-width: ' + maxWidth"
    >
      <SetWidthHeader :section="section" />
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
          {{ section.body }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./Console.ts"></script>
<style scoped lang="scss" src="./Console.scss"></style>
