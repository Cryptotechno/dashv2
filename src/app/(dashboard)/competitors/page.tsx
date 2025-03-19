'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Chart colors
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Mock Share of Voice data
const shareOfVoiceData = [
  { name: 'Binance', value: 35, color: '#F0B90B' },  // Binance yellow
  { name: 'Coinbase', value: 22, color: '#0052FF' }, // Coinbase blue
  { name: 'Kraken', value: 16, color: '#5741D9' },   // Kraken purple
  { name: 'OKX', value: 12, color: '#10B981' },      // Green
  { name: 'KuCoin', value: 8, color: '#31D7A0' },    // KuCoin green-blue
  { name: 'Bybit', value: 7, color: '#F69B13' }      // Bybit orange
];

// Mock competitor data
const competitors = [
  { id: 1, name: 'Binance', industry: 'Crypto Exchange', logoColor: 'bg-yellow-500' },
  { id: 2, name: 'Coinbase', industry: 'Crypto Exchange', logoColor: 'bg-blue-600' },
  { id: 3, name: 'Kraken', industry: 'Crypto Exchange', logoColor: 'bg-purple-600' },
  { id: 4, name: 'OKX', industry: 'Crypto Exchange', logoColor: 'bg-green-500' },
  { id: 5, name: 'KuCoin', industry: 'Crypto Exchange', logoColor: 'bg-emerald-500' },
  { id: 6, name: 'Bybit', industry: 'Crypto Exchange', logoColor: 'bg-orange-500' },
];

// Mock ad platform data
const adPlatforms = [
  { name: 'Facebook', value: 35 },
  { name: 'Instagram', value: 25 },
  { name: 'Google', value: 30 },
  { name: 'TikTok', value: 10 },
];

// Mock ad spend data
const adSpendData = [
  { month: 'Jan', Binance: 4000, Coinbase: 2400, Kraken: 1800, OKX: 3200 },
  { month: 'Feb', Binance: 3000, Coinbase: 1398, Kraken: 2100, OKX: 2900 },
  { month: 'Mar', Binance: 2000, Coinbase: 9800, Kraken: 2200, OKX: 3100 },
  { month: 'Apr', Binance: 2780, Coinbase: 3908, Kraken: 2500, OKX: 2600 },
  { month: 'May', Binance: 1890, Coinbase: 4800, Kraken: 2300, OKX: 3400 },
  { month: 'Jun', Binance: 2390, Coinbase: 3800, Kraken: 2100, OKX: 2900 },
];

// Mock ad creative data
const adCreatives = [
  {
    id: 1,
    competitor: 'Binance',
    title: 'Trade Crypto with Low Fees',
    platform: 'Facebook',
    date: '2023-07-01',
    engagement: 'High',
    image: 'https://placehold.co/300x200/F0B90B/FFFFFF/png?text=Binance+Ad',
  },
  {
    id: 2,
    competitor: 'Coinbase',
    title: 'Start Your Crypto Journey',
    platform: 'Instagram',
    date: '2023-07-05',
    engagement: 'Medium',
    image: 'https://placehold.co/300x200/0052FF/FFFFFF/png?text=Coinbase+Ad',
  },
  {
    id: 3,
    competitor: 'Kraken',
    title: 'Security First Trading',
    platform: 'Google',
    date: '2023-07-10',
    engagement: 'Low',
    image: 'https://placehold.co/300x200/5741D9/FFFFFF/png?text=Kraken+Ad',
  },
];

// Mock insights data
const insights = [
  {
    id: 1,
    text: 'Binance has increased Facebook ad spend by 25% in the last month, focusing on new market acquisition',
    type: 'spend',
    severity: 'medium',
  },
  {
    id: 2,
    text: 'Coinbase is testing new ad creatives highlighting security and regulatory compliance',
    type: 'creative',
    severity: 'high',
  },
  {
    id: 3,
    text: 'Kraken has reduced Google ad spend while increasing TikTok presence targeting younger users',
    type: 'strategy',
    severity: 'medium',
  },
  {
    id: 4,
    text: 'OKX has started targeting a new demographic (18-24) on Instagram with educational content',
    type: 'targeting',
    severity: 'high',
  },
];

