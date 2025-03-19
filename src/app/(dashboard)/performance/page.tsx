'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { ArrowUpIcon, ArrowDownIcon, ChartBarIcon, ClockIcon, CurrencyDollarIcon, MagnifyingGlassIcon, SparklesIcon, ArrowsRightLeftIcon, EyeIcon } from '@heroicons/react/24/outline';

// Register ChartJS components
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

// Mock data for the bar chart
const lastMonthData = {
  labels: ['Facebook', 'Instagram', 'Google', 'YouTube', 'TikTok', 'LinkedIn'],
  datasets: [
    {
      label: 'Spend by Platform',
      data: [35000, 25000, 30000, 15000, 10000, 5000],
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)',
        'rgba(168, 85, 247, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(34, 211, 238, 0.6)',
        'rgba(16, 185, 129, 0.6)',
      ],
      borderWidth: 0,
      borderRadius: 4,
    },
  ],
};

// Options for the bar chart
const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 12,
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        }
      }
    },
    title: {
      display: true,
      text: 'Spend by Platform (Last 30 Days)',
      font: {
        size: 14,
        weight: 500,
      },
      padding: {
        bottom: 20
      }
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        color: '#f8f8f8',
      },
      ticks: {
        callback: function(value: any) {
          return '$' + value.toLocaleString();
        }
      }
    }
  }
};

// Mock data for the line chart
const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'CTR',
      data: [1.8, 2.1, 1.9, 2.2, 2.5, 2.8, 3.2],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgb(34, 197, 94)',
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
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgb(239, 68, 68)',
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

// Options for the line chart
const lineOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Performance Metrics (2023)',
      font: {
        size: 14,
        weight: 500,
      },
      padding: {
        bottom: 20
      }
    },
    legend: {
      labels: {
        boxWidth: 12,
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
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
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        color: '#f8f8f8',
      },
      title: {
        display: true,
        text: 'CTR (%)',
      }
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: 'CPC ($)',
      }
    },
  },
};

// Mock data for AI insights
const insightsData = [
  {
    insight: 'Facebook CPC has decreased by 15% after creative update on July 15.',
    severity: 'positive',
    timestamp: '2 hours ago',
  },
  {
    insight: 'Google campaign "Product Launch" has 30% lower CTR than industry average.',
    severity: 'negative',
    timestamp: '1 day ago',
  },
  {
    insight: 'TikTok audience engagement peaks between 7-9pm, consider adjusting delivery schedule.',
    severity: 'info',
    timestamp: '2 days ago',
  },
  {
    insight: 'Creative fatigue detected in Instagram campaign "Summer Promo".',
    severity: 'warning',
    timestamp: '3 days ago',
  },
];

export default function PerformancePage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header with pattern background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-2xl font-semibold text-white mb-2">Performance Dashboard</h1>
          <p className="text-gray-300">Track campaign metrics and analyze performance data</p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Cards */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h2>
              <p className="text-sm text-gray-500">Last 30 days performance</p>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            {/* KPI Items */}
            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
              <div className="relative">
                <p className="text-sm font-medium text-gray-500">New Sign-ups</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">124,892</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +12.5%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent"></div>
              <div className="relative">
                <p className="text-sm font-medium text-gray-500">Trading Volume</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">$8.2M</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +18.2%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"></div>
              <div className="relative">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">3.8%</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +2.1%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent"></div>
              <div className="relative">
                <p className="text-sm font-medium text-gray-500">Avg. Transaction</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">$1,240</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                    </svg>
                    -3.2%
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent"></div>
            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
              <p className="text-sm text-gray-500">Daily sign-ups and trading volume</p>
            </div>
          </div>
          <div className="p-6">
            <Bar options={barOptions} data={lastMonthData} height={280} />
          </div>
        </div>

        {/* AI Insights */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent"></div>
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900">AI-Generated Insights</h2>
                <p className="text-sm text-gray-500">Automated analysis and recommendations</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <h3 className="text-sm font-medium text-gray-900">Peak Performance Times</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Highest conversion rates observed between 2 PM - 6 PM UTC. Consider focusing ad delivery during these hours.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <h3 className="text-sm font-medium text-gray-900">Geographic Hotspots</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Strong performance in European markets, especially Germany and UK. Consider increasing budget allocation.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <h3 className="text-sm font-medium text-gray-900">Channel Performance</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Google Ads showing highest ROI at 3.2x. Twitter engagement up 25% after content optimization.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <h3 className="text-sm font-medium text-gray-900">Optimization Opportunities</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Mobile conversion rate 15% lower than desktop. Recommend reviewing mobile UX and load times.
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