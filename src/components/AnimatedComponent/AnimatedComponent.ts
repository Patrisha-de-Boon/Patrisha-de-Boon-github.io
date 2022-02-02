// This file is based on https://michael-verschoof.medium.com/create-an-animated-vue-3-component-when-scrolling-into-view-f8e793e221c8
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    animationType: {
      type: String,
      required: false,
      default: "typing",
    },
  },
})
export default class AnimatedComponent extends Vue {
  animationType!: string;
  target = ref();
  animate = false;

  mounted(): void {
    const test = this.$refs["target"];
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.animate = entry.isIntersecting;
      },
      {
        threshold: 0.5,
      }
    );

    if (test) {
      observer.observe(test as Element);
    }
  }
}
