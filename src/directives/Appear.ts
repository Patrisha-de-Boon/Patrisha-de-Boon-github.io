// This is from the following source: https://michael-verschoof.medium.com/create-an-animated-vue-3-component-when-scrolling-into-view-f8e793e221c8
import { Directive, DirectiveBinding, VNode } from "vue";

export const appear: Directive = {
  beforeMount(element: HTMLElement) {
    element.style.visibility = "hidden";
  },
  updated(
    element: HTMLElement,
    binding: DirectiveBinding<boolean>,
    node: VNode
  ) {
    if (!binding.value === !binding.oldValue || null === node.transition) {
      return;
    }
    if (!binding.value) {
      node.transition.leave(element, () => {
        element.style.visibility = "hidden";
      });
      return;
    }
    node.transition.beforeEnter(element);
    element.style.visibility = "";
    node.transition.enter(element);
  },
};
