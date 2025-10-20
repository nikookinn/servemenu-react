// Export all category-related components
export { default as CategoryList } from './CategoryList';
export { default as AddCategoryForm } from './AddCategoryForm';

// Export hooks
export { useCategoryManagement } from './useCategoryManagement';

// Export types from dashboardSlice (single source of truth)
export type { Category, CategoryFormData } from '../../store/dashboardSlice';
