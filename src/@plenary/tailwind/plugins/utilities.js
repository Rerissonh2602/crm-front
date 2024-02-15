const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.mat-icon': {
      '--tw-text-opacity': '1',
      color: 'rgba(var(--plenary-mat-icon-rgb), var(--tw-text-opacity))',
    },
    '.text-default': {
      '--tw-text-opacity': '1 !important',
      color:
        'rgba(var(--plenary-text-default-rgb), var(--tw-text-opacity)) !important',
    },
    '.text-secondary': {
      '--tw-text-opacity': '1 !important',
      color:
        'rgba(var(--plenary-text-secondary-rgb), var(--tw-text-opacity)) !important',
    },
    '.text-hint': {
      '--tw-text-opacity': '1 !important',
      color:
        'rgba(var(--plenary-text-hint-rgb), var(--tw-text-opacity)) !important',
    },
    '.text-disabled': {
      '--tw-text-opacity': '1 !important',
      color:
        'rgba(var(--plenary-text-disabled-rgb), var(--tw-text-opacity)) !important',
    },
    '.divider': {
      color: 'var(--plenary-divider) !important',
    },
    '.bg-card': {
      '--tw-bg-opacity': '1 !important',
      backgroundColor:
        'rgba(var(--plenary-bg-card-rgb), var(--tw-bg-opacity)) !important',
    },
    '.bg-sidebar': {
      '--tw-bg-opacity': '1 !important',
      backgroundColor:
        'rgba(var(--plenary-bg-sidebar-rgb), var(--tw-bg-opacity)) !important',
    },
    '.bg-default': {
      '--tw-bg-opacity': '1 !important',
      backgroundColor:
        'rgba(var(--plenary-bg-default-rgb), var(--tw-bg-opacity)) !important',
    },
    '.bg-contrast': {
      '--tw-bg-opacity': '1 !important',
      backgroundColor:
        'rgba(var(--plenary-bg-contrast-rgb), var(--tw-bg-opacity)) !important',
    },
    '.bg-dialog': {
      '--tw-bg-opacity': '1 !important',
      backgroundColor:
        'rgba(var(--plenary-bg-dialog-rgb), var(--tw-bg-opacity)) !important',
    },
    '.ring-bg-default': {
      '--tw-ring-opacity': '1 !important',
      '--tw-ring-color':
        'rgba(var(--plenary-bg-default-rgb), var(--tw-ring-opacity)) !important',
    },
    '.ring-bg-card': {
      '--tw-ring-opacity': '1 !important',
      '--tw-ring-color':
        'rgba(var(--plenary-bg-card-rgb), var(--tw-ring-opacity)) !important',
    },
  });

  addComponents({
    '.bg-hover': {
      backgroundColor: 'var(--plenary-bg-hover) !important',
    },
  });
});
