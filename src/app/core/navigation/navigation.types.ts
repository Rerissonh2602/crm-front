import { PlenaryNavigationItem } from '@plenary/components/navigation';

// TODO: Adicionar a nova interface no Navigation
export type Navigation = {
  compact: PlenaryNavigationItem[];
  default: PlenaryNavigationItem[];
  futuristic: PlenaryNavigationItem[];
  horizontal: PlenaryNavigationItem[];
};
