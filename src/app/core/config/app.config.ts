import { Layout } from 'app/layout/layout.types';

export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = Record<string, string>;
export type Theme = 'theme-default' | string;
export type Themes = Array<{ id: string; name: string }>;

export type AppConfig = {
  layout: Layout;
  scheme: Scheme;
  screens: Screens;
  theme: Theme;
  themes: Themes;
};

export const appConfig: AppConfig = {
  layout: 'thin',
  scheme: 'auto',
  screens: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
  },
  theme: 'theme-brand',
  themes: [
    {
      id: 'theme-default',
      name: 'Default',
    },
    {
      id: 'theme-brand',
      name: 'Brand',
    },
    {
      id: 'theme-teal',
      name: 'Teal',
    },
    {
      id: 'theme-rose',
      name: 'Rose',
    },
    {
      id: 'theme-purple',
      name: 'Purple',
    },
    {
      id: 'theme-amber',
      name: 'Amber',
    },
  ],
};
