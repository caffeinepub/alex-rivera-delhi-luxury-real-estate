import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import {
  useGetAllProperties,
  useDeleteProperty,
} from '../../hooks/useQueries';
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
import { Skeleton } from '@/components/ui/skeleton';

export default function PropertiesManager() {
  const { data: properties, isLoading, error } = useGetAllProperties();
  const deleteProperty = useDeleteProperty();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProperty(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProperty.mutateAsync(id);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="font-serif font-bold text-xl"
            style={{ color: '#F5F0E8' }}
          >
            Properties
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'rgba(245,240,232,0.45)' }}
          >
            {properties?.length ?? 0} listing{(properties?.length ?? 0) !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#0A0A0A',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 16px rgba(255,215,0,0.35)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '';
          }}
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
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
          Failed to load properties. Make sure you are logged in as admin.
        </div>
      )}

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(255,215,0,0.12)' }}
      >
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" style={{ background: '#1a1a1a' }} />
            ))}
          </div>
        ) : !properties || properties.length === 0 ? (
          <div
            className="py-16 text-center"
            style={{ background: '#111111' }}
          >
            <p
              className="text-sm mb-4"
              style={{ color: 'rgba(245,240,232,0.4)' }}
            >
              No properties yet. Add your first listing.
            </p>
            <button
              onClick={handleAdd}
              className="text-sm font-medium px-5 py-2 rounded transition-all duration-300"
              style={{
                border: '1px solid rgba(255,215,0,0.3)',
                color: '#FFD700',
              }}
            >
              + Add Property
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ background: '#111111' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,215,0,0.12)' }}>
                  {['Title', 'Location', 'Price', 'Actions'].map((h) => (
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
                {properties.map((property, idx) => (
                  <tr
                    key={property.id}
                    style={{
                      borderBottom:
                        idx < properties.length - 1
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {property.imageUrl && (
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="w-10 h-10 rounded object-cover shrink-0"
                            style={{ border: '1px solid rgba(255,215,0,0.15)' }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <span
                          className="font-medium line-clamp-1"
                          style={{ color: '#F5F0E8' }}
                        >
                          {property.title}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: 'rgba(245,240,232,0.55)' }}
                    >
                      {property.location}
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-semibold"
                      style={{ color: '#FFD700' }}
                    >
                      {property.price}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="p-1.5 rounded transition-all duration-200"
                          style={{
                            border: '1px solid rgba(255,215,0,0.2)',
                            color: '#FFD700',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              'rgba(255,215,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              'transparent';
                          }}
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="p-1.5 rounded transition-all duration-200"
                              style={{
                                border: '1px solid rgba(220,20,60,0.3)',
                                color: '#DC143C',
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background =
                                  'rgba(220,20,60,0.1)';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background =
                                  'transparent';
                              }}
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent
                            style={{
                              background: '#111111',
                              border: '1px solid rgba(255,215,0,0.2)',
                            }}
                          >
                            <AlertDialogHeader>
                              <AlertDialogTitle style={{ color: '#F5F0E8' }}>
                                Delete Property?
                              </AlertDialogTitle>
                              <AlertDialogDescription
                                style={{ color: 'rgba(245,240,232,0.55)' }}
                              >
                                This will permanently remove &ldquo;{property.title}&rdquo; from your
                                listings. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                style={{
                                  background: 'transparent',
                                  border: '1px solid rgba(255,215,0,0.2)',
                                  color: '#F5F0E8',
                                }}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(property.id)}
                                style={{
                                  background: '#DC143C',
                                  color: '#fff',
                                  border: 'none',
                                }}
                              >
                                {deleteProperty.isPending ? 'Deleting...' : 'Delete'}
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
          </div>
        )}
      </div>

      {/* Modal */}
      <PropertyFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProperty(null);
        }}
        property={editingProperty}
      />
    </div>
  );
}
