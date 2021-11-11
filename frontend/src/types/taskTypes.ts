export type Task = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
};

export type Filter = 'all' | 'checked' | 'unchecked' | 'removed';
