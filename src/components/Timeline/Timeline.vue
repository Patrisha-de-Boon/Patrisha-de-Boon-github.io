<template>
  <div>
    <!-- Timelines -->
    <div
      v-for="(sequence, i) in events"
      :key="i"
      style="margin: 0; padding: 0; height: 24px"
    >
      <!-- Event Months -->
      <div v-if="selectedEvent && selectedSequenceIndex == i">
        <div
          class="placeholder"
          :style="'left: ' + getTimeOffset(selectedEvent.start)"
        >
          <span class="time center">{{
            selectedEvent.start.format("MMMM")
          }}</span>
        </div>
        <div
          class="placeholder"
          :style="'left: ' + getTimeOffset(selectedEvent.end)"
        >
          <span class="time center">{{
            selectedEvent.end.format("MMMM")
          }}</span>
        </div>
      </div>

      <svg height="24" style="width: 100%; margin: 0; padding: 0">
        <!-- display line -->
        <line
          v-for="(event, j) in sequence"
          :key="j"
          :x1="getTimeOffset(event.start)"
          y1="12"
          :x2="getTimeOffset(event.end)"
          y2="12"
          :class="getEventClass(i, j)"
        />
        <!-- line for hover event -->
        <line
          v-for="(event, j) in sequence"
          :key="j"
          :x1="getHoverOffset(i, j, true)"
          y1="12"
          :x2="getHoverOffset(i, j, false)"
          y2="12"
          class="hover"
          @mouseover="hoverEvent(i, j)"
          @mouseleave="hoverEvent(null, null)"
        />
      </svg>
    </div>

    <!-- Scale -->
    <div class="Timeline grey">
      <div
        v-for="(n, index) in numYears"
        :key="index"
        class="placeholder"
        :style="getYearStyle(n)"
      >
        <span class="time center">{{ minDate.year() + n }}</span>
      </div>
      <svg height="42" style="width: 100%">
        <line x1="0%" y1="21" x2="100%" y2="21" />
        <circle
          v-for="(n, index) in numYears"
          :key="index"
          :cx="getYearOffset(n)"
          cy="21"
          r="20"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts" src="./Timeline.ts"></script>
<style scoped lang="scss" src="./Timeline.scss"></style>
