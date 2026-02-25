import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllProperties, useDeleteProperty } from '../../hooks/useQueries';
import PropertyFormModal from './PropertyFormModal';
import type { Property } from '../../backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PAGE_SIZE = 10;

function formatPrice(price: bigint): string {
  const num = Number(price);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

export default function PropertiesManager() {
  const { data: properties = [], isLoading } = useGetAllProperties();
  const deleteProperty = useDeleteProperty();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return properties;
    return properties.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  }, [properties, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProperty(null);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProperty.mutate(id);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingProperty(null);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const typeLabel = (type: Property['propertyType']) => {
    if (type === 'villa') return 'Villa';
    if (type === 'penthouse') return 'Penthouse';
    if (type === 'land') return 'Land';
    return 'Commercial';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif font-bold text-xl" style={{ color: '#F5F0E8' }}>
            Properties
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
            {properties.length} listing{properties.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #C6A75E 0%, #a8893e 100%)', color: '#111111' }}
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(245,240,232,0.35)' }} />
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded text-sm focus:outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(198,167,94,0.2)',
            color: '#F5F0E8',
          }}
        />
      </div>

      {/* Table */}
      <div
        className="rounded overflow-hidden"
        style={{ border: '1px solid rgba(198,167,94,0.15)', background: 'rgba(255,255,255,0.03)' }}
      >
        {isLoading ? (
          <div className="py-12 text-center" style={{ color: 'rgba(245,240,232,0.35)' }}>
            <p className="text-sm">Loading properties...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="py-12 text-center" style={{ color: 'rgba(245,240,232,0.35)' }}>
            <p className="text-sm">
              {searchQuery ? 'No properties match your search.' : 'No properties yet. Add your first listing!'}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(198,167,94,0.1)' }}>
                {['Name', 'Location', 'Type', 'Price', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'rgba(245,240,232,0.4)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((property, idx) => (
                <tr
                  key={property.id}
                  style={{
                    borderBottom: idx < paginated.length - 1 ? '1px solid rgba(198,167,94,0.06)' : 'none',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(198,167,94,0.03)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: '#F5F0E8', maxWidth: 200 }}>
                    <div className="truncate">{property.name}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.75rem', maxWidth: 180 }}>
                    <div className="truncate">{property.location}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.75rem' }}>
                    {typeLabel(property.propertyType)}
                  </td>
                  <td className="px-4 py-3 font-bold" style={{ color: '#C6A75E', whiteSpace: 'nowrap' }}>
                    {formatPrice(property.price)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="p-1.5 rounded transition-all duration-200"
                        style={{ color: 'rgba(245,240,232,0.5)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#C6A75E'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,232,0.5)'; }}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="p-1.5 rounded transition-all duration-200"
                            style={{ color: 'rgba(245,240,232,0.5)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#DC143C'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,232,0.5)'; }}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent style={{ background: '#111', border: '1px solid rgba(198,167,94,0.2)' }}>
                          <AlertDialogHeader>
                            <AlertDialogTitle style={{ color: '#F5F0E8' }}>Delete Property</AlertDialogTitle>
                            <AlertDialogDescription style={{ color: 'rgba(245,240,232,0.5)' }}>
                              Are you sure you want to delete &quot;{property.name}&quot;? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel style={{ background: 'transparent', border: '1px solid rgba(198,167,94,0.2)', color: 'rgba(245,240,232,0.7)' }}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(property.id)}
                              style={{ background: '#DC143C', color: '#fff' }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="p-1.5 rounded transition-all duration-200 disabled:opacity-30"
              style={{ border: '1px solid rgba(198,167,94,0.2)', color: '#C6A75E' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && typeof arr[i - 1] === 'number' && (p as number) - (arr[i - 1] as number) > 1) {
                  acc.push('...');
                }
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem' }}>…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p as number)}
                    className="w-7 h-7 rounded text-xs font-bold transition-all duration-200"
                    style={{
                      background: p === safePage ? '#C6A75E' : 'transparent',
                      color: p === safePage ? '#111111' : 'rgba(245,240,232,0.5)',
                      border: p === safePage ? 'none' : '1px solid rgba(198,167,94,0.15)',
                    }}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="p-1.5 rounded transition-all duration-200 disabled:opacity-30"
              style={{ border: '1px solid rgba(198,167,94,0.2)', color: '#C6A75E' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <PropertyFormModal
        open={modalOpen}
        onClose={handleModalClose}
        property={editingProperty}
      />
    </div>
  );
}
