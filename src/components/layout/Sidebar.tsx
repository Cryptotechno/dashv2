'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CursorArrowRaysIcon, 
  ChartBarIcon, 
  EyeIcon,
  BoltIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

// Updated navigation with crypto-focused descriptions
const navigation = [
  { 
    name: 'Campaigns', 
    href: '/campaigns', 
    icon: CursorArrowRaysIcon, 
    color: 'blue',
    description: 'Marketing roadmap'
  },
  { 
    name: 'Performance', 
    href: '/performance', 
    icon: ChartBarIcon, 
    color: 'indigo',
    description: 'Trading analytics'
  },
  { 
    name: 'Competitors', 
    href: '/competitors', 
    icon: EyeIcon, 
    color: 'violet',
    description: 'Market intelligence'
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-100">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Updated branding */}
        <div className="flex flex-shrink-0 items-center px-6 py-8">
          <span className="flex items-center">
            <div className="h-9 w-9 bg-black flex items-center justify-center text-white font-bold rounded-lg shadow-sm">
              <span className="text-lg">X</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 ml-3 tracking-tight">Data</h1>
          </span>
        </div>
        
        {/* Enhanced navigation section */}
        <div className="px-4 mt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 pl-2">
            CAMPAIGN ANALYTICS
          </p>
        </div>
        
        <nav className="flex-1 space-y-2 px-4">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || 
                            (item.href !== '/' && pathname.startsWith(item.href));
            
            let bgColor = '';
            let hoverColor = '';
            let gradientFrom = '';
            let gradientTo = '';
            
            if (item.color === 'blue') {
              bgColor = isActive ? 'bg-blue-50' : '';
              hoverColor = 'hover:bg-blue-50/50';
              gradientFrom = 'from-blue-500';
              gradientTo = 'to-blue-600';
            } else if (item.color === 'indigo') {
              bgColor = isActive ? 'bg-indigo-50' : '';
              hoverColor = 'hover:bg-indigo-50/50';
              gradientFrom = 'from-indigo-500';
              gradientTo = 'to-indigo-600';
            } else if (item.color === 'violet') {
              bgColor = isActive ? 'bg-violet-50' : '';
              hoverColor = 'hover:bg-violet-50/50';
              gradientFrom = 'from-violet-500';
              gradientTo = 'to-violet-600';
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3.5 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActive
                    ? `${bgColor} text-gray-900 shadow-sm ring-1 ring-gray-200/60`
                    : `text-gray-600 ${hoverColor} hover:text-gray-900`
                  }
                `}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className={`
                  mr-3 flex-shrink-0 rounded-lg w-10 h-10 flex items-center justify-center overflow-hidden
                  ${isActive 
                    ? `bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-sm`
                    : isHovered === index
                      ? `bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-sm`
                      : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }
                  transition-all duration-200
                `}>
                  <item.icon
                    className={`h-5 w-5 ${isActive || isHovered === index ? 'text-white' : 'text-gray-500'} transition-colors duration-200`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium leading-tight">{item.name}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{item.description}</span>
                </div>
                {isActive && (
                  <span className="ml-auto">
                    <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Enhanced client support section */}
      <div className="flex flex-shrink-0 p-4 border-t border-gray-100">
        <div className="group block w-full flex-shrink-0 bg-gradient-to-r from-gray-900 to-black rounded-xl p-5 transition-all duration-200 hover:shadow-md text-white overflow-hidden relative hover:scale-[1.02]">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-md"></div>
          <div className="absolute right-12 bottom-0 w-12 h-12 bg-yellow-500/10 rounded-full blur-md"></div>
          <div className="flex items-center relative z-10">
            <div className="flex-shrink-0 rounded-lg bg-yellow-500 p-2.5 shadow-sm">
              <ArrowTrendingUpIcon className="h-5 w-5 text-black" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Client: Binance</p>
              <p className="text-xs text-gray-300 mt-0.5">Crypto exchange platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 