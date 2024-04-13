
const HANDLERS_PROPERTY = "__v-click-outside" as const;
type TrackedHTMLElement = HTMLElement & { [HANDLERS_PROPERTY]?:  Array<{ event: string; srcTarget: HTMLElement| Window & typeof globalThis; handler: (event: Event) => void; capture: boolean; }>; }
type BindType = {
  el: TrackedHTMLElement
  event: Event;
  handler: Function;
  middleware?: Function;
  events?: string[];
  isActive?: boolean;
  detectIframe?: boolean;
  capture?: boolean
}

const HAS_WINDOWS = typeof window !== "undefined";
const HAS_NAVIGATOR = typeof navigator !== "undefined";
const IS_TOUCH =
  HAS_WINDOWS &&
  ("ontouchstart" in window ||
    (HAS_NAVIGATOR && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)));
const EVENTS = IS_TOUCH ? ["touchstart"] : ["click"];
const processDirectiveArguments = (bindingValue: Function | BindType) => {
  const isFunction = typeof bindingValue === "function";
  if (!isFunction && typeof bindingValue !== "object") {
    throw new Error(
      "v-click-outside: Binding value must be a function or an object"
    );
  }
  return isFunction ? {
    handler: bindingValue,
    middleware: ((item:any) => item),
    events: EVENTS,
    isActive: true,
    detectIframe: true,
    capture: false,
  }:{
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: bindingValue.middleware || ((item:any) => item),
    events: bindingValue.events || EVENTS,
    isActive: !(bindingValue.isActive === false),
    detectIframe: !(bindingValue.detectIframe === false),
    capture: Boolean(bindingValue.capture),
  };
};
const execHandler = ({ event, handler, middleware }:{event: Event; handler: Function; middleware: Function}) => {
  if (middleware(event)) {
    handler(event);
  }
};
const onFauxIframeClick = ({ el, event, handler, middleware=((item:any) => item) }:BindType) => {
  setTimeout(() => {
    const { activeElement } = document;
    if (
      activeElement &&
      activeElement.tagName === "IFRAME" &&
      !el.contains(activeElement)
    ) {
      execHandler({ event, handler, middleware });
    }
  }, 0);
};
const onEvent = ({ el, event, handler, middleware =((item:any) => item) }:BindType) => {
  const path = (event as any).path || (event.composedPath && event.composedPath());
  const isClickOutside = path
    ? path.indexOf(el) < 0
    : !el.contains(event.target as HTMLElement);
  if (!isClickOutside) {
    return;
  }
  execHandler({ event, handler, middleware });
};
const beforeMount = (el: TrackedHTMLElement, { value }: { value: Function | BindType }) => {
  const {
    events,
    handler,
    middleware,
    isActive,
    detectIframe,
    capture,
  } = processDirectiveArguments(value);
  if (!isActive) {
    return;
  }
  el[HANDLERS_PROPERTY] = events.map((eventName) => ({
    event: eventName,
    srcTarget: document.documentElement,
    handler: (event: Event) => onEvent({ el, event, handler, middleware }),
    capture,
  }));
  if (detectIframe) {
    const detectIframeEvent = {
      event: "blur",
      srcTarget: window,
      handler: (event: Event) => onFauxIframeClick({ el, event, handler, middleware }),
      capture,
    };
    el[HANDLERS_PROPERTY] = [...el[HANDLERS_PROPERTY], detectIframeEvent];
  }
  el[HANDLERS_PROPERTY].forEach(({ event, srcTarget, handler: thisHandler }) =>
    setTimeout(() => {
      if (!el[HANDLERS_PROPERTY]) {
        return;
      }
      srcTarget.addEventListener(event, thisHandler, capture);
    }, 0)
  );
};
const unmounted = (el : TrackedHTMLElement) => {
  const handlers = el[HANDLERS_PROPERTY] || [];
  handlers.forEach(({ event, srcTarget, handler, capture }) =>
    srcTarget.removeEventListener(event, handler, capture)
  );
  delete el[HANDLERS_PROPERTY];
};
const updated = (el: TrackedHTMLElement, { value, oldValue }: { value: Function | BindType; oldValue: Function | BindType }) => {
  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return;
  }
  unmounted(el);
  beforeMount(el, { value });
};
const directive = {
  name: "click-outside",
  beforeMount,
  updated,
  unmounted,
};
export default HAS_WINDOWS ? directive : {name: "click-outside"};