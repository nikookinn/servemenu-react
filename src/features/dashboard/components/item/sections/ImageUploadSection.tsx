import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Crop,
  Check,
  Close,
} from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import { useDashboardTheme } from '../../../context/ThemeContext';

// Helper function to create image from crop area
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

// Helper function to get cropped image
const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        resolve(file);
      }
    }, 'image/jpeg', 0.9);
  });
};

interface ImageUploadSectionProps {
  uploadedImages: File[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  existingImages?: string[]; // Array of existing image URLs for edit mode
  onRemoveExistingImage?: (index: number) => void; // Remove existing image by index
  maxImages?: number; // Maximum number of images allowed
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  uploadedImages,
  onImageUpload,
  onRemoveImage,
  existingImages,
  onRemoveExistingImage,
  maxImages = 3,
}) => {
  const { mode } = useDashboardTheme();
  
  // Crop dialog state
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  // Multiple files queue for cropping
  const [filesToProcess, setFilesToProcess] = useState<File[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  // Handle crop complete
  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Handle file selection for cropping
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Check if adding these files would exceed the limit
      const remainingSlots = maxImages - uploadedImages.length - (existingImages?.length || 0);
      const filesToAdd = files.slice(0, remainingSlots);
      
      if (filesToAdd.length > 0) {
        // Set up files for processing
        setFilesToProcess(filesToAdd);
        setCurrentFileIndex(0);
        
        // Start with the first file
        const reader = new FileReader();
        reader.onload = () => {
          setImageToCrop(reader.result as string);
          setCropDialogOpen(true);
        };
        reader.readAsDataURL(filesToAdd[0]);
      }
    }
    
    // Reset input value to allow selecting the same files again
    event.target.value = '';
  };

  // Handle crop and save
  const handleCropSave = async () => {
    if (imageToCrop && croppedAreaPixels) {
      try {
        const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels);
        
        // Create a fake event to pass the cropped file
        const fakeEvent = {
          target: {
            files: [croppedFile]
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        
        onImageUpload(fakeEvent);
        
        // Check if there are more files to process
        const nextIndex = currentFileIndex + 1;
        if (nextIndex < filesToProcess.length) {
          // Process next file
          setCurrentFileIndex(nextIndex);
          const nextFile = filesToProcess[nextIndex];
          
          const reader = new FileReader();
          reader.onload = () => {
            setImageToCrop(reader.result as string);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            // Keep dialog open for next image
          };
          reader.readAsDataURL(nextFile);
        } else {
          // All files processed, close dialog and reset
          setCropDialogOpen(false);
          setImageToCrop(null);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setFilesToProcess([]);
          setCurrentFileIndex(0);
        }
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  // Handle crop cancel
  const handleCropCancel = () => {
    setCropDialogOpen(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    // Reset queue
    setFilesToProcess([]);
    setCurrentFileIndex(0);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          mb: 2,
        }}
      >
        Images
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Left Side - Image Previews */}
        {(uploadedImages.length > 0 || existingImages?.length) && (
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flexShrink: 0,
            flexWrap: 'wrap'
          }}>
            {/* Show existing images first */}
            {existingImages?.map((imageUrl, index) => (
              <Box
                key={`existing-${index}`}
                sx={{
                  position: 'relative',
                  width: { xs: 100, md: 120 },
                  height: { xs: 100, md: 120 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: mode === 'dark'
                    ? '2px solid rgba(255, 255, 255, 0.1)'
                    : '2px solid rgba(0, 0, 0, 0.1)',
                  flexShrink: 0,
                  '&:hover': {
                    borderColor: '#6366f1',
                  },
                }}
              >
                <Box
                  component="img"
                  src={imageUrl}
                  alt={`Existing image ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Delete button for existing images */}
                <IconButton
                  size="small"
                  onClick={() => onRemoveExistingImage?.(index)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    width: 24,
                    height: 24,
                    '&:hover': {
                      background: 'rgba(239, 68, 68, 1)',
                    },
                  }}
                >
                  <Delete sx={{ fontSize: '0.875rem' }} />
                </IconButton>
                
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    left: 4,
                    right: 4,
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '2px 4px',
                    borderRadius: 1,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                  }}
                >
                  {index === 0 ? 'Primary' : `Image ${index + 1}`}
                </Typography>
              </Box>
            ))}
            {uploadedImages.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  width: { xs: 100, md: 120 },
                  height: { xs: 100, md: 120 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: mode === 'dark'
                    ? '2px solid rgba(255, 255, 255, 0.1)'
                    : '2px solid rgba(0, 0, 0, 0.1)',
                  flexShrink: 0,
                  '&:hover': {
                    borderColor: '#6366f1',
                  },
                }}
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  onClick={() => onRemoveImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    width: 24,
                    height: 24,
                    '&:hover': {
                      background: 'rgba(220, 38, 38, 0.9)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Delete sx={{ fontSize: '0.875rem' }} />
                </IconButton>
                
                {/* Image Index Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    left: 4,
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    borderRadius: 1,
                    px: 0.5,
                    py: 0.25,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {index + 1}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Right Side - Upload Area (Dynamic Width) */}
        {(uploadedImages.length + (existingImages?.length || 0)) < maxImages && (
          <Box
            component="label"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              border: `2px dashed ${mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
              borderRadius: 2,
              cursor: 'pointer',
              background: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: '#6366f1',
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <CloudUpload
              sx={{
                fontSize: uploadedImages.length === 0 ? '2.5rem' : '1.5rem',
                color: mode === 'dark' ? '#64748b' : '#94a3b8',
                mb: uploadedImages.length === 0 ? 1 : 0.5,
              }}
            />
            <Typography
              variant={uploadedImages.length === 0 ? 'body1' : 'caption'}
              sx={{
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                textAlign: 'center',
                mb: uploadedImages.length === 0 ? 0.5 : 0,
              }}
            >
              {(uploadedImages.length + (existingImages?.length || 0)) === 0 
                ? 'Click to upload and crop images' 
                : `Add Image (${maxImages - uploadedImages.length - (existingImages?.length || 0)} left)`
              }
            </Typography>
            {uploadedImages.length === 0 && (
              <Typography
                variant="caption"
                sx={{
                  color: mode === 'dark' ? '#94a3b8' : '#64748b',
                  textAlign: 'center',
                }}
              >
                PNG, JPG up to 10MB • Max {maxImages} images
              </Typography>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </Box>
        )}
      </Box>

      {/* Crop Dialog */}
      <Dialog
        open={cropDialogOpen}
        onClose={handleCropCancel}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: mode === 'dark'
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ 
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Crop />
          Crop Image
          {filesToProcess.length > 1 && (
            <Typography variant="caption" sx={{ ml: 'auto', color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
              {currentFileIndex + 1} of {filesToProcess.length}
            </Typography>
          )}
        </DialogTitle>
        
        <DialogContent sx={{ p: 0, height: 400, position: 'relative' }}>
          {imageToCrop && (
            <Cropper
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  background: mode === 'dark' ? '#0a0a0a' : '#f8fafc',
                },
              }}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ 
          p: 2, 
          borderTop: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          gap: 1
        }}>
          <Box sx={{ flex: 1, px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, color: mode === 'dark' ? '#ffffff' : '#1a202c' }}>
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(_, value) => setZoom(value as number)}
              sx={{
                color: '#6366f1',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#6366f1',
                },
              }}
            />
          </Box>
          
          <Button
            onClick={handleCropCancel}
            sx={{
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              '&:hover': {
                background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleCropSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)',
              },
            }}
            startIcon={<Check />}
          >
            Apply Crop
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUploadSection;
