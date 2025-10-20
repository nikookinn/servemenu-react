import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { 
  addArchivedItem as addArchivedItemAction, 
  restoreArchivedItem as restoreArchivedItemAction, 
  permanentlyDeleteArchivedItem 
} from '../../store/dashboardSlice';
import { ArchivedItem } from '../../store/dashboardSlice';

export const useArchivedItems = () => {
  const dispatch = useAppDispatch();
  
  // Get archived items from Redux store
  const items = useAppSelector(state => state.dashboard.archivedItems);

  const addArchivedItem = (item: Omit<ArchivedItem, 'deletedAt'>) => {
    const archivedItem: ArchivedItem = {
      ...item,
      deletedAt: new Date().toISOString(),
    };
    dispatch(addArchivedItemAction(archivedItem));
  };

  const restoreArchivedItem = (id: string) => {
    const itemToRestore = items.find((item: ArchivedItem) => item.id === id);
    if (itemToRestore) {
      dispatch(restoreArchivedItemAction(id));
      return itemToRestore;
    }
    return null;
  };

  const permanentlyDeleteItem = (id: string) => {
    dispatch(permanentlyDeleteArchivedItem(id));
  };

  return {
    items,
    addArchivedItem,
    restoreArchivedItem,
    permanentlyDeleteItem,
  };
};
