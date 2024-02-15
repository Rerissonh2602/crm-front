import {
  IsActiveMatchOptions,
  Params,
  QueryParamsHandling,
} from '@angular/router';

export type PlenaryNavigationItem = {
  id?: string;
  title?: string;
  subtitle?: string;
  type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
  hidden?: (item: PlenaryNavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  fragment?: string;
  preserveFragment?: boolean;
  queryParams?: Params | undefined;
  queryParamsHandling?: QueryParamsHandling | undefined;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: PlenaryNavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: PlenaryNavigationItem[];
  meta?: any;
};

export type PlenaryVerticalNavigationAppearance =
  | 'default'
  | 'compact'
  | 'dense'
  | 'thin';

export type PlenaryVerticalNavigationMode = 'over' | 'side';

export type PlenaryVerticalNavigationPosition = 'left' | 'right';
