export { default as ArchivedItemsList } from './ArchivedItemsList';
export { default as PermanentDeleteDialog } from './PermanentDeleteDialog';
export { useArchivedItems } from './useArchivedItems';
// All types now exported from dashboardSlice (single source of truth)
export type { ArchivedItem } from '../../store/dashboardSlice';
