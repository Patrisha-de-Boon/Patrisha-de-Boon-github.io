import { Options, Vue as Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import AnimatedComponent from "../AnimatedComponent/AnimatedComponent.vue";

@Options({
  components: {
    AnimatedComponent,
  },
  props: {
    title: {
      type: String,
      required: false,
    },
  },
})
export default class SetWidthHeader extends Vue {
  title!: string;
  headerStyle = "";
  private isMounted = false;

  @Watch("title")
  public watchTitle(): void {
    if (this.isMounted) {
      this.$nextTick(function () {
        this.calculateWidth();
      });
    }
  }

  mounted(): void {
    this.calculateWidth();
    this.isMounted = true;
  }

  private calculateWidth(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const header: any = this.$refs["hidden-header"];
    if (header) {
      this.headerStyle = "width: " + header.clientWidth + "px";
    }
  }
}
