import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  People,
  Feedback,
  QrCode2,
  Restaurant,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
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

  const metrics = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <AttachMoney />,
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
  const chartData = [
    { name: 'Mon', orders: 65, revenue: 2400 },
    { name: 'Tue', orders: 59, revenue: 1398 },
    { name: 'Wed', orders: 80, revenue: 9800 },
    { name: 'Thu', orders: 81, revenue: 3908 },
    { name: 'Fri', orders: 56, revenue: 4800 },
    { name: 'Sat', orders: 95, revenue: 3800 },
    { name: 'Sun', orders: 78, revenue: 4300 },
  ];

  // QR Scan data
  const qrScanData = [
    { location: 'Table 1-5', scans: 45, total: 50 },
    { location: 'Table 6-10', scans: 38, total: 50 },
    { location: 'Table 11-15', scans: 42, total: 50 },
    { location: 'Outdoor Area', scans: 28, total: 30 },
  ];

  // Most sold items
  const topItems = [
    { name: 'Margherita Pizza', sold: 156, revenue: '$2,340', trend: 'up' },
    { name: 'Caesar Salad', sold: 134, revenue: '$1,876', trend: 'up' },
    { name: 'Grilled Salmon', sold: 98, revenue: '$2,450', trend: 'down' },
    { name: 'Pasta Carbonara', sold: 87, revenue: '$1,305', trend: 'up' },
    { name: 'Chicken Wings', sold: 76, revenue: '$912', trend: 'up' },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
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
          Welcome to Dashboard! 👋
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

      {/* Charts Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, 
        gap: { xs: 2, md: 3 }, 
        mb: 4 
      }}>
        {/* Revenue Chart */}
        <Card
          sx={{
            background: mode === 'dark'
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Weekly Revenue & Orders
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: '8px',
                      color: theme.palette.text.primary
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                    dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={theme.palette.secondary.main}
                    strokeWidth={3}
                    dot={{ fill: theme.palette.secondary.main, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* QR Code Scans */}
        <Card
          sx={{
            background: mode === 'dark'
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <QrCode2 sx={{ color: theme.palette.primary.main }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                QR Code Scans
              </Typography>
            </Box>
            <Box sx={{ space: 2 }}>
              {qrScanData.map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {item.scans}/{item.total}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(item.scans / item.total) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Most Sold Items Table */}
      <Card
        sx={{
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Restaurant sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Most Sold Items
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Item Name
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Sold
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Revenue
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Trend
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {item.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                      {item.sold}
                    </TableCell>
                    <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                      {item.revenue}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={item.trend === 'up' ? '↗ Up' : '↘ Down'}
                        size="small"
                        sx={{
                          backgroundColor: item.trend === 'up' 
                            ? 'rgba(16, 185, 129, 0.1)' 
                            : 'rgba(239, 68, 68, 0.1)',
                          color: item.trend === 'up' 
                            ? theme.palette.success.main 
                            : theme.palette.error.main,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;