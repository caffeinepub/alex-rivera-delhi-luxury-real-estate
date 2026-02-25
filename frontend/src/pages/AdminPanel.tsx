import React, { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Shield, LogOut, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { LocalProperty } from '../types/property';
import { getProperties, deleteProperty } from '../utils/propertyStorage';
import { formatIndianPrice } from '../utils/formatIndianPrice';
import LocalPropertyFormModal from '../components/admin/LocalPropertyFormModal';

export default function AdminPanel() {
  const { identity, login, clear, isLoggingIn, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const [properties, setProperties] = useState<LocalProperty[]>([]);
  const [editingProperty, setEditingProperty] = useState<LocalProperty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const refreshProperties = () => {
    setProperties(getProperties());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshProperties();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleAddNew = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (property: LocalProperty) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteProperty(id);
    refreshProperties();
    setDeleteConfirmId(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
    refreshProperties();
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-light-gray shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-dark mb-2">Admin Access</h1>
          <p className="text-text-muted text-sm mb-8">
            Sign in with Internet Identity to manage properties and listings.
          </p>
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 disabled:opacity-60 bg-navy text-white hover:bg-navy-dark min-h-[52px]"
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              'Login with Internet Identity'
            )}
          </button>
          <p className="text-xs text-text-muted mt-4">
            Secured by Internet Computer's passkey authentication
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-navy border-b border-navy-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-white" />
            <div>
              <span className="font-bold text-white text-base">Admin Panel</span>
              <span className="hidden sm:inline text-xs ml-2 text-blue-200">
                Delhi Luxury Empire
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20">
              {identity.getPrincipal().toString().slice(0, 12)}...
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-red-300/50 text-red-200 hover:bg-red-500/20 transition-colors min-h-[40px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-dark">Properties</h1>
            <p className="text-text-muted text-sm mt-0.5">{properties.length} total listings</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-dark transition-colors min-h-[48px]"
          >
            <Plus size={16} />
            Add Property
          </button>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-xl border border-light-gray shadow-sm overflow-hidden">
          {properties.length === 0 ? (
            <div className="text-center py-16 text-text-muted">
              <p className="text-lg font-medium mb-2">No properties yet</p>
              <p className="text-sm">Click "Add Property" to create your first listing.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-off-white border-b border-light-gray">
                    <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">ID</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">City</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Title</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Price</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide hidden md:table-cell">Location</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Enquiries</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property, idx) => (
                    <tr
                      key={property.id}
                      className={`border-b border-light-gray hover:bg-off-white transition-colors ${idx % 2 === 0 ? '' : 'bg-off-white/50'}`}
                    >
                      <td className="px-4 py-3 text-text-muted font-mono text-xs">#{property.id}</td>
                      <td className="px-4 py-3">
                        <span className="bg-navy/10 text-navy text-xs font-semibold px-2 py-1 rounded-full">
                          {property.city}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-text-dark max-w-[180px] truncate">{property.title}</td>
                      <td className="px-4 py-3 font-bold text-navy text-xs">{formatIndianPrice(property.price)}</td>
                      <td className="px-4 py-3 text-text-muted hidden md:table-cell max-w-[160px] truncate">{property.location}</td>
                      <td className="px-4 py-3 text-text-dark font-medium">{property.enquiryCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/property?id=${property.id}`}
                            className="p-2 text-text-muted hover:text-navy hover:bg-navy/10 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="View"
                          >
                            <Eye size={15} />
                          </a>
                          <button
                            onClick={() => handleEdit(property)}
                            className="p-2 text-text-muted hover:text-navy hover:bg-navy/10 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          {deleteConfirmId === property.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(property.id)}
                                className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2 py-1 text-xs font-semibold border border-light-gray text-text-muted rounded-lg hover:bg-off-white transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(property.id)}
                              className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Property Form Modal */}
      <LocalPropertyFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        property={editingProperty}
      />
    </div>
  );
}
