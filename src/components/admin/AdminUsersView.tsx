import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { User } from '../../types';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Shield,
  Eye,
  Trash2,
  X,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export const AdminUsersView: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>(storageService.getUsers());
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [viewUserModal, setViewUserModal] = useState<User | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.headline && u.headline.toLowerCase().includes(search.toLowerCase()));

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && u.isActive) ||
      (statusFilter === 'Inactive' && !u.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (userId: string) => {
    const updated = storageService.toggleUserStatus(userId);
    if (updated) {
      setUsers(storageService.getUsers());
      showToast(`User account status set to ${updated.isActive ? 'Active' : 'Deactivated'}.`, 'info');
    }
  };

  const handleDeleteUser = () => {
    if (!deleteConfirmUser) return;
    const remaining = users.filter(u => u.id !== deleteConfirmUser.id);
    localStorage.setItem('karyaai_users', JSON.stringify(remaining));
    setUsers(remaining);
    showToast(`User ${deleteConfirmUser.name} has been removed.`, 'success');
    setDeleteConfirmUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Access & Directory</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Audit registered learner accounts, manage permissions, and review profile completion velocity.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-700 bg-stone-100 px-4 py-2 rounded-2xl">
          Total Directory: <strong>{users.length} Accounts</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or headline..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-orange-500 bg-stone-50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-slate-700"
          >
            <option value="All">All Roles</option>
            <option value="user">General User</option>
            <option value="admin">Administrator</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Deactivated</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">User / Identity</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Profile Strength</th>
                <th className="py-3.5 px-4">Readiness</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{u.name}</span>
                        <span className="text-[11px] text-slate-400">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-stone-100 text-slate-700'
                    }`}>
                      {u.role === 'admin' ? 'Administrator' : 'General User'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full"
                          style={{ width: `${u.profileCompletion}%` }}
                        />
                      </div>
                      <span>{u.profileCompletion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {u.careerReadinessScore}%
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {u.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {u.createdAt}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewUserModal(u)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-stone-100"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-stone-100 hover:bg-stone-200 text-slate-700"
                      >
                        {u.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => setDeleteConfirmUser(u)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Modal */}
      {viewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            <div className="p-6 bg-[#0F1E36] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewUserModal.avatarUrl}
                  alt={viewUserModal.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500"
                />
                <div>
                  <h3 className="font-bold text-lg text-white">{viewUserModal.name}</h3>
                  <span className="text-xs text-orange-400">{viewUserModal.email} • {viewUserModal.role}</span>
                </div>
              </div>
              <button onClick={() => setViewUserModal(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Headline</span>
                <p className="text-slate-800 text-sm">{viewUserModal.headline || 'None set'}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Education</span>
                <p className="text-slate-800">{viewUserModal.education || 'Not filled'}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Acquired Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {viewUserModal.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Career Goal</span>
                <p className="text-slate-700">{viewUserModal.careerGoals || 'Not specified'}</p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setViewUserModal(null)}
                className="px-5 py-2 rounded-full font-bold text-xs bg-slate-900 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Delete User Account?</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete <strong>{deleteConfirmUser.name}</strong> ({deleteConfirmUser.email})? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