export default function CompetitorsPage() {
  const [activeCompetitor, setActiveCompetitor] = useState(competitors[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter competitors based on search query
  const filteredCompetitors = searchQuery
    ? competitors.filter(competitor =>
        competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competitor.industry.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : competitors;

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
          <h1 className="text-2xl font-semibold text-white mb-2">Competitor Intelligence</h1>
          <p className="text-gray-300">Monitor and analyze competitor activities in real-time</p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share Analysis */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900">Share of Voice Analysis</h2>
              <p className="text-sm text-gray-500">Market presence and brand visibility comparison</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={shareOfVoiceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {shareOfVoiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Share of Voice']}
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
              <div className="md:col-span-5 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Key Insights</h3>
                <ul className="space-y-2">
                  {shareOfVoiceData.map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-gray-600">{item.name}:</span>
                      <span className="ml-1 font-medium">{item.value}%</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Share of Voice measures the visibility and presence of each brand across digital channels including social media, search, and industry publications.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      Opportunity: Increase TikTok presence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent"></div>
            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900">Feature Comparison</h2>
              <p className="text-sm text-gray-500">Key differentiators and feature analysis</p>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Trading Features */}
              <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Trading Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Spot Trading</span>
                      <span className="text-sm font-medium text-green-600">Leading</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Futures Trading</span>
                      <span className="text-sm font-medium text-yellow-600">Competitive</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Margin Trading</span>
                      <span className="text-sm font-medium text-blue-600">Strong</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent"></div>
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Security Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">2FA</span>
                      <span className="text-sm font-medium text-green-600">Advanced</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cold Storage</span>
                      <span className="text-sm font-medium text-green-600">Industry Leading</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Insurance</span>
                      <span className="text-sm font-medium text-yellow-600">Competitive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Experience */}
              <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"></div>
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">User Experience</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mobile App</span>
                      <span className="text-sm font-medium text-yellow-600">Improving</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Support</span>
                      <span className="text-sm font-medium text-green-600">Superior</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Documentation</span>
                      <span className="text-sm font-medium text-blue-600">Strong</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitor Activity Feed */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent"></div>
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900">Recent Competitor Activities</h2>
                <p className="text-sm text-gray-500">Latest updates and market movements</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">Kraken</h3>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Launched new mobile app features focusing on beginner traders</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">Coinbase</h3>
                      <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Reduced trading fees for high-volume traders by 5%</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">KuCoin</h3>
                      <span className="text-xs text-gray-500">8 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Expanded futures trading options with 3 new trading pairs</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">OKX</h3>
                      <span className="text-xs text-gray-500">12 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Announced partnership with major payment provider for faster deposits</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">Bybit</h3>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Launched new derivatives products with enhanced risk management features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* NEW SECTION: Detailed Competitor Profiles */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900">Detailed Competitor Profiles</h2>
                <p className="text-sm text-gray-500">In-depth analysis of top competitors</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Competitor Profile Cards */}
                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                        CB
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Coinbase</h3>
                        <p className="text-sm text-gray-500">US-based public exchange</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Strengths</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                            Strong regulatory compliance in key markets
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                            Publicly traded company with institutional focus
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                            User-friendly interface for beginners
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Market Position</h4>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 flex-grow rounded-full bg-gray-200">
                            <div className="h-2 rounded-full bg-blue-600" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">78%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Relative to industry leaders</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Strategy</h4>
                        <p className="text-sm text-gray-600">
                          Expanding institutional services and focusing on regulatory compliance to position as the trusted exchange for institutional investors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-yellow-500 flex items-center justify-center text-white font-bold">
                        BN
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Binance</h3>
                        <p className="text-sm text-gray-500">Global trading platform</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Strengths</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-2"></span>
                            Industry-leading liquidity and trading volume
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-2"></span>
                            Comprehensive product ecosystem (spot, futures, launchpad)
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-2"></span>
                            Competitive fee structure with BNB discounts
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Market Position</h4>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 flex-grow rounded-full bg-gray-200">
                            <div className="h-2 rounded-full bg-yellow-500" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">92%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Relative to industry leaders</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Strategy</h4>
                        <p className="text-sm text-gray-600">
                          Pursuing regulatory compliance in key markets while expanding Web3 products and enhancing the BNB Chain ecosystem.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">
                        KR
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Kraken</h3>
                        <p className="text-sm text-gray-500">US-based exchange</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Strengths</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></span>
                            Advanced security features and clean security record
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></span>
                            Strong fiat on/off ramp options
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></span>
                            Extensive staking services
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Market Position</h4>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 flex-grow rounded-full bg-gray-200">
                            <div className="h-2 rounded-full bg-purple-600" style={{ width: '68%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">68%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Relative to industry leaders</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Strategy</h4>
                        <p className="text-sm text-gray-600">
                          Positioning as a security-first exchange with focus on educational content for traders of all levels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                        KC
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">KuCoin</h3>
                        <p className="text-sm text-gray-500">Seychelles-based exchange</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Strengths</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                            Wide selection of altcoins and new token listings
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                            Native KCS token with multiple utilities
                          </li>
                          <li className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                            Innovative trading features and social trading
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Market Position</h4>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 flex-grow rounded-full bg-gray-200">
                            <div className="h-2 rounded-full bg-emerald-500" style={{ width: '55%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">55%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Relative to industry leaders</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Strategy</h4>
                        <p className="text-sm text-gray-600">
                          Focusing on being the "People's Exchange" with community-driven development and early access to promising projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* NEW SECTION: Market Trends & Competitive Landscape */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent"></div>
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900">Market Trends & Competitive Landscape</h2>
                <p className="text-sm text-gray-500">Key trends shaping the industry and competitive positioning</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Industry Trend Cards */}
                <div className="bg-gray-50 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Regulatory Evolution</h3>
                    <p className="text-sm text-gray-600">
                      Increasing regulatory clarity is allowing larger institutions to enter the market, favoring compliant exchanges.
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Impact Level</span>
                        <span>High</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Security Prioritization</h3>
                    <p className="text-sm text-gray-600">
                      After several high-profile breaches, users are increasingly selecting exchanges based on security features and track record.
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Impact Level</span>
                        <span>Very High</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent"></div>
                  <div className="relative">
                    <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Fee Compression</h3>
                    <p className="text-sm text-gray-600">
                      Intense competition is driving trading fees lower, forcing exchanges to diversify revenue streams and add value-added services.
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Impact Level</span>
                        <span>Medium</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Competitive Positioning Chart */}
              <div className="mt-8 bg-gray-50 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                <div className="relative">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Competitive Positioning Matrix</h3>
                  <div className="aspect-[16/9] bg-white rounded-lg p-4 border border-gray-100">
                    <div className="h-full relative">
                      {/* X and Y axis */}
                      <div className="absolute left-0 top-0 h-full border-r border-gray-300"></div>
                      <div className="absolute left-0 bottom-0 w-full border-t border-gray-300"></div>
                      
                      {/* Axis labels */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-gray-500 transform rotate-90">Feature Richness</div>
                      <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-gray-500">User Experience</div>
                      
                      {/* Competitor dots */}
                      <div className="absolute left-[75%] top-[25%] h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" title="Coinbase">CB</div>
                      <div className="absolute left-[85%] top-[35%] h-6 w-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" title="Binance">BN</div>
                      <div className="absolute left-[60%] top-[60%] h-6 w-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" title="Kraken">KR</div>
                      <div className="absolute left-[40%] top-[50%] h-6 w-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" title="KuCoin">KC</div>
                      <div className="absolute left-[30%] top-[75%] h-6 w-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" title="OKX">OX</div>
                      <div className="absolute left-[55%] top-[70%] h-6 w-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" title="Bybit">BB</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Based on analysis of user reviews, feature sets, and market research</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 