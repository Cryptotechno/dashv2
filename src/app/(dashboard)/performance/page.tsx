'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  MagnifyingGlassIcon, 
  SparklesIcon, 
  ArrowsRightLeftIcon, 
  EyeIcon,
  BoltIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

// Register ChartJS components - client-side only
if (typeof window !== 'undefined') {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  // Configure chart defaults for stylish design
  ChartJS.defaults.color = '#555555';
  ChartJS.defaults.borderColor = '#f1f1f1';
  ChartJS.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
}

// Define a consistent color theme
const colorTheme = {
  primary: '#4f46e5', // indigo-600
  primaryLight: '#e0e7ff', // indigo-100
  primaryDark: '#3730a3', // indigo-800
  secondary: '#0ea5e9', // sky-500
  secondaryLight: '#e0f2fe', // sky-100
  accent: '#f59e0b', // amber-500
  accentLight: '#fef3c7', // amber-100
  success: '#10b981', // emerald-500
  successLight: '#d1fae5', // emerald-100
  danger: '#ef4444', // red-500
  dangerLight: '#fee2e2', // red-100
  neutral: '#6b7280', // gray-500
  neutralLight: '#f3f4f6', // gray-100
};

// Performance metrics data
const timeRanges = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d', default: true },
  { label: 'Last Quarter', value: 'quarter' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Last 12 Months', value: '12m' },
];

// Mock data for KPIs
const kpiData = [
  { 
    name: 'Total Spend', 
    value: '$125,900', 
    change: '+12.5%', 
    trend: 'up',
    icon: CurrencyDollarIcon,
    color: 'blue',
    description: 'Total ad spend across all platforms'
  },
  { 
    name: 'CTR', 
    value: '3.2%', 
    change: '+0.8%', 
    trend: 'up',
    icon: ArrowsRightLeftIcon,
    color: 'green',
    description: 'Average click-through rate' 
  },
  { 
    name: 'CPC', 
    value: '$1.25', 
    change: '-0.3%', 
    trend: 'down',
    icon: CurrencyDollarIcon,
    color: 'red',
    description: 'Average cost per click'
  },
  { 
    name: 'Conversions', 
    value: '1,205', 
    change: '+18.2%', 
    trend: 'up',
    icon: EyeIcon,
    color: 'indigo',
    description: 'Total conversion events'
  },
];

// Add platform logos/icons data
const platformIcons = {
  Facebook: 
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>,
  Instagram: 
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#E4405F">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
    </svg>,
  Google: 
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>,
  YouTube: 
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>,
  TikTok: 
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>,
  LinkedIn: 
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
};

// Mock data for the bar chart - updated with consistent structure
const lastMonthData = {
  labels: ['Facebook', 'Instagram', 'Google', 'YouTube', 'TikTok', 'LinkedIn'],
  datasets: [
    {
      label: 'Spend by Platform',
      data: [35000, 25000, 30000, 15000, 10000, 5000],
      backgroundColor: [
        'rgba(14, 165, 233, 0.85)',   // Facebook - using colorTheme.secondary
        'rgba(14, 165, 233, 0.7)',    // Instagram - lighter secondary
        'rgba(79, 70, 229, 0.85)',    // Google - using colorTheme.primary
        'rgba(79, 70, 229, 0.7)',     // YouTube - lighter primary
        'rgba(245, 158, 11, 0.85)',   // TikTok - using colorTheme.accent
        'rgba(245, 158, 11, 0.7)',    // LinkedIn - lighter accent
      ],
      borderWidth: 0,
      borderRadius: 4,
    },
  ],
};

// Mock data for the line chart
const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'CTR',
      data: [1.8, 2.1, 1.9, 2.2, 2.5, 2.8, 3.2],
      borderColor: colorTheme.success,
      backgroundColor: colorTheme.success,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      tension: 0.4,
      yAxisID: 'y',
    },
    {
      label: 'CPC',
      data: [1.5, 1.42, 1.38, 1.35, 1.32, 1.28, 1.25],
      borderColor: colorTheme.danger,
      backgroundColor: colorTheme.danger,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      tension: 0.4,
      yAxisID: 'y1',
    },
  ],
};

