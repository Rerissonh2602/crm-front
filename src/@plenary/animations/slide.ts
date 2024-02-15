import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  PlenaryAnimationCurves,
  PlenaryAnimationDurations,
} from '@plenary/animations/defaults';

const slideInTop = trigger('slideInTop', [
  state(
    'void',
    style({
      transform: 'translate3d(0, -100%, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.entering} ${PlenaryAnimationCurves.deceleration}`,
    },
  }),
]);

const slideInBottom = trigger('slideInBottom', [
  state(
    'void',
    style({
      transform: 'translate3d(0, 100%, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.entering} ${PlenaryAnimationCurves.deceleration}`,
    },
  }),
]);

const slideInLeft = trigger('slideInLeft', [
  state(
    'void',
    style({
      transform: 'translate3d(-100%, 0, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.entering} ${PlenaryAnimationCurves.deceleration}`,
    },
  }),
]);

const slideInRight = trigger('slideInRight', [
  state(
    'void',
    style({
      transform: 'translate3d(100%, 0, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.entering} ${PlenaryAnimationCurves.deceleration}`,
    },
  }),
]);

const slideOutTop = trigger('slideOutTop', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(0, -100%, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.exiting} ${PlenaryAnimationCurves.acceleration}`,
    },
  }),
]);

const slideOutBottom = trigger('slideOutBottom', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(0, 100%, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.exiting} ${PlenaryAnimationCurves.acceleration}`,
    },
  }),
]);

const slideOutLeft = trigger('slideOutLeft', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(-100%, 0, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.exiting} ${PlenaryAnimationCurves.acceleration}`,
    },
  }),
]);

const slideOutRight = trigger('slideOutRight', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(100%, 0, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.exiting} ${PlenaryAnimationCurves.acceleration}`,
    },
  }),
]);

export {
  slideInTop,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideOutTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
};
