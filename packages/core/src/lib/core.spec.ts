import { initStickyScrollbar } from './core';

describe('Bottom sticky scrollbar', () => {
  it('should create a sticky control', () => {
    document.body.innerHTML =
      '<div id="content-container">' +
      '  <img src="" width="1000" height="1000" alt="" />' +
      '</div>';
    const container = document.getElementById('content-container');
    initStickyScrollbar(container);
    expect(document.querySelector('.sticky-scroll-control')).toBeDefined();
  });
});
