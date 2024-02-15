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

const fadeIn = trigger('fadeIn', [
  state(
    'void',
    style({
      opacity: 0,
    })
  ),

  state(
    '*',
    style({
      opacity: 1,
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.entering} ${PlenaryAnimationCurves.deceleration}`,
    },
  }),
]);

const fadeInTop = trigger('fadeInTop', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translate3d(0, -100%, 0)',
    })
  ),

  state(
    '*',
    style({
      opacity: 1,
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

const fadeInBottom = trigger('fadeInBottom', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translate3d(0, 100%, 0)',
    })
  ),

  state(
    '*',
    style({
      opacity: 1,
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

const fadeInLeft = trigger('fadeInLeft', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translate3d(-100%, 0, 0)',
    })
  ),

  state(
    '*',
    style({
      opacity: 1,
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

const fadeInRight = trigger('fadeInRight', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translate3d(100%, 0, 0)',
    })
  ),

  state(
    '*',
    style({
      opacity: 1,
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

const fadeOut = trigger('fadeOut', [
  state(
    '*',
    style({
      opacity: 1,
    })
  ),

  state(
    'void',
    style({
      opacity: 0,
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${PlenaryAnimationDurations.exiting} ${PlenaryAnimationCurves.acceleration}`,
    },
  }),
]);

const fadeOutTop = trigger('fadeOutTop', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      opacity: 0,
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

const fadeOutBottom = trigger('fadeOutBottom', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      opacity: 0,
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

const fadeOutLeft = trigger('fadeOutLeft', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      opacity: 0,
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

const fadeOutRight = trigger('fadeOutRight', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      opacity: 0,
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
  fadeIn,
  fadeInTop,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  fadeOut,
  fadeOutTop,
  fadeOutBottom,
  fadeOutLeft,
  fadeOutRight,
};
