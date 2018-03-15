import { SCROLL_PERCENT, IS_SCROLL_UP} from '../action-type';

export const scrollPercentAction = (n)=>({
  type: SCROLL_PERCENT,
  payload:n,
});

export const isScrollUpAction = (n)=>({
  type: IS_SCROLL_UP,
  payload: n,
});
