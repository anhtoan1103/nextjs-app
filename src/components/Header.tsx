'use client';

import { useState } from 'react';
import { Avatar, Dropdown, type MenuProps } from 'antd';
import { signOut } from 'next-auth/react';
import BalanceCard from './BalanceCard';

interface HeaderProps {
  balance: number;
  userEmail?: string;
}

export default function Header({ balance, userEmail }: HeaderProps) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/login' });
  };

  const userInitial = userEmail ? userEmail[0].toUpperCase() : '?';

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'email',
      label: <span className="text-gray-500 text-sm">{userEmail}</span>,
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'signout',
      label: (
        <span className="text-red-500 font-semibold">Sign Out</span>
      ),
      onClick: handleSignOut,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-8 sm:px-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold">💰 Spending Manager</h1>
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" trigger={['click']}>
            <button
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl px-3 py-2 transition-all duration-200"
              disabled={loading}
            >
              <Avatar
                size={32}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: '#667eea',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {userInitial}
              </Avatar>
              <span className="text-white/90 text-sm hidden sm:inline max-w-[8rem] truncate">
                {userEmail}
              </span>
              <svg
                className="w-4 h-4 text-white/70 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </Dropdown>
        </div>
        <p className="text-white/90 text-sm sm:text-base mb-6">
          Track your expenses and income
        </p>
        <BalanceCard balance={balance} />
      </div>
    </div>
  );
}
