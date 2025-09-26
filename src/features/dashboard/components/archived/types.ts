export interface ArchivedItem {
  id: string;
  name: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  type: 'menu' | 'modifier';
  deletedAt: string;
}

export interface ArchivedItemsState {
  items: ArchivedItem[];
  loading: boolean;
  error: string | null;
}

export interface ArchivedItemsActions {
  addArchivedItem: (item: Omit<ArchivedItem, 'deletedAt'>) => void;
  restoreArchivedItem: (id: string) => ArchivedItem | null;
  removeArchivedItem: (id: string) => void;
  permanentlyDeleteItem: (id: string) => void;
  clearArchivedItems: () => void;
}
