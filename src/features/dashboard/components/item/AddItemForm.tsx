import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { ArrowBack, } from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { ItemFormData, PriceOption, SelectedModifier, useItemManagement } from './useItemManagement';
import { Item, ModifierData } from '../../store/dashboardSlice';
import BasicInformationSection from './sections/BasicInformationSection';
import PriceTab from './sections/PriceTab';
import LabelsSection from './sections/LabelsSection';
import ImageUploadSection from './sections/ImageUploadSection';
import ItemSettingsSection from './sections/ItemSettingsSection';
import ModifierOptionsSection from './sections/ModifierOptionsSection';


// Form-specific PriceOption that allows string prices from inputs
interface FormPriceOption {
  id: string;
  name: string;
  price: string | number;
  unit?: string;
}

// Note: Using SelectedModifier from useItemManagement for consistency



interface AddItemFormProps {
  initialData?: Item | null;
  categoryName?: string;
  onBack: () => void;
  onSave: (itemData: ItemFormData) => void;
}

export interface AddItemFormRef {
  save: () => void;
}

const AddItemForm = forwardRef<AddItemFormRef, AddItemFormProps>(({
  initialData,
  categoryName,
  onBack,
  onSave,
}, ref) => {
  const { mode } = useDashboardTheme();
  
  // Use Redux-based item management hook
  const { modifiers, convertItemToFormData } = useItemManagement();
  
  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  
  // Form state - using proper ItemFormData structure
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    description: '',
    priceOptions: [{ id: '1', name: '', price: 0 }],
    labels: [],
    displayOptions: [],
    size: '',
    unit: 'piece',
    preparationTime: '',
    ingredientWarnings: [],
    taxCategory: 'standard',
    isSoldOut: false,
    isAvailable: true,
    isFeatured: false,
    recommendedItems: [],
    selectedModifiers: [],
    images: [],
  });
  
  // Form-specific state for handling string inputs
  const [priceOptions, setPriceOptions] = useState<FormPriceOption[]>([
    { id: '1', name: '', price: '' }
  ]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  
  // Filter active modifiers for selection
  const availableModifiers = modifiers; // All modifiers are available since we removed status field
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with existing data
  useEffect(() => {
    if (initialData) {
      // Use convertItemToFormData helper to properly convert Item to form data
      const convertedData = convertItemToFormData(initialData);
      setFormData(convertedData);
      
      // Initialize price options from existing data
      if (initialData.priceOptions && initialData.priceOptions.length > 0) {
        setPriceOptions(initialData.priceOptions.map(option => ({
          id: option.id,
          name: option.name,
          price: option.price.toString(),
          unit: option.unit
        })));
      } else {
        setPriceOptions([{
          id: '1',
          name: '',
          price: '0'
        }]);
      }
      
      // Set existing images URLs for display
      if (initialData.images && initialData.images.length > 0) {
        // Filter out empty strings
        const validImages = initialData.images.filter(img => img && img.trim() !== '');
        setExistingImageUrls(validImages);
      } else {
        setExistingImageUrls([]);
      }
      
      // Clear uploaded images for edit mode (will show existing ones)
      setUploadedImages([]);
      
      // Clear any existing errors
      setErrors({});
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        description: '',
        priceOptions: [{ id: '1', name: '', price: 0 }],
        labels: [],
        displayOptions: [],
        size: '',
        unit: 'piece',
        preparationTime: '',
        ingredientWarnings: [],
        taxCategory: 'standard',
        isSoldOut: false,
        isAvailable: true,
        isFeatured: false,
        recommendedItems: [],
        selectedModifiers: [],
        images: [],
      });
      
      setPriceOptions([{ id: '1', name: '', price: '' }]);
      setUploadedImages([]);
      setExistingImageUrls([]);
      setErrors({});
    }
  }, [initialData, convertItemToFormData]);

  // Expose save method to parent
  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  const handleInputChange = (field: string | number | symbol, value: string | number | boolean | string[] | File[]) => {
    setFormData(prev => ({ ...prev, [field as keyof ItemFormData]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof ItemFormData]) {
      setErrors(prev => ({ ...prev, [field as keyof ItemFormData]: '' }));
    }
    
    // Clear price-related errors when price options are updated
    if (field === 'priceOptions') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.priceOptions;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic Information validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Item name is required (minimum 2 characters)';
    }
    
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Description is required (minimum 10 characters)';
    }
    
    // Price validation - check both main price and price options
    const isSimpleMode = priceOptions.length === 1 && !priceOptions[0].name.trim();
    
    if (isSimpleMode) {
      // Simple mode: validate main price (first price option)
      const mainPriceOption = priceOptions[0];
      if (!mainPriceOption.price || mainPriceOption.price === '') {
        newErrors.price = 'Price is required';
      } else if (Number(mainPriceOption.price) <= 0) {
        newErrors.price = 'Price must be greater than 0';
      }
    } else {
      // Advanced mode: validate price options
      const completePriceOptions = priceOptions.filter(option => 
        option.name.trim() && option.price && Number(option.price) > 0
      );
      if (completePriceOptions.length === 0) {
        newErrors.priceOptions = 'At least one complete price option is required';
      }
      
      // Check for incomplete options
      priceOptions.forEach((option, index) => {
        if (option.name.trim() && (!option.price || Number(option.price) <= 0)) {
          newErrors[`priceOption_${index}`] = 'Price is required for this option';
        }
        if (option.price && Number(option.price) > 0 && !option.name.trim()) {
          newErrors[`priceOptionName_${index}`] = 'Option name is required';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to check if a tab has errors
  const getTabErrors = (tabIndex: number) => {
    const errorKeys = Object.keys(errors);
    
    switch (tabIndex) {
      case 0: // Item Information
        return errorKeys.some(key => ['name', 'description'].includes(key));
      case 1: // Price
        return errorKeys.some(key => 
          key === 'price' || 
          key === 'priceOptions' || 
          key.startsWith('priceOption')
        );
      case 2: // Modifier Options
        return errorKeys.some(key => key.startsWith('modifier'));
      default:
        return false;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      // Convert form price options to proper format
      const convertedPriceOptions = priceOptions.map(option => ({
        id: option.id,
        name: option.name,
        price: typeof option.price === 'string' ? parseFloat(option.price) || 0 : option.price,
        unit: option.unit
      }));

      // Combine existing and new images
      const newImageUrls = uploadedImages.map(file => URL.createObjectURL(file));
      const allImages = [...existingImageUrls, ...newImageUrls];
      
      // Create final form data with all consolidated values
      const itemDataToSave: ItemFormData = {
        ...formData,
        priceOptions: convertedPriceOptions,
        images: allImages,
      };
      
      onSave(itemDataToSave);
    } else {
      // If validation fails, switch to the first tab with errors
      for (let i = 0; i < 3; i++) {
        if (getTabErrors(i)) {
          setActiveTab(i);
          break;
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleSave();
    }
  };


  // Price options management
  const addPriceOption = () => {
    // Check if we're in simple mode (transitioning to advanced mode)
    const isCurrentlySimpleMode = priceOptions.length === 1 && !priceOptions[0].name.trim();
    
    if (isCurrentlySimpleMode) {
      // First time adding options - just update existing option to have a name (convert to advanced mode)
      setPriceOptions(prev => [
        { ...prev[0], name: 'Regular' } // Update existing option with "Regular" name
      ]);
    } else {
      // Already in advanced mode - add new option
      const newOption: FormPriceOption = {
        id: Date.now().toString(),
        name: '',
        price: ''
      };
      setPriceOptions(prev => [...prev, newOption]);
    }
  };

  const removePriceOption = (id: string) => {
    const updatedOptions = priceOptions.filter(option => option.id !== id);
    
    if (updatedOptions.length === 0) {
      // If no options left, create a new simple mode option
      setPriceOptions([{
        id: Date.now().toString(),
        name: '', // Empty name = simple mode
        price: formData.priceOptions[0]?.price || ''
      }]);
    } else if (updatedOptions.length === 1 && updatedOptions[0].name.trim()) {
      // If only one option left and it has a name, convert back to simple mode
      setPriceOptions([{
        ...updatedOptions[0],
        name: '' // Remove name to convert to simple mode
      }]);
    } else {
      // Normal removal
      setPriceOptions(updatedOptions);
    }
  };

  const updatePriceOption = (id: string, field: keyof PriceOption, value: string | number) => {
    setPriceOptions(prev => prev.map(option => 
      option.id === id ? { ...option, [field]: value } : option
    ));
    
    // Clear price-related errors when price options are updated
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.priceOptions;
      // Clear specific price option errors
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('priceOption')) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  // Modifier management
  const handleAddModifier = (modifier: ModifierData) => {
    const selectedModifier: SelectedModifier = {
      id: Date.now().toString(),
      name: modifier.name,
      type: modifier.type || 'optional',
      selectedOptions: []
    };
    setFormData((prev: ItemFormData) => ({
      ...prev,
      selectedModifiers: [...prev.selectedModifiers, selectedModifier]
    }));
  };

  const handleRemoveModifier = (id: string) => {
    setFormData((prev: ItemFormData) => ({
      ...prev,
      selectedModifiers: prev.selectedModifiers.filter((modifier: SelectedModifier) => modifier.id !== id)
    }));
  };


  // Image upload handling
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const remainingSlots = 3 - uploadedImages.length - existingImageUrls.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);
    setUploadedImages(prev => [...prev, ...filesToAdd]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        backdropFilter: 'blur(10px)',
        border: mode === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.12)' 
          : '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderBottom: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 },
        }}
      >
        {/* Left: Back button and breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <IconButton
            onClick={onBack}
            sx={{
              background: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              '&:hover': {
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                mb: 0.5,
              }}
            >
              {initialData ? 'Edit Item' : 'Add New Item'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: mode === 'dark' ? '#94a3b8' : '#64748b',
              }}
            >
              Categories / {categoryName} / {initialData ? 'Edit Item' : 'Add New Item'}
            </Typography>
          </Box>
        </Box>

        {/* Right: Save button */}
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 600,
            textTransform: 'none',
            px: 3,
            py: 1,
            borderRadius: 1.5,
            width: { xs: '100%', md: 'auto' },
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {initialData ? 'Update Item' : 'Save Item'}
        </Button>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            px: { xs: 2, md: 3 },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              color: mode === 'dark' ? '#94a3b8' : '#64748b',
              '&.Mui-selected': {
                color: '#6366f1',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#6366f1',
            },
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Item Information
                {getTabErrors(0) && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                    }}
                  />
                )}
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Price
                {getTabErrors(1) && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                    }}
                  />
                )}
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Modifier Options
                {getTabErrors(2) && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                    }}
                  />
                )}
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, md: 3 },
        }}
      >
        {activeTab === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <BasicInformationSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />

            <LabelsSection
              labels={formData.labels}
              displayOptions={formData.displayOptions}
              onLabelsChange={(labels) => handleInputChange('labels', labels)}
              onDisplayOptionsChange={(options) => handleInputChange('displayOptions', options)}
            />

            <ItemSettingsSection
              formData={formData}
              isSoldOut={formData.isSoldOut}
              isFeatured={formData.isFeatured}
              onInputChange={handleInputChange}
              onSoldOutChange={(value) => handleInputChange('isSoldOut', value)}
              onFeaturedChange={(value) => handleInputChange('isFeatured', value)}
            />

            <ImageUploadSection
              uploadedImages={uploadedImages}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
              existingImages={existingImageUrls}
              onRemoveExistingImage={removeExistingImage}
              maxImages={3}
            />
          </Box>
        )}

        {activeTab === 1 && (
          <PriceTab
            formData={formData}
            priceOptions={priceOptions}
            errors={errors}
            onInputChange={handleInputChange}
            onAddPriceOption={addPriceOption}
            onRemovePriceOption={removePriceOption}
            onUpdatePriceOption={updatePriceOption}
          />
        )}

        {activeTab === 2 && (
          <ModifierOptionsSection
            selectedModifiers={formData.selectedModifiers}
            availableModifiers={availableModifiers}
            onAddModifier={handleAddModifier}
            onRemoveModifier={handleRemoveModifier}
          />
        )}
      </Box>
    </Box>
  );
});

AddItemForm.displayName = 'AddItemForm';

export default AddItemForm;
