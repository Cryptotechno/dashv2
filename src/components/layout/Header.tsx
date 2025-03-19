'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  UserCircleIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const userNavigation = [
    { name: 'Your Profile', href: '#', icon: UserIcon },
    { name: 'Settings', href: '#', icon: Cog6ToothIcon },
    { name: 'Sign out', href: '#', icon: ArrowRightOnRectangleIcon },
  ];

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <div className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                Company: Binance
              </div>
              <div className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                Account: Enterprise
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative mx-auto hidden sm:flex items-center">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-2"
                  aria-hidden="true"
                />
                <input
                  id="search"
                  name="search"
                  className="block w-full border-0 bg-gray-100 py-1.5 pl-8 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-lg"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
            <div className="ml-4 flow-root">
              <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
            </div>
            <div className="ml-4 flow-root">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      JD
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                      <p className="truncate text-xs text-gray-500">jane.doe@binance.com</p>
                    </div>
                    
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'group flex items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 