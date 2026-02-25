import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Crown, LogOut, LayoutDashboard, Users } from 'lucide-react';
import PropertiesManager from '../components/admin/PropertiesManager';
import LeadsManager from '../components/admin/LeadsManager';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPanel() {
  const { identity, login, clear, isLoggingIn, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: '#FFD700', borderTopColor: 'transparent' }}
          />
          <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <div
          className="w-full max-w-md p-8 rounded-lg text-center"
          style={{
            background: '#111111',
            border: '1px solid rgba(255,215,0,0.2)',
          }}
        >
          <Crown className="w-12 h-12 mx-auto mb-4" style={{ color: '#FFD700' }} />
          <h1
            className="font-serif font-bold text-2xl mb-2"
            style={{ color: '#F5F0E8' }}
          >
            Admin Access
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Sign in with Internet Identity to manage properties and view leads.
          </p>
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded font-bold text-sm tracking-wide transition-all duration-300 disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#0A0A0A',
            }}
          >
            {isLoggingIn ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: '#0A0A0A', borderTopColor: 'transparent' }}
                />
                Connecting...
              </>
            ) : (
              'Login with Internet Identity'
            )}
          </button>
          <p
            className="text-xs mt-4"
            style={{ color: 'rgba(245,240,232,0.3)' }}
          >
            Secured by Internet Computer's passkey authentication
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Admin Header */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-4"
        style={{
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid rgba(255,215,0,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5" style={{ color: '#FFD700' }} />
            <div>
              <span
                className="font-serif font-bold text-base"
                style={{ color: '#FFD700' }}
              >
                Admin Panel
              </span>
              <span
                className="hidden sm:inline text-xs ml-2"
                style={{ color: 'rgba(245,240,232,0.4)' }}
              >
                Alex Rivera · Delhi Luxury Real Estate
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="hidden sm:block text-xs px-3 py-1 rounded-full"
              style={{
                background: 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.2)',
                color: 'rgba(245,240,232,0.6)',
              }}
            >
              {identity.getPrincipal().toString().slice(0, 12)}...
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(220,20,60,0.3)',
                color: '#DC143C',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(220,20,60,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="properties">
          <TabsList
            className="mb-8 p-1 rounded-lg"
            style={{
              background: '#111111',
              border: '1px solid rgba(255,215,0,0.15)',
            }}
          >
            <TabsTrigger
              value="properties"
              className="flex items-center gap-2 text-sm data-[state=active]:text-[#0A0A0A]"
              style={
                {
                  '--tw-ring-color': 'transparent',
                } as React.CSSProperties
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="flex items-center gap-2 text-sm data-[state=active]:text-[#0A0A0A]"
            >
              <Users className="w-4 h-4" />
              Leads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <PropertiesManager />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
