'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  EyeIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

// Chart colors - updated to use color theme
const COLORS = [colorTheme.primary, colorTheme.success, colorTheme.accent, colorTheme.danger, colorTheme.secondary];

// Type definitions
interface ShareOfVoiceItem {
  name: string;
  value: number;
  color: string;
}

interface Competitor {
  id: number;
  name: string;
  industry: string;
  logo: string;
  color: string;
  adSpend: string;
  traffic: string;
}

interface TrafficSource {
  platform: string;
  Binance: number;
  Coinbase: number;
  Kraken: number;
  OKX: number;
}

interface AdMetrics {
  impressions: string;
  clicks: string;
  ctr: string;
  spend: string;
}

interface AdCreative {
  id: number;
  competitor: string;
  title: string;
  platform: string;
  date: string;
  engagement: string;
  metrics: AdMetrics;
  image: string;
}

interface Insight {
  id: number;
  text: string;
  type: 'spend' | 'creative' | 'performance' | 'strategy';
  severity: 'high' | 'medium';
  metric: string;
}

// Mock Share of Voice data - updated for ad channels
const shareOfVoiceData: ShareOfVoiceItem[] = [
  { name: 'Social Media', value: 35, color: colorTheme.accent },
  { name: 'Search Ads', value: 28, color: colorTheme.secondary },
  { name: 'Display Ads', value: 18, color: colorTheme.primary },
  { name: 'Video Ads', value: 12, color: colorTheme.neutral },
  { name: 'Native Ads', value: 7, color: colorTheme.success },
];

// Mock competitor data - updated with ad metrics
const competitors: Competitor[] = [
  { id: 1, name: 'Binance', industry: 'Crypto Exchange', logo: 'BN', color: colorTheme.accent, adSpend: '2.5M', traffic: '12.3M' },
  { id: 2, name: 'Coinbase', industry: 'Crypto Exchange', logo: 'CB', color: colorTheme.secondary, adSpend: '1.8M', traffic: '8.7M' },
  { id: 3, name: 'Kraken', industry: 'Crypto Exchange', logo: 'KR', color: colorTheme.primary, adSpend: '950K', traffic: '4.2M' },
  { id: 4, name: 'OKX', industry: 'Crypto Exchange', logo: 'OX', color: colorTheme.neutral, adSpend: '750K', traffic: '3.1M' },
  { id: 5, name: 'KuCoin', industry: 'Crypto Exchange', logo: 'KC', color: colorTheme.success, adSpend: '620K', traffic: '2.8M' },
];

// Mock traffic sources data
const trafficSourcesData: TrafficSource[] = [
  { platform: 'Organic Search', Binance: 45, Coinbase: 38, Kraken: 32, OKX: 28 },
  { platform: 'Paid Search', Binance: 25, Coinbase: 30, Kraken: 28, OKX: 32 },
  { platform: 'Social Media', Binance: 15, Coinbase: 18, Kraken: 22, OKX: 20 },
  { platform: 'Direct', Binance: 10, Coinbase: 8, Kraken: 12, OKX: 15 },
  { platform: 'Referral', Binance: 5, Coinbase: 6, Kraken: 6, OKX: 5 },
];

// Mock ad creative data - updated with more details
const adCreatives: AdCreative[] = [
  {
    id: 1,
    competitor: 'Binance',
    title: 'Trade Bitcoin with Zero Fees',
    platform: 'Meta Ads',
    date: '2023-07-01',
    engagement: 'High',
    metrics: {
      impressions: '1.2M',
      clicks: '45K',
      ctr: '3.75%',
      spend: '$15K'
    },
    image: 'https://placehold.co/300x200/F0B90B/FFFFFF/png?text=Binance+Ad',
  },
  {
    id: 2,
    competitor: 'Coinbase',
    title: 'Get Started with Crypto',
    platform: 'Google Ads',
    date: '2023-07-05',
    engagement: 'Medium',
    metrics: {
      impressions: '980K',
      clicks: '32K',
      ctr: '3.27%',
      spend: '$12K'
    },
    image: 'https://placehold.co/300x200/0052FF/FFFFFF/png?text=Coinbase+Ad',
  },
  {
    id: 3,
    competitor: 'Kraken',
    title: 'Secure Trading for Institutions',
    platform: 'LinkedIn Ads',
    date: '2023-07-10',
    engagement: 'High',
    metrics: {
      impressions: '450K',
      clicks: '18K',
      ctr: '4.00%',
      spend: '$8K'
    },
    image: 'https://placehold.co/300x200/5741D9/FFFFFF/png?text=Kraken+Ad',
  },
];

// Mock insights data - updated for ad focus
const insights: Insight[] = [
  {
    id: 1,
    text: 'Binance increased Meta ad spend by 35% in key markets, focusing on mobile app installs',
    type: 'spend',
    severity: 'high',
    metric: '+35% spend'
  },
  {
    id: 2,
    text: 'Coinbase is testing new ad formats on TikTok, targeting Gen Z users',
    type: 'creative',
    severity: 'medium',
    metric: 'New Channel'
  },
  {
    id: 3,
    text: 'Kraken\'s Google Ads CTR improved by 25% after landing page optimization',
    type: 'performance',
    severity: 'high',
    metric: '+25% CTR'
  },
  {
    id: 4,
    text: 'OKX shifted 40% of display budget to video ads on YouTube',
    type: 'strategy',
    severity: 'medium',
    metric: '40% shift'
  }
];

