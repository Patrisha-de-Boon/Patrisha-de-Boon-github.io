import { Options, Vue } from "vue-class-component";
import { ConsoleSection } from "@/models/ConsoleSection";
import SetWidthHeader from "../SetWidthHeader/SetWidthHeader.vue";

@Options({
  components: {
    SetWidthHeader,
  },
  props: {
    section: {
      type: Object as () => ConsoleSection,
      required: true,
    },
    maxWidth: {
      type: String,
      required: false,
      default: "700px",
    },
  },
})
export default class ConsoleList extends Vue {
  section!: ConsoleSection;
  maxWidth!: string;
  publicPath = process.env.BASE_URL;
}
