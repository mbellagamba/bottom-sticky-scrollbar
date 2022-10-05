const CONTROL_CLASS_NAME = 'sticky-scroll-control';

export function mountStickyScrollbar(selector: string | HTMLElement | null) {
  const element = getHTMLElement(selector);
  if (!element) return;

  const control = getControl(element) ?? createScrollControl(element);

  setWidth(control, element);
  setVisibility(control, element);
  return subscribeUserInteractions(control, element);
}

function createScrollControl(element: HTMLElement) {
  element.style.overflowX = 'auto';
  const control = document.createElement('div');
  control.className = CONTROL_CLASS_NAME;
  control.style.overflow = 'auto hidden';
  control.style.position = 'fixed';
  control.style.bottom = '0';
  setPosition(control, element);
  const scrollItem = document.createElement('div');
  scrollItem.style.lineHeight = '1px';
  scrollItem.style.width = element.scrollWidth + 'px';
  scrollItem.appendChild(document.createTextNode('\xA0'));
  control.appendChild(scrollItem);
  element.appendChild(control);
  return control;
}

function subscribeUserInteractions(control: HTMLElement, element: HTMLElement) {
  const onControlScroll = () => {
    element.scrollLeft = control.scrollLeft;
  };
  const onWindowScroll = () => {
    setVisibility(control, element);
    setPosition(control, element);
    control.scrollLeft = element.scrollLeft;
  };
  const onWindowResize = () => {
    setWidth(control, element);
  };
  control.addEventListener('scroll', onControlScroll);
  window.addEventListener('scroll', onWindowScroll);
  window.addEventListener('resize', onWindowResize);
  const unobserveResize = observeElementResize(control, element);
  return () => {
    control.removeEventListener('scroll', onControlScroll);
    window.removeEventListener('scroll', onWindowScroll);
    window.removeEventListener('resize', onWindowResize);
    unobserveResize();
  };
}

function setVisibility(control: HTMLElement, element: HTMLElement) {
  const { top, bottom } = element.getBoundingClientRect();
  const isVisible = bottom > window.innerHeight && top < window.innerHeight;
  control.style.display = isVisible ? 'block' : 'none';
}

function setWidth(control: HTMLElement, element: HTMLElement) {
  (control.firstChild as HTMLElement).style.width = element.scrollWidth + 'px';
}

function setPosition(control: HTMLElement, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  control.style.left = rect.left + 'px';
  control.style.right = document.body.clientWidth - rect.right + 'px';
}

function observeElementResize(control: HTMLElement, element: HTMLElement) {
  if (!('ResizeObserver' in window)) {
    return () => {
      /* */
    };
  }

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      setPosition(control, entry.target as HTMLElement);
    });
  });
  observer.observe(element);
  return () => observer.unobserve(element);
}

function getHTMLElement(selector: string | HTMLElement | null) {
  return typeof selector === 'string'
    ? document.querySelector<HTMLElement>(selector)
    : selector;
}

function getControl(element: HTMLElement) {
  return element.querySelector<HTMLElement>(`.${CONTROL_CLASS_NAME}`);
}
