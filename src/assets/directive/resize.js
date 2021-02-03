import { addResizeListener, removeResizeListener } from "../lib/resize-event";
export default {
  inserted(el, binding) {
    let dom = el;
    let resizeHandle = binding.value;
    addResizeListener(dom, resizeHandle.bind(null, dom));
  },
  unbind(el, binding) {
    removeResizeListener(el, binding.value);
  }
};
