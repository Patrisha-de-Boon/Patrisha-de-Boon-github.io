import { Options, Vue } from "vue-class-component";
import { Moment } from "moment";
import { TimelineEvent } from "@/models/TimelineEvent";

@Options({
  props: {
    events: {
      type: Object as () => TimelineEvent[][],
      required: false,
    },
  },
})
export default class TimelineVue extends Vue {
  events!: TimelineEvent[][];
  selectedSequenceIndex: number | null = null;
  selectedEventIndex: number | null = null;
  minDate!: Moment;
  maxDate!: Moment;

  created(): void {
    this.events.forEach((sequence: TimelineEvent[]) => {
      sequence.forEach((event: TimelineEvent) => {
        if (!this.minDate || event.start < this.minDate) {
          this.minDate = event.start;
        }

        if (!this.maxDate || event.end > this.maxDate) {
          this.maxDate = event.end;
        }
      });
    });
  }

  get numYears(): number {
    return this.maxDate.year() - this.minDate.year();
  }

  get selectedEvent(): TimelineEvent | null {
    if (this.selectedSequenceIndex != null && this.selectedEventIndex != null) {
      return this.events[this.selectedSequenceIndex][this.selectedEventIndex];
    }

    return null;
  }

  getYearOffset(yearIndex: number): string {
    return ((100 / (this.numYears + 1)) * yearIndex).toString() + "%";
  }

  getYearStyle(yearIndex: number): string {
    return "left: " + this.getYearOffset(yearIndex);
  }

  getSequenceStyle(sequenceIndex: number): string {
    return "top: " + (12 + 20 * sequenceIndex).toString() + "px;";
  }

  getEventClass(sequenceIndex: number, eventIndex: number): string {
    const event = this.events[sequenceIndex][eventIndex];
    let cssClass = event.cssClass;

    if (!event.fullTime) {
      cssClass = cssClass + " dotted";
    }

    if (
      sequenceIndex == this.selectedSequenceIndex &&
      this.selectedEvent &&
      this.selectedEvent.cssClass == event.cssClass
    ) {
      cssClass = cssClass + " selected";
    }

    return cssClass;
  }

  getEventHoverStyle(event: TimelineEvent): string {
    const start = this.getTimeOffsetValue(event.start);
    const width = this.getTimeOffsetValue(event.end) - start;
    return "left: " + start + "; width: " + width + ";";
  }

  getTimeOffset(time: Moment): string {
    return this.getTimeOffsetValue(time).toString() + "%";
  }

  getTimeOffsetValue(time: Moment): number {
    const yearIndex = time.year() - this.minDate.year();
    const yearOffset = 100 / (this.numYears + 1);
    const monthOffset = yearOffset / 12;
    const dayOffset = monthOffset / time.daysInMonth();

    return (
      yearOffset * yearIndex +
      monthOffset * time.month() +
      dayOffset * time.date()
    );
  }

  getHoverOffset(
    sequenceIndex: number,
    eventIndex: number,
    start: boolean
  ): string {
    const event = this.events[sequenceIndex][eventIndex];
    if (start) {
      if (eventIndex == 0) {
        return this.getTimeOffset(event.start);
      } else {
        const prevEvent = this.events[sequenceIndex][eventIndex - 1];
        const lastEnd = this.getTimeOffsetValue(prevEvent.end);
        const curStart = this.getTimeOffsetValue(event.start);
        return lastEnd + (curStart - lastEnd) / 2 + "%";
      }
    } else {
      if (eventIndex == this.events[sequenceIndex].length - 1) {
        return this.getTimeOffset(event.end);
      } else {
        const nextEvent = this.events[sequenceIndex][eventIndex + 1];
        const nextStart = this.getTimeOffsetValue(nextEvent.start);
        const curEnd = this.getTimeOffsetValue(event.end);
        return curEnd + (nextStart - curEnd) / 2 + "%";
      }
    }
  }

  hoverEvent(sequenceIndex: number | null, eventIndex: number | null): void {
    this.selectedSequenceIndex = sequenceIndex;
    this.selectedEventIndex = eventIndex;

    if (
      sequenceIndex != null &&
      sequenceIndex >= 0 &&
      eventIndex != null &&
      eventIndex >= 0
    ) {
      this.$emit("hovered", this.events[sequenceIndex][eventIndex]);
    } else {
      this.$emit("hovered", null);
    }
  }
}
