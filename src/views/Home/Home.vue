<template>
  <div class="full-screen black" ref="cover">
    <div
      class="full-screen home-background blur absolute"
      v-bind:class="{ hidden: fixBackground }"
    ></div>
    <div class="centered title-background shaded">
      <span class="centered index-title-text text-center">
        Patrisha de Boon
      </span>
    </div>
  </div>

  <div id="page">
    <div id="page-content">
      <!-- About -->
      <div ref="about" v-if="aboutSections">
        <div class="nav-spacer"></div>
        <ConsoleList :sections="aboutSections" class="about" />
      </div>

      <!-- Career -->
      <div ref="career">
        <div class="nav-spacer"></div>

        <Timeline
          @hovered="onEventHovered"
          :events="careerEvents"
          style="padding: 20px"
        />

        <!-- Selected Event -->
        <div v-if="selectedEvent" class="console absolute wide">
          <ConsoleCell
            :section="eventToConsoleSection(selectedEvent)"
            maxWidth="min(max(40vw, 900px), 1200px)"
          />
        </div>
        <div v-else class="console absolute wide">
          <!-- Hint to show the user how to interact with the timeline -->
          <ConsoleCell :section="hintEventSection" maxWidth="700px" />
        </div>
        <div v-if="longestDisplayCareer" class="console relative hidden wide">
          <!-- Placeholder so the page doesn't shift too much -->
          <ConsoleCell
            :section="eventToConsoleSection(longestDisplayCareer)"
            maxWidth="min(max(40vw, 900px), 1200px)"
          />
        </div>
      </div>

      <!-- Portfolio -->
      <div ref="portfolio">
        <div class="nav-spacer"></div>
        <ConsoleList
          :sections="portfolioSections"
          maxWidth="min(max(40vw, 900px), 1200px)"
        />
      </div>
    </div>
  </div>

  <div v-show="fixBackground" class="full-screen nav-bar-background black">
    <div class="full-screen home-background blur nav-bar-background"></div>
  </div>

  <!-- Nav bar -->
  <div id="nav-bar">
    <div id="inner-nav-bar">
      <a href="#">
        <img id="nav-bar-logo" src="../../assets/logo.svg" height="100%" />
      </a>
      <div id="nav-bar-text">
        <a class="nav-bar-item" @click="scrollTo('about', true)">About</a>
        <a class="nav-bar-item" @click="scrollTo('career', true)">Career</a>
        <a class="nav-bar-item" @click="scrollTo('portfolio', true)">
          Portfolio
        </a>
        <a class="nav-bar-item" @click="openResume()">Resume</a>
      </div>
    </div>
  </div>

  <!-- Credit Badge for background photo -->
  <a
    id="background-credit-badge"
    href="https://unsplash.com/@umby?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
    target="_blank"
    rel="noopener noreferrer"
    title="Photo by Umberto on Unsplash"
  >
    <span id="background-credit-badge-icon">
      <svg
        id="background-credit-badge-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <title>unsplash-logo</title>
        <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
      </svg>
    </span>
    <span id="background-credit-badge-title">Photo Credit</span>
  </a>
</template>

<script lang="ts" src="./Home.ts"></script>
<style lang="scss" src="./Home.scss"></style>
