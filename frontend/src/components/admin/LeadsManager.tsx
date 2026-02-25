import { Download, AlertCircle, Users } from 'lucide-react';
import { useGetAllLeads } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Lead } from '../../backend';

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function downloadCSV(leads: Lead[]) {
  const headers = ['Name', 'Phone', 'Email', 'Budget', 'Message', 'Date'];
  const rows = leads.map((l) => [
    `"${l.name}"`,
    `"${l.phone}"`,
    `"${l.email}"`,
    `"${l.budget}"`,
    `"${l.message.replace(/"/g, '""')}"`,
    `"${formatDate(l.createdAt)}"`,
  ]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsManager() {
  const { data: leads, isLoading, error } = useGetAllLeads();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="font-serif font-bold text-xl"
            style={{ color: '#F5F0E8' }}
          >
            Leads
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'rgba(245,240,232,0.45)' }}
          >
            {leads?.length ?? 0} enquir{(leads?.length ?? 0) !== 1 ? 'ies' : 'y'} received
          </p>
        </div>
        {leads && leads.length > 0 && (
          <button
            onClick={() => downloadCSV(leads)}
            className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold transition-all duration-300"
            style={{
              border: '1px solid rgba(255,215,0,0.3)',
              color: '#FFD700',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(255,215,0,0.06)';
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                'rgba(255,215,0,0.6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                'rgba(255,215,0,0.3)';
            }}
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 p-4 rounded-lg mb-4 text-sm"
          style={{
            background: 'rgba(220,20,60,0.1)',
            border: '1px solid rgba(220,20,60,0.3)',
            color: '#DC143C',
          }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          Failed to load leads. Make sure you are logged in as admin.
        </div>
      )}

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(255,215,0,0.12)' }}
      >
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" style={{ background: '#1a1a1a' }} />
            ))}
          </div>
        ) : !leads || leads.length === 0 ? (
          <div
            className="py-16 text-center"
            style={{ background: '#111111' }}
          >
            <Users
              className="w-10 h-10 mx-auto mb-3 opacity-30"
              style={{ color: '#FFD700' }}
            />
            <p
              className="text-sm"
              style={{ color: 'rgba(245,240,232,0.4)' }}
            >
              No leads yet. They&apos;ll appear here once visitors submit the contact form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ background: '#111111' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,215,0,0.12)' }}>
                  {['Name', 'Phone', 'Email', 'Budget', 'Message', 'Date'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase"
                      style={{ color: 'rgba(255,215,0,0.7)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom:
                        idx < leads.length - 1
                          ? '1px solid rgba(255,215,0,0.06)'
                          : 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background =
                        'rgba(255,215,0,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background =
                        'transparent';
                    }}
                  >
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: '#F5F0E8' }}
                    >
                      {lead.name}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: 'rgba(245,240,232,0.65)' }}
                    >
                      {lead.phone}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: 'rgba(245,240,232,0.65)' }}
                    >
                      {lead.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(255,215,0,0.08)',
                          border: '1px solid rgba(255,215,0,0.2)',
                          color: '#FFD700',
                        }}
                      >
                        {lead.budget}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs max-w-[200px]"
                      style={{ color: 'rgba(245,240,232,0.5)' }}
                    >
                      <span className="line-clamp-2">{lead.message || '\u2014'}</span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs whitespace-nowrap"
                      style={{ color: 'rgba(245,240,232,0.45)' }}
                    >
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
