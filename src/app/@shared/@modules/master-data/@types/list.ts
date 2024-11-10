import { Field } from '../../../components/form/@types/field';

export interface TableColumn<T> {
  name: keyof T;
  title: string;
  render?:
    | 'html'
    | 'date'
    | 'tag'
    | 'avatar'
    | 'country'
    | 'array'
    | 'emailStatus'
    | 'questAvatar'
    | 'questionaireBundle'
    | undefined;
  sort?: boolean;
  altName?: keyof T;
  translationPath?: string;
  filterField?: Field;
  filterQuery?: (q: any) => {} | [];
}

export interface TagInfo {
  color: string;
  title: string;
}

export interface SortField<T> {
  field: keyof T;
  direction: 'ASC' | 'DESC';
}

export interface Action<T = string> {
  key: T;
  title: string;
}

export interface ActionArgs<T, K = string> {
  action: Action<K>;
  context: T;
}

export const PAGE_SIZES = [10, 15, 25, 50] as const;
export type PageSizeOptions = typeof PAGE_SIZES[number];
export const DEFAULT_PAGE_SIZE: PageSizeOptions = 15;