export default function CompetitorsPage() {
  const [activeCompetitor, setActiveCompetitor] = useState(competitors[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
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
    };
  }, []);

  // Filter competitors based on search query
  const filteredCompetitors = searchQuery
    ? competitors.filter(competitor =>
        competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competitor.industry.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : competitors;

  return (
    <div className="space-y-4">
      {/* Header with time range selector and pattern background */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 p-4" 
        style={{ background: `linear-gradient(to right, ${colorTheme.primaryDark}, ${colorTheme.neutral})` }}>
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
              <GlobeAltIcon className="h-5 w-5 text-gray-300" />
              Competitor Intelligence
            </h1>
            <p className="text-gray-300 text-sm">Monitor and analyze competitor activities</p>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
              <input 
                type="text"
                placeholder="Search competitors..."
                className="pl-9 pr-4 py-1.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Overview cards - Updated with ad metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {filteredCompetitors.map((competitor) => (
          <div 
            key={competitor.id}
            className={`bg-white rounded-lg border p-3 cursor-pointer transition-all duration-200 ${
              activeCompetitor.id === competitor.id 
                ? 'border-blue-500 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => setActiveCompetitor(competitor)}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md flex items-center justify-center text-white text-xs font-medium" 
                style={{ backgroundColor: competitor.color }}>
                {competitor.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{competitor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    ${competitor.adSpend}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {competitor.traffic} visits
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Ad Channel Distribution */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4" style={{ color: colorTheme.primary }} />
              <h2 className="text-sm font-semibold text-gray-900">Ad Channel Distribution</h2>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              Last 30 days
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-7/12" style={{ height: isMobile ? '150px' : '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={shareOfVoiceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={isMobile ? 60 : 80}
                      innerRadius={isMobile ? 40 : 55}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {shareOfVoiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Channel Share']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        border: 'none'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-5/12">
                <h3 className="text-xs font-medium text-gray-700 mb-2">Channel Performance</h3>
                <ul className="space-y-1.5">
                  {shareOfVoiceData.map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <span 
                          className="h-2.5 w-2.5 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources Analysis */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" style={{ color: colorTheme.secondary }} />
              <h2 className="text-sm font-semibold text-gray-900">Traffic Sources</h2>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              Last 30 days
            </div>
          </div>
          <div className="p-4">
            <div style={{ height: isMobile ? '150px' : '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trafficSourcesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="platform" tick={{fontSize: 11}} />
                  <YAxis 
                    tick={{fontSize: 11}}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, `Traffic Share`]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      border: 'none',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{fontSize: '11px', marginTop: '5px'}}/>
                  <Bar dataKey="Binance" fill={colorTheme.accent} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Coinbase" fill={colorTheme.secondary} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Kraken" fill={colorTheme.primary} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="OKX" fill={colorTheme.neutral} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Ad Creative Analysis */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4" style={{ color: colorTheme.accent }} />
              <h2 className="text-sm font-semibold text-gray-900">Top Performing Ads</h2>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
              <span>View all</span>
              <ChevronRightIcon className="h-3 w-3" />
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3">
              {adCreatives.map((ad) => (
                <div key={ad.id} className="flex gap-3 items-start bg-gray-50 rounded-lg p-3 relative overflow-hidden">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-200">
                    <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs font-medium text-gray-900">{ad.competitor}</h3>
                      <span className="text-xs text-gray-500">{ad.platform}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{ad.title}</p>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-900">{ad.metrics.impressions}</p>
                        <p className="text-xs text-gray-500">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-900">{ad.metrics.clicks}</p>
                        <p className="text-xs text-gray-500">Clicks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-900">{ad.metrics.ctr}</p>
                        <p className="text-xs text-gray-500">CTR</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-900">{ad.metrics.spend}</p>
                        <p className="text-xs text-gray-500">Spend</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Ad Performance Insights */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4" style={{ color: colorTheme.primary }} />
              <h2 className="text-sm font-semibold text-gray-900">Ad Performance Insights</h2>
            </div>
            <span className="text-xs inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border border-indigo-100">
              <SparklesIcon className="h-3 w-3" style={{ color: colorTheme.primary }} />
              AI Generated
            </span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {insights.map((insight) => (
                <div 
                  key={insight.id} 
                  className="bg-gray-50 rounded-lg p-3 relative overflow-hidden border border-gray-100"
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${
                        insight.type === 'spend' ? `${colorTheme.accent}0d` :
                        insight.type === 'creative' ? `${colorTheme.secondary}0d` :
                        insight.type === 'performance' ? `${colorTheme.primary}0d` :
                        `${colorTheme.success}0d`
                      }, transparent, transparent)`
                    }}
                  ></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {insight.type === 'spend' && (
                          <CurrencyDollarIcon className="h-4 w-4" style={{ color: colorTheme.accent }} />
                        )}
                        {insight.type === 'creative' && (
                          <SparklesIcon className="h-4 w-4" style={{ color: colorTheme.secondary }} />
                        )}
                        {insight.type === 'performance' && (
                          <ArrowTrendingUpIcon className="h-4 w-4" style={{ color: colorTheme.primary }} />
                        )}
                        {insight.type === 'strategy' && (
                          <ChartBarIcon className="h-4 w-4" style={{ color: colorTheme.success }} />
                        )}
                        <span className="text-xs font-medium text-gray-900">{insight.metric}</span>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        insight.severity === 'high' 
                          ? 'bg-red-50 text-red-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {insight.severity === 'high' ? 'High Impact' : 'Medium Impact'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{insight.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 