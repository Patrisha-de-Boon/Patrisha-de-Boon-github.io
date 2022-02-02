import { Options, Vue } from "vue-class-component";
import { ConsoleSection } from "@/models/ConsoleSection";
import AnimatedComponent from "../AnimatedComponent/AnimatedComponent.vue";

@Options({
  components: {
    AnimatedComponent,
  },
  props: {
    section: {
      type: Object as () => ConsoleSection,
      required: false,
    },
  },
})
export default class SetWidthHeader extends Vue {
  section!: ConsoleSection;
  headerStyle = "";

  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const header: any = this.$refs["hidden-header"];
    if (header) {
      this.headerStyle = "width: " + header.clientWidth + "px";
    }
  }
}
