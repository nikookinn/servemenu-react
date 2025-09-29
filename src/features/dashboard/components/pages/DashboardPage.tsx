import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  useTheme,
  IconButton,
  Tooltip,
  Popover,
} from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {
  TrendingUp,
  AttachMoney,
  People,
  Feedback,
  QrCode,
  ShoppingCart,
  ContentCopy,
  Visibility,
  DateRange,
  Restaurant,
  LocalDining,
  Fastfood,
  LocalPizza,
  RamenDining,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon }) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return theme.palette.success.main;
      case 'negative': return theme.palette.error.main;
      default: return theme.palette.text.secondary;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: mode === 'dark'
            ? '0 16px 48px rgba(0, 0, 0, 0.4)'
            : '0 16px 48px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: mode === 'dark'
                ? 'rgba(99, 102, 241, 0.15)'
                : 'rgba(79, 70, 229, 0.1)',
              border: `1px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.2)'}`,
              color: theme.palette.primary.main,
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: getChangeColor(),
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {changeType === 'positive' && <TrendingUp sx={{ fontSize: 16 }} />}
            {changeType === 'negative' && <TrendingUp sx={{ fontSize: 16, transform: 'rotate(180deg)' }} />}
            {change}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            color: theme.palette.text.primary,
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.875rem',
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [selectedStore, setSelectedStore] = useState('all');
  const [timePeriod, setTimePeriod] = useState('today');
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const formatDateRange = () => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    if (start && end && start.getTime() !== end.getTime()) {
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return 'Select Date Range';
  };

  const metrics = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <ShoppingCart />,
    },
    {
      title: 'Revenue',
      value: '$24,580',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <AttachMoney />,
    },
    {
      title: 'Customers',
      value: '892',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: <People />,
    },
    {
      title: 'Feedback',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive' as const,
      icon: <Feedback />,
    },
  ];

  // Chart data
  const revenueData = [
    { name: 'Jan', revenue: 18500, orders: 245 },
    { name: 'Feb', revenue: 22300, orders: 298 },
    { name: 'Mar', revenue: 19800, orders: 267 },
    { name: 'Apr', revenue: 25600, orders: 342 },
    { name: 'May', revenue: 28900, orders: 389 },
    { name: 'Jun', revenue: 24580, orders: 331 },
    { name: 'Jul', revenue: 31200, orders: 421 },
  ];

  const topFoods = [
    { name: 'Beef Street Tacos', orders: 156, revenue: '$1,872', icon: <LocalDining /> },
    { name: 'Chicken Burrito', orders: 134, revenue: '$2,010', icon: <Fastfood /> },
    { name: 'Loaded Nachos', orders: 98, revenue: '$1,666', icon: <Restaurant /> },
    { name: 'Al Pastor Tacos', orders: 87, revenue: '$1,218', icon: <LocalPizza /> },
    { name: 'Beef Quesadilla', orders: 76, revenue: '$1,140', icon: <RamenDining /> },
  ];

  return (
    <Box sx={{ pb: 3 }}>
      {/* Welcome Section with Action Buttons */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'center', md: 'flex-start' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2.5, md: 2 },
        textAlign: { xs: 'center', md: 'left' },
      }}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2rem' },
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome, John! 👋
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            Here's what's happening with your restaurant today.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 1.5 },
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-start' },
          width: { xs: '100%', md: 'auto' },
        }}>
          {/* QR Code Button - Now visible on mobile */}
          <Tooltip title="Restaurant QR Code">
            <IconButton
              onClick={() => console.log('Show QR Code')}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
                border: `1px solid ${theme.palette.divider}`,
                size: { xs: 'small', md: 'medium' },
                p: { xs: 1, md: 1.5 },
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.2)' 
                    : 'rgba(79, 70, 229, 0.2)',
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <QrCode sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </IconButton>
          </Tooltip>

          {/* Copy URL Button - Now visible on mobile */}
          <Tooltip title="Copy Restaurant URL">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText('https://servemenu.com/restaurant/demo');
                console.log('URL Copied!');
              }}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
                border: `1px solid ${theme.palette.divider}`,
                size: { xs: 'small', md: 'medium' },
                p: { xs: 1, md: 1.5 },
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.2)' 
                    : 'rgba(79, 70, 229, 0.2)',
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ContentCopy sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </IconButton>
          </Tooltip>

          {/* Open Customer App Button */}
          <Tooltip title="Open Customer App">
            <Button
              startIcon={<Visibility sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />}
              onClick={() => console.log('Open Customer App')}
              variant="contained"
              size="small"
              sx={{
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                borderRadius: 1,
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                minWidth: { xs: 'auto', sm: '140px' },
                flexShrink: 0,
                boxShadow: mode === 'dark'
                  ? '0 4px 20px rgba(99, 102, 241, 0.3)'
                  : '0 4px 20px rgba(79, 70, 229, 0.3)',
                '&:hover': {
                  background: mode === 'dark'
                    ? 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)'
                    : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                  boxShadow: mode === 'dark'
                    ? '0 6px 24px rgba(99, 102, 241, 0.4)'
                    : '0 6px 24px rgba(79, 70, 229, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Open Customer App
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                Preview
              </Box>
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: { xs: 'center', md: 'space-between' }, 
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 2 }, 
        mb: 4, 
        flexWrap: 'wrap' 
      }}>
        {/* Left Side - Store and Period Filters */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1.5, md: 2 }, 
          alignItems: 'center', 
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-start' },
          width: { xs: '100%', md: 'auto' },
        }}>
          <FormControl size="small" sx={{ minWidth: { xs: 120, md: 150 } }}>
            <InputLabel>Store</InputLabel>
            <Select
              value={selectedStore}
              label="Store"
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <MenuItem value="all">All Stores</MenuItem>
              <MenuItem value="downtown">Downtown Branch</MenuItem>
              <MenuItem value="mall">Mall Branch</MenuItem>
              <MenuItem value="airport">Airport Branch</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 } }}>
            {['Today', 'Week', 'Month'].map((period) => (
              <Button
                key={period}
                variant={timePeriod === period.toLowerCase() ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setTimePeriod(period.toLowerCase())}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  px: { xs: 1.5, md: 2 },
                }}
              >
                {period}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Right Side - Calendar Date Range Picker */}
        <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Button
            onClick={(e) => setCalendarAnchor(e.currentTarget)}
            startIcon={<DateRange />}
            fullWidth
            sx={{
              px: { xs: 2, md: 3 },
              py: { xs: 1.2, md: 1.5 },
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              background: mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
              color: theme.palette.text.primary,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.8rem', md: '0.875rem' },
              minWidth: { xs: 'auto', md: 200 },
              width: { xs: '100%', md: 'auto' },
              '&:hover': {
                borderColor: theme.palette.primary.main,
                background: mode === 'dark' 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
                transform: 'translateY(-1px)',
                boxShadow: mode === 'dark'
                  ? '0 8px 25px rgba(99, 102, 241, 0.2)'
                  : '0 8px 25px rgba(79, 70, 229, 0.2)',
              },
              transition: 'all 0.3s ease',
              '& .MuiButton-startIcon': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {formatDateRange()}
          </Button>

          <Popover
            open={Boolean(calendarAnchor)}
            anchorEl={calendarAnchor}
            onClose={() => setCalendarAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 3,
                background: mode === 'dark' 
                  ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: mode === 'dark'
                  ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                  : '0 20px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
                '& .rdrCalendarWrapper': {
                  background: 'transparent',
                  color: theme.palette.text.primary,
                },
                '& .rdrMonth': {
                  background: 'transparent',
                },
                '& .rdrWeekDays': {
                  background: 'transparent',
                },
                '& .rdrWeekDay': {
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  fontSize: '12px',
                },
                '& .rdrDay': {
                  background: 'transparent',
                  color: theme.palette.text.primary,
                },
                '& .rdrDayNumber': {
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  fontSize: '14px',
                },
                '& .rdrDayNumber span': {
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                },
                '& .rdrDayToday .rdrDayNumber span': {
                  background: theme.palette.primary.main,
                  color: 'white',
                },
                '& .rdrDayInRange': {
                  background: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.2)' 
                    : 'rgba(79, 70, 229, 0.2)',
                  color: theme.palette.text.primary,
                },
                '& .rdrStartEdge, & .rdrEndEdge': {
                  background: `${theme.palette.primary.main} !important`,
                  color: 'white !important',
                },
                '& .rdrInRange': {
                  background: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.15)' 
                    : 'rgba(79, 70, 229, 0.15)',
                  color: theme.palette.text.primary,
                },
                '& .rdrMonthAndYearWrapper': {
                  background: 'transparent',
                  color: theme.palette.text.primary,
                  position: 'relative',
                  zIndex: 10,
                },
                '& .rdrMonthAndYearPickers select': {
                  background: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  maxHeight: '120px',
                  overflowY: 'auto',
                  // Custom scrollbar for dropdown
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: mode === 'dark' 
                      ? 'rgba(99, 102, 241, 0.3)' 
                      : 'rgba(79, 70, 229, 0.3)',
                    borderRadius: '3px',
                    '&:hover': {
                      background: mode === 'dark' 
                        ? 'rgba(99, 102, 241, 0.5)' 
                        : 'rgba(79, 70, 229, 0.5)',
                    },
                  },
                  // Firefox scrollbar
                  scrollbarWidth: 'thin',
                  scrollbarColor: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.3) transparent' 
                    : 'rgba(79, 70, 229, 0.3) transparent',
                },
                '& .rdrMonthAndYearPickers select option': {
                  background: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                  color: theme.palette.text.primary,
                  padding: '4px 8px',
                  fontSize: '14px',
                },
                '& .rdrNextPrevButton': {
                  background: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.1)' 
                    : 'rgba(79, 70, 229, 0.1)',
                  '&:hover': {
                    background: mode === 'dark' 
                      ? 'rgba(99, 102, 241, 0.2)' 
                      : 'rgba(79, 70, 229, 0.2)',
                  },
                },
                // Hide preset ranges section
                '& .rdrDefinedRangesWrapper': {
                  display: 'none',
                },
                '& .rdrStaticRanges': {
                  display: 'none',
                },
                '& .rdrInputRanges': {
                  display: 'none',
                },
                // Improve disabled dates readability
                '& .rdrDayDisabled': {
                  background: 'transparent',
                  color: theme.palette.text.disabled,
                },
                '& .rdrDayDisabled .rdrDayNumber span': {
                  color: theme.palette.text.disabled,
                },
                // Improve hover states
                '& .rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled):hover .rdrDayNumber span': {
                  background: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.1)' 
                    : 'rgba(79, 70, 229, 0.1)',
                  color: theme.palette.text.primary,
                  borderRadius: '50%',
                },
                // Improve month/year text
                '& .rdrMonthName': {
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                },
                '& .rdrYearPicker select, & .rdrMonthPicker select': {
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                },
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>
                Select Date Range
              </Typography>
              
              {/* Date Display */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 2, 
                p: 2,
                borderRadius: 2,
                background: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
                border: `1px solid ${theme.palette.divider}`,
              }}>
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="caption" sx={{ 
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '0.5px'
                  }}>
                    Start Date
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mt: 0.5
                  }}>
                    {dateRange[0].startDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  px: 2,
                  color: theme.palette.text.secondary 
                }}>
                  →
                </Box>
                
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="caption" sx={{ 
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '0.5px'
                  }}>
                    End Date
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mt: 0.5
                  }}>
                    {dateRange[0].endDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Box>
              
              <DateRangePicker
                ranges={dateRange}
                onChange={(ranges: any) => setDateRange([ranges.selection])}
                moveRangeOnFirstSelection={false}
                months={1}
                direction="horizontal"
                rangeColors={[theme.palette.primary.main]}
                showDateDisplay={false}
                showPreview={false}
              />

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  onClick={() => setCalendarAnchor(null)}
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setCalendarAnchor(null);
                    // Date range is already updated in state
                  }}
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>
      </Box>

      {/* Metrics Cards */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          lg: 'repeat(4, 1fr)' 
        },
        gap: { xs: 2, md: 3 }, 
        mb: 4 
      }}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </Box>

      {/* Charts and Analytics */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: { xs: 2, md: 3 }, 
        mb: 4 
      }}>
        <Card
          sx={{
            background: mode === 'dark'
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}>
              Revenue Analytics
            </Typography>
            <Box sx={{ height: { xs: 250, md: 300 }, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
                    />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ 
                        fill: theme.palette.text.secondary, 
                        fontSize: 12,
                        fontWeight: 500 
                      }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ 
                        fill: theme.palette.text.secondary, 
                        fontSize: 12,
                        fontWeight: 500 
                      }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px',
                        boxShadow: mode === 'dark' 
                          ? '0 8px 32px rgba(0,0,0,0.4)' 
                          : '0 8px 32px rgba(0,0,0,0.1)',
                        color: theme.palette.text.primary,
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'revenue' ? `$${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Orders'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

        <Card
          sx={{
            background: mode === 'dark'
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${theme.palette.divider}`,
            height: '100%',
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2, md: 3 } }}>
              <QrCode sx={{ color: theme.palette.primary.main }} />
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}>
                QR Scan Count
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              mb: 1,
              fontSize: { xs: '2rem', md: '3rem' }
            }}>
              2,847
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ 
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '0.8rem', md: '0.875rem' }
            }}>
              Total scans today
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  Menu Views
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  85%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={85}
                sx={{
                  height: { xs: 6, md: 8 },
                  borderRadius: 4,
                  backgroundColor: mode === 'dark' ? '#27272a' : '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  },
                }}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  Orders Placed
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  62%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={62}
                sx={{
                  height: { xs: 6, md: 8 },
                  borderRadius: 4,
                  backgroundColor: mode === 'dark' ? '#27272a' : '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Most Sold Foods */}
      <Card
        sx={{
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'dark'
              ? '0 12px 32px rgba(0, 0, 0, 0.3)'
              : '0 12px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                p: { xs: 1, md: 1.5 },
                borderRadius: 2,
                background: mode === 'dark'
                  ? 'rgba(99, 102, 241, 0.15)'
                  : 'rgba(79, 70, 229, 0.1)',
                border: `1px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.2)'}`,
                color: theme.palette.primary.main,
              }}
            >
              <Restaurant sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}>
              Most Sold Foods
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>
            {topFoods.map((food, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 2,
                  background: mode === 'dark'
                    ? index === 0 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)' // En koyu - 1. sıra
                      : index === 1 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)' // Orta - 2. sıra
                      : index === 2 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.04) 100%)' // Açık - 3. sıra
                      : 'rgba(255, 255, 255, 0.02)' // Normal - diğerleri
                    : index === 0 ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.06) 100%)' // En koyu - 1. sıra
                      : index === 1 ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(124, 58, 237, 0.04) 100%)' // Orta - 2. sıra
                      : index === 2 ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.04) 0%, rgba(124, 58, 237, 0.03) 100%)' // Açık - 3. sıra
                      : 'rgba(0, 0, 0, 0.02)', // Normal - diğerleri
                  border: `1px solid ${index < 3 
                    ? (mode === 'dark' 
                      ? `rgba(99, 102, 241, ${0.2 + (2 - index) * 0.05})` 
                      : `rgba(79, 70, 229, ${0.15 + (2 - index) * 0.05})`)
                    : theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: index < 3 ? (mode === 'dark'
                    ? `0 2px 12px rgba(99, 102, 241, ${0.1 + (2 - index) * 0.05})`
                    : `0 2px 12px rgba(79, 70, 229, ${0.08 + (2 - index) * 0.03})`)
                    : 'none',
                  '&:hover': {
                    background: mode === 'dark'
                      ? index === 0 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.12) 100%)' // En koyu hover - 1. sıra
                        : index === 1 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(139, 92, 246, 0.10) 100%)' // Orta hover - 2. sıra
                        : index === 2 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.10) 0%, rgba(139, 92, 246, 0.08) 100%)' // Açık hover - 3. sıra
                        : 'rgba(99, 102, 241, 0.08)' // Normal hover - diğerleri
                      : index === 0 ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%)' // En koyu hover - 1. sıra
                        : index === 1 ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.10) 0%, rgba(124, 58, 237, 0.06) 100%)' // Orta hover - 2. sıra
                        : index === 2 ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%)' // Açık hover - 3. sıra
                        : 'rgba(79, 70, 229, 0.05)', // Normal hover - diğerleri
                    transform: 'translateX(4px)',
                    borderColor: index < 3 
                      ? (mode === 'dark' 
                        ? `rgba(99, 102, 241, ${0.3 + (2 - index) * 0.1})` 
                        : `rgba(79, 70, 229, ${0.25 + (2 - index) * 0.1})`)
                      : theme.palette.primary.main,
                    boxShadow: mode === 'dark'
                      ? index < 3 
                        ? `0 6px 20px rgba(99, 102, 241, ${0.2 + (2 - index) * 0.1})`
                        : '0 4px 16px rgba(99, 102, 241, 0.2)'
                      : index < 3 
                        ? `0 6px 20px rgba(79, 70, 229, ${0.15 + (2 - index) * 0.05})`
                        : '0 4px 16px rgba(79, 70, 229, 0.15)',
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    p: { xs: 1, md: 1.5 },
                    borderRadius: 2,
                    background: mode === 'dark'
                      ? index === 0 ? 'rgba(99, 102, 241, 0.25)' // En koyu - 1. sıra
                        : index === 1 ? 'rgba(99, 102, 241, 0.20)' // Orta - 2. sıra  
                        : index === 2 ? 'rgba(99, 102, 241, 0.15)' // Açık - 3. sıra
                        : 'rgba(99, 102, 241, 0.10)' // En açık - diğerleri
                      : index === 0 ? 'rgba(79, 70, 229, 0.18)' // En koyu - 1. sıra
                        : index === 1 ? 'rgba(79, 70, 229, 0.14)' // Orta - 2. sıra
                        : index === 2 ? 'rgba(79, 70, 229, 0.10)' // Açık - 3. sıra
                        : 'rgba(79, 70, 229, 0.06)', // En açık - diğerleri
                    border: `1px solid ${mode === 'dark' 
                      ? index === 0 ? 'rgba(99, 102, 241, 0.4)' // En koyu border - 1. sıra
                        : index === 1 ? 'rgba(99, 102, 241, 0.35)' // Orta border - 2. sıra
                        : index === 2 ? 'rgba(99, 102, 241, 0.3)' // Açık border - 3. sıra
                        : 'rgba(99, 102, 241, 0.25)' // En açık border - diğerleri
                      : index === 0 ? 'rgba(79, 70, 229, 0.3)' // En koyu border - 1. sıra
                        : index === 1 ? 'rgba(79, 70, 229, 0.25)' // Orta border - 2. sıra
                        : index === 2 ? 'rgba(79, 70, 229, 0.2)' // Açık border - 3. sıra
                        : 'rgba(79, 70, 229, 0.15)'}`, // En açık border - diğerleri
                    mr: { xs: 2, md: 3 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'fit-content',
                    boxShadow: index < 3 ? (mode === 'dark'
                      ? `0 2px 8px rgba(99, 102, 241, ${0.15 + (2 - index) * 0.05})`
                      : `0 2px 8px rgba(79, 70, 229, ${0.1 + (2 - index) * 0.05})`)
                      : 'none',
                  }}
                >
                  {React.cloneElement(food.icon, {
                    sx: { 
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      color: index === 0 ? (mode === 'dark' ? '#a5b4fc' : '#4338ca') // En koyu renk - 1. sıra
                        : index === 1 ? (mode === 'dark' ? '#c4b5fd' : '#5b21b6') // Orta renk - 2. sıra
                        : index === 2 ? (mode === 'dark' ? '#ddd6fe' : '#7c3aed') // Açık renk - 3. sıra
                        : theme.palette.primary.main, // Normal renk - diğerleri
                    }
                  })}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    mb: 0.5,
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}>
                    {food.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    fontSize: { xs: '0.8rem', md: '0.875rem' }
                  }}>
                    <ShoppingCart sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />
                    {food.orders} orders
                  </Typography>
                </Box>

                {/* Revenue & Rank */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.success.main,
                    mb: 0.5,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}>
                    {food.revenue}
                  </Typography>
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    sx={{
                      background: mode === 'dark'
                        ? index === 0 ? 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)' // En koyu - 1. sıra
                          : index === 1 ? 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)' // Orta - 2. sıra
                          : index === 2 ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' // Açık - 3. sıra
                          : 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' // En açık - diğerleri
                        : index === 0 ? 'linear-gradient(135deg, #312e81 0%, #581c87 100%)' // En koyu - 1. sıra
                          : index === 1 ? 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)' // Orta - 2. sıra
                          : index === 2 ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' // Açık - 3. sıra
                          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', // En açık - diğerleri
                      color: 'white',
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      boxShadow: index < 3 ? (mode === 'dark'
                        ? `0 2px 6px rgba(99, 102, 241, ${0.3 + (2 - index) * 0.1})`
                        : `0 2px 6px rgba(79, 70, 229, ${0.2 + (2 - index) * 0.1})`)
                        : 'none',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
      

    </Box>
  );
};

export default DashboardPage;
