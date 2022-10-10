import * as React from 'react';
import { mountStickyScrollbar } from 'sticky-scrollbar';

export function useBottomStickyScrollbar<E extends HTMLElement>(
  elementRef: React.RefObject<E>
) {
  React.useEffect(() => mountStickyScrollbar(elementRef.current));
}