export default function PerformancePage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const chartRef1 = useRef<any>(null);
  const chartRef2 = useRef<any>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Destroy charts to prevent memory leaks
      if (chartRef1.current && chartRef1.current.destroy) {
        chartRef1.current.destroy();
      }
      if (chartRef2.current && chartRef2.current.destroy) {
        chartRef2.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Combined header with time range selector and pattern background */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-blue-800 p-4" 
        style={{ background: `linear-gradient(to right, ${colorTheme.primaryDark}, ${colorTheme.secondary})` }}>
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)"/>
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white flex items-center gap-2">
              <PresentationChartLineIcon className="h-5 w-5 text-blue-300" />
              Performance Dashboard
            </h1>
            <p className="text-blue-200 text-sm">Track metrics and analyze campaign performance</p>
          </div>
          
          <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/20 shadow-inner">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedTimeRange(range.value)}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                  selectedTimeRange === range.value
                    ? `bg-${colorTheme.secondary} text-white shadow-sm`
                    : 'text-blue-100 hover:text-white'
                }`}
                style={selectedTimeRange === range.value ? { backgroundColor: colorTheme.secondary } : {}}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiData.map((kpi, index) => (
          <div 
            key={index}
            className={`bg-white rounded-xl border border-gray-100 p-3 flex items-center shadow-sm transition-all duration-200 ${
              hoveredKpi === index ? 'transform scale-[1.02]' : ''
            }`}
            onMouseEnter={() => setHoveredKpi(index)}
            onMouseLeave={() => setHoveredKpi(null)}
          >
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
              hoveredKpi === index ? `ring-2 ${
                kpi.color === 'blue' ? 'ring-blue-400' :
                kpi.color === 'green' ? 'ring-green-400' :
                kpi.color === 'red' ? 'ring-red-400' :
                'ring-indigo-400'
              }` : ''
            } ${
              kpi.color === 'blue' ? 'bg-blue-100' :
              kpi.color === 'green' ? 'bg-green-100' :
              kpi.color === 'red' ? 'bg-red-100' :
              'bg-indigo-100'
            }`}
            style={
              kpi.color === 'blue' ? { backgroundColor: colorTheme.secondaryLight, color: colorTheme.secondary } :
              kpi.color === 'green' ? { backgroundColor: colorTheme.successLight, color: colorTheme.success } :
              kpi.color === 'red' ? { backgroundColor: colorTheme.dangerLight, color: colorTheme.danger } :
              { backgroundColor: colorTheme.primaryLight, color: colorTheme.primary }
            }>
              <kpi.icon className="h-5 w-5" style={{
                color: kpi.color === 'blue' ? colorTheme.secondary :
                       kpi.color === 'green' ? colorTheme.success :
                       kpi.color === 'red' ? colorTheme.danger :
                       colorTheme.primary
              }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">{kpi.name}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                  kpi.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                  {kpi.trend === 'up' ? 
                    <ArrowUpIcon className="h-2.5 w-2.5" /> : 
                    <ArrowDownIcon className="h-2.5 w-2.5" />
                  }
                  {kpi.change}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{kpi.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content - 2 column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Platform Performance Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-blue-600" style={{ color: colorTheme.secondary }} />
              <h2 className="text-sm font-semibold text-gray-900">Platform Performance</h2>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              Last 30 days
            </div>
          </div>
          <div className="p-4">
            <div className="mb-3 flex items-center justify-center gap-3">
              {lastMonthData.labels.map((platform, index) => (
                <div key={platform} className="flex items-center gap-1">
                  <div 
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: lastMonthData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    {platformIcons[platform as keyof typeof platformIcons]}
                    <span className="hidden sm:inline">{platform}</span>
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: isMobile ? '150px' : '200px' }}>
              <Bar 
                ref={chartRef1}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `$${context.parsed.y.toLocaleString()}`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false
                      }
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: '#f8f8f8',
                      },
                      ticks: {
                        callback: function(value) {
                          if (typeof value !== 'number') return '';
                          return '$' + (value >= 1000 ? `${Math.floor(value / 1000)}k` : value);
                        }
                      }
                    }
                  }
                }} data={lastMonthData} />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-green-600" style={{ color: colorTheme.success }} />
              <h2 className="text-sm font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              Conversion metrics
            </div>
          </div>
          <div className="p-4">
            <div style={{ height: isMobile ? '150px' : '200px' }}>
              <Line 
                ref={chartRef2}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        boxWidth: 8,
                        usePointStyle: true,
                        padding: 10,
                        font: {
                          size: 11,
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.dataset.label || '';
                          const value = context.parsed.y;
                          return label === 'CTR' ? `${label}: ${value}%` : `${label}: $${value}`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      }
                    },
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      grid: {
                        color: '#f8f8f8',
                      },
                      ticks: {
                        callback: function(value) {
                          if (typeof value !== 'number') return '';
                          return value + '%';
                        }
                      }
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      grid: {
                        drawOnChartArea: false,
                      },
                      ticks: {
                        callback: function(value) {
                          if (typeof value !== 'number') return '';
                          return '$' + value;
                        }
                      }
                    }
                  }
                }} data={performanceData} />
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BoltIcon className="h-4 w-4 text-amber-500" style={{ color: colorTheme.accent }} />
                <h2 className="text-sm font-semibold text-gray-900">AI-Generated Insights</h2>
              </div>
              <span className="text-xs inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-100">
                <SparklesIcon className="h-3 w-3" style={{ color: colorTheme.accent }} />
                Smart Analytics
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" 
                    style={{ background: `linear-gradient(to bottom right, ${colorTheme.secondary}0d, transparent, transparent)` }}></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="h-4 w-4 text-blue-600" style={{ color: colorTheme.secondary }} />
                      <h3 className="text-sm font-medium text-gray-900">Peak Performance</h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      Highest conversion rates observed between <span className="font-medium">2 PM - 6 PM UTC</span>. Consider focusing ad delivery during these hours.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" 
                    style={{ background: `linear-gradient(to bottom right, ${colorTheme.success}0d, transparent, transparent)` }}></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <GlobeAltIcon className="h-4 w-4 text-green-600" style={{ color: colorTheme.success }} />
                      <h3 className="text-sm font-medium text-gray-900">Geographic Hotspots</h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      Strong performance in <span className="font-medium">European markets</span>, especially Germany and UK. Consider increasing budget allocation.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" 
                    style={{ background: `linear-gradient(to bottom right, ${colorTheme.accent}0d, transparent, transparent)` }}></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-4 flex items-center justify-center">
                        {platformIcons['Google']}
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">Channel Insights</h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Google Ads</span> showing highest ROI at <span className="font-medium">3.2x</span>. Twitter engagement up 25% after content optimization.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" 
                    style={{ background: `linear-gradient(to bottom right, ${colorTheme.primary}0d, transparent, transparent)` }}></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <DevicePhoneMobileIcon className="h-4 w-4 text-purple-600" style={{ color: colorTheme.primary }} />
                      <h3 className="text-sm font-medium text-gray-900">Mobile Optimization</h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Mobile conversion rate 15% lower</span> than desktop. Recommend reviewing mobile UX and load times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 