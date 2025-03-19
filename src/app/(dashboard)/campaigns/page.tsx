'use client';

import { Fragment, useState } from 'react';
import { 
  CheckCircleIcon, 
  ChevronRightIcon, 
  ClockIcon,
  CheckIcon,
  PlusIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

// Campaign workflow steps with status
const campaignSteps = [
  { id: 1, name: 'Brief sent', href: '#', status: 'complete', date: 'March 5, 2024', responsible: { name: 'Chang Zhang', role: 'Marketing Director', avatar: 'CZ' } },
  { id: 2, name: 'Briefing done', href: '#', status: 'complete', date: 'March 7, 2024', responsible: { name: 'Boris Vodkov', role: 'Account Manager', avatar: 'BV' } },
  { id: 3, name: 'Draft strategy prepared', href: '#', status: 'complete', date: 'March 12, 2024', responsible: { name: 'Dmitri Pixelov', role: 'Creative Director', avatar: 'DP' } },
  { id: 4, name: 'Media mix proposed', href: '#', status: 'complete', date: 'March 15, 2024', responsible: { name: 'Svetlana Medianova', role: 'Media Buyer', avatar: 'SM' } },
  { id: 5, name: 'Media plan updated', href: '#', status: 'complete', date: 'March 18, 2024', responsible: { name: 'Svetlana Medianova', role: 'Media Buyer', avatar: 'SM' } },
  { id: 6, name: 'Project approved', href: '#', status: 'complete', date: 'March 20, 2024', responsible: { name: 'Chang Zhang', role: 'Marketing Director', avatar: 'CZ' } },
  { id: 7, name: 'Creatives in process', href: '#', status: 'current', date: 'March 22-28, 2024', responsible: { name: 'Dmitri Pixelov', role: 'Creative Director', avatar: 'DP' } },
  { id: 8, name: 'UTM received', href: '#', status: 'upcoming', date: 'March 29, 2024', responsible: { name: 'Mikhail Analytikov', role: 'Performance Analyst', avatar: 'MA' } },
  { id: 9, name: 'Campaign launch', href: '#', status: 'upcoming', date: 'April 1, 2024', responsible: { name: 'Svetlana Medianova', role: 'Media Buyer', avatar: 'SM' } },
  { id: 10, name: '1st sprint of optimization', href: '#', status: 'upcoming', date: 'April 8, 2024', responsible: { name: 'Mikhail Analytikov', role: 'Performance Analyst', avatar: 'MA' } },
  { id: 11, name: '2nd sprint of optimization', href: '#', status: 'upcoming', date: 'April 15, 2024', responsible: { name: 'Mikhail Analytikov', role: 'Performance Analyst', avatar: 'MA' } },
  { id: 12, name: 'Campaign finish', href: '#', status: 'upcoming', date: 'April 22, 2024', responsible: { name: 'Svetlana Medianova', role: 'Media Buyer', avatar: 'SM' } },
  { id: 13, name: 'Final campaign report', href: '#', status: 'upcoming', date: 'April 26, 2024', responsible: { name: 'Boris Vodkov', role: 'Account Manager', avatar: 'BV' } },
  { id: 14, name: 'Payment processed', href: '#', status: 'upcoming', date: 'April 30, 2024', responsible: { name: 'Lisa Wong', role: 'Campaign Manager', avatar: 'LW' } },
];

// Campaign details
const campaignDetails = {
  name: "Binance Spot Trading Q2 Promotion",
  budget: "$450,000",
  startDate: "April 1, 2024",
  endDate: "April 22, 2024",
  targets: "Crypto traders aged 25-45",
  channels: "Google Ads, Facebook, Instagram, Twitter, LinkedIn",
  KPIs: "250,000 new sign-ups, $10M increase in trading volume",
  primaryObjective: "Increase new user acquisition for spot trading",
  secondaryObjective: "Improve brand awareness in European markets",
  creativeBrief: "Highlight ease of use and security features",
  nextMeeting: "March 24, 2024 - Creative Review"
};

// Campaign team
const teamMembers = [
  { name: 'Boris Vodkov', role: 'Account Manager', email: 'boris.vodkov@xdata.com', avatar: 'BV' },
  { name: 'Dmitri Pixelov', role: 'Creative Director', email: 'dmitri.pixelov@xdata.com', avatar: 'DP' },
  { name: 'Svetlana Medianova', role: 'Media Buyer', email: 'svetlana.medianova@xdata.com', avatar: 'SM' },
  { name: 'Mikhail Analytikov', role: 'Performance Analyst', email: 'mikhail.analytikov@xdata.com', avatar: 'MA' },
];

export default function CampaignsPage() {
  const [currentView, setCurrentView] = useState('roadmap');
  
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
          <h1 className="text-2xl font-semibold text-white mb-2">Campaign Status Tracker</h1>
          <p className="text-gray-300">Track your campaign workflow from brief to final report</p>
        </div>
      </div>

      {/* View selector with enhanced styling */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
          <button 
            onClick={() => setCurrentView('roadmap')}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-200 ${
              currentView === 'roadmap' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChartBarIcon className="h-4 w-4" />
            Roadmap
          </button>
          <button 
            onClick={() => setCurrentView('details')}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-200 ${
              currentView === 'details' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DocumentTextIcon className="h-4 w-4" />
            Details
          </button>
          <button 
            onClick={() => setCurrentView('team')}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-200 ${
              currentView === 'team' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserGroupIcon className="h-4 w-4" />
            Team
          </button>
        </div>
      </div>
      
      {/* Client campaign card with enhanced styling */}
      <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-white">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg transform -rotate-3">
                <span className="text-black font-bold text-lg">B</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Binance</h2>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-500" />
                  Spot Trading Promotion Campaign
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                <CheckIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-green-500" />
                On track
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                <BoltIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-blue-500" />
                7/14 steps
              </span>
            </div>
          </div>
        </div>
        
        {currentView === 'roadmap' && (
          <div className="p-6">
            <nav aria-label="Progress">
              <ol className="overflow-hidden">
                {campaignSteps.map((step, stepIdx) => (
                  <li key={step.id} className={`relative pb-8 ${stepIdx === campaignSteps.length - 1 ? 'pb-0' : ''}`}>
                    {stepIdx !== campaignSteps.length - 1 ? (
                      <div className={`absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 ${
                        step.status === 'complete' ? 'bg-blue-500' : 'bg-gray-200'
                      }`} aria-hidden="true" />
                    ) : null}
                    <div className="group relative flex items-center">
                      <span className="flex h-9 items-center" aria-hidden="true">
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200">
                          {step.status === 'complete' ? (
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <CheckCircleIcon className="h-6 w-6 text-blue-500" />
                            </div>
                          ) : step.status === 'current' ? (
                            <div className="h-8 w-8 rounded-full border-2 border-blue-500 bg-blue-50 flex items-center justify-center">
                              <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full border-2 border-gray-200 bg-white group-hover:border-gray-300 transition-colors flex items-center justify-center">
                              <ClockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </span>
                      </span>
                      <div className="ml-4 min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <h3 
                              className={`text-sm font-medium ${
                                step.status === 'complete' ? 'text-blue-600' : 
                                step.status === 'current' ? 'text-gray-900' : 'text-gray-500'
                              }`}
                            >
                              {step.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-xs font-medium text-gray-700 border border-gray-200">
                                {step.responsible.avatar}
                              </div>
                              <span className="text-xs text-gray-500 hidden sm:block">{step.responsible.name}</span>
                            </div>
                          </div>
                          <span className="flex items-center text-xs text-gray-500">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                            {step.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                          {step.status === 'complete' && (
                            <>
                              <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-green-600">Completed</span>
                              <span className="text-xs text-gray-400 hidden sm:inline">• {step.responsible.role}</span>
                            </>
                          )}
                          {step.status === 'current' && (
                            <>
                              <ArrowPathIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              <span className="text-blue-600">In progress</span>
                              <span className="text-xs text-gray-400 hidden sm:inline">• {step.responsible.role}</span>
                            </>
                          )}
                          {step.status === 'upcoming' && (
                            <>
                              <ClockIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span>Not started</span>
                              <span className="text-xs text-gray-400 hidden sm:inline">• {step.responsible.role}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}
        
        {currentView === 'details' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                    Campaign Details
                  </h3>
                  <dl className="space-y-4">
                    {Object.entries(campaignDetails).slice(0, 6).map(([key, value]) => (
                      <div key={key} className="group rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                        <dt className="text-xs font-medium text-gray-500 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() })}
                        </dt>
                        <dd className="text-sm text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent"></div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <ChartBarIcon className="h-5 w-5 text-indigo-500" />
                    Objectives & KPIs
                  </h3>
                  <dl className="space-y-4">
                    {Object.entries(campaignDetails).slice(6).map(([key, value]) => (
                      <div key={key} className="group rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                        <dt className="text-xs font-medium text-gray-500 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() })}
                        </dt>
                        <dd className="text-sm text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent"></div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <DocumentTextIcon className="h-5 w-5 text-violet-500" />
                    Documents
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="group flex items-center rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                        <div className="rounded-lg bg-violet-50 p-2 mr-3">
                          <DocumentTextIcon className="h-5 w-5 text-violet-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-violet-600">Creative Brief.pdf</p>
                          <p className="text-xs text-gray-500">Updated 2 days ago</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="group flex items-center rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                        <div className="rounded-lg bg-green-50 p-2 mr-3">
                          <DocumentTextIcon className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-green-600">Media Plan Q2 2024.xlsx</p>
                          <p className="text-xs text-gray-500">Updated 5 days ago</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="group flex items-center rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                        <div className="rounded-lg bg-blue-50 p-2 mr-3">
                          <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">Strategy Presentation.pptx</p>
                          <p className="text-xs text-gray-500">Updated 1 week ago</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'team' && (
          <div className="p-6">
            <div className="flex flex-col space-y-8">
              <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-blue-500" />
                  Campaign Team
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamMembers.map((member) => (
                    <li key={member.name}>
                      <div className="group rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-sm">
                            {member.avatar}
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                          <a 
                            href={`mailto:${member.email}`} 
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="hidden sm:block">{member.email}</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent"></div>
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-yellow-500" />
                  Client Contacts
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li>
                    <div className="group rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-medium shadow-sm">
                          CZ
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">Chang Zhang</p>
                          <p className="text-xs text-gray-500">Marketing Director</p>
                        </div>
                        <a 
                          href="mailto:chang.zhang@binance.com" 
                          className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="hidden sm:block">chang.zhang@binance.com</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="group rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-medium shadow-sm">
                          LW
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">Lisa Wong</p>
                          <p className="text-xs text-gray-500">Campaign Manager</p>
                        </div>
                        <a 
                          href="mailto:lisa.wong@binance.com" 
                          className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="hidden sm:block">lisa.wong@binance.com</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 