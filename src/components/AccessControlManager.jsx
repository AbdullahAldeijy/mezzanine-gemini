import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Users, Shield, Plus, Edit2, X, Mail, DollarSign, Check } from 'lucide-react';

const modules = [
  { id: 'orders', name: 'Orders' },
  { id: 'financing', name: 'Financing RFQs' },
  { id: 'catalog', name: 'Product Catalog' },
  { id: 'billing', name: 'Billing' },
  { id: 'team', name: 'Team Management' },
];

const defaultRoles = [
  {
    id: 1,
    name: 'Finance Admin',
    color: 'emerald',
    permissions: {
      orders: { view: true, edit: true, delete: false, approve: true },
      financing: { view: true, edit: true, delete: false, approve: true },
      catalog: { view: true, edit: false, delete: false, approve: false },
      billing: { view: true, edit: true, delete: true, approve: true },
      team: { view: true, edit: false, delete: false, approve: false },
    },
  },
  {
    id: 2,
    name: 'Procurement Officer',
    color: 'blue',
    permissions: {
      orders: { view: true, edit: true, delete: false, approve: false },
      financing: { view: true, edit: true, delete: false, approve: false },
      catalog: { view: true, edit: true, delete: false, approve: false },
      billing: { view: true, edit: false, delete: false, approve: false },
      team: { view: false, edit: false, delete: false, approve: false },
    },
  },
  {
    id: 3,
    name: 'Sales Rep',
    color: 'purple',
    permissions: {
      orders: { view: true, edit: true, delete: false, approve: false },
      financing: { view: true, edit: false, delete: false, approve: false },
      catalog: { view: true, edit: false, delete: false, approve: false },
      billing: { view: true, edit: false, delete: false, approve: false },
      team: { view: false, edit: false, delete: false, approve: false },
    },
  },
];

const mockTeamMembers = [
  { id: 1, name: 'Ahmed Al-Rashid', email: 'ahmed@buildtech.sa', roleId: 1, status: 'Active', approvalLimit: 500000 },
  { id: 2, name: 'Fatima Hassan', email: 'fatima@buildtech.sa', roleId: 2, status: 'Active', approvalLimit: 100000 },
  { id: 3, name: 'Mohammed Ali', email: 'mohammed@buildtech.sa', roleId: 3, status: 'Active', approvalLimit: 50000 },
  { id: 4, name: 'Sara Abdullah', email: 'sara@buildtech.sa', roleId: 2, status: 'Pending', approvalLimit: 75000 },
];

const PermissionMatrix = ({ permissions, onChange, readOnly = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="bg-slate-100 border-b-2 border-slate-200">
            <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Module</th>
            <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">View</th>
            <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Edit</th>
            <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Delete</th>
            <th className="text-center p-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Approve</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-3 text-sm font-medium text-slate-900">{module.name}</td>
              {['view', 'edit', 'delete', 'approve'].map((action) => (
                <td key={action} className="p-3 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions[module.id]?.[action] || false}
                      onChange={(e) => !readOnly && onChange(module.id, action, e.target.checked)}
                      disabled={readOnly}
                      className="sr-only peer"
                    />
                    <div className={`relative w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      !readOnly ? 'peer-checked:bg-[#56afb6]' : 'peer-checked:bg-slate-400'
                    }`}></div>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const AccessControlManager = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('roles');
  const [roles, setRoles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [customPermissionsEnabled, setCustomPermissionsEnabled] = useState(false);

  const handlePermissionChange = (moduleId, action, value) => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [moduleId]: {
                  ...role.permissions[moduleId],
                  [action]: value
                }
              }
            }
          : role
      ));
      setSelectedRole({
        ...selectedRole,
        permissions: {
          ...selectedRole.permissions,
          [moduleId]: {
            ...selectedRole.permissions[moduleId],
            [action]: value
          }
        }
      });
    }
  };

  const getRoleById = (roleId) => roles.find(r => r.id === roleId);

  return (
    <div className="min-h-screen bg-[#f7f4e8]">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('b2b-platform')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 flex items-center justify-center">
                <Shield size={20} className="text-[#56afb6]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">Team & Access Management</h1>
                <p className="text-xs text-slate-500">Role-Based Access Control (RBAC)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/70 backdrop-blur-md rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'roles'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield size={16} />
            Role Groups
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'members'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users size={16} />
            Team Members
          </button>
        </div>

        {/* Tab 1: Role Groups */}
        {activeTab === 'roles' && (
          <div>
            {!selectedRole ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Role Templates</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                    <Plus size={16} />
                    Create New Role
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role)}
                      className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-[#56afb6]/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-${role.color}-100 flex items-center justify-center`}>
                          <Shield size={24} className={`text-${role.color}-600`} />
                        </div>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                          <Edit2 size={16} className="text-slate-400" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{role.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(role.permissions).filter(([_, perms]) => 
                          Object.values(perms).some(v => v)
                        ).slice(0, 3).map(([module]) => (
                          <span key={module} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                            {modules.find(m => m.id === module)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#56afb6] transition-all"
                  >
                    <ArrowLeft size={18} />
                    <span className="font-medium">Back to Roles</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                    <Check size={16} />
                    Save Changes
                  </button>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-${selectedRole.color}-100 flex items-center justify-center`}>
                      <Shield size={24} className={`text-${selectedRole.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedRole.name}</h2>
                      <p className="text-sm text-slate-500">Permission Matrix</p>
                    </div>
                  </div>

                  <PermissionMatrix
                    permissions={selectedRole.permissions}
                    onChange={handlePermissionChange}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Team Members */}
        {activeTab === 'members' && (
          <div>
            {!selectedMember ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Team Members</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                    <Plus size={16} />
                    Invite Employee
                  </button>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-slate-50 border-b-2 border-slate-200">
                        <tr>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Email</th>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Role</th>
                          <th className="text-left p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                          <th className="text-center p-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member) => {
                          const role = getRoleById(member.roleId);
                          return (
                            <tr key={member.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="p-4 text-sm font-medium text-slate-900">{member.name}</td>
                              <td className="p-4 text-sm text-slate-600">{member.email}</td>
                              <td className="p-4">
                                <span className={`px-3 py-1 bg-${role?.color}-100 text-${role?.color}-700 text-xs font-semibold rounded-full`}>
                                  {role?.name}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                  member.status === 'Active'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {member.status}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => setSelectedMember(member)}
                                  className="p-2 hover:bg-slate-100 rounded-lg transition-all"
                                >
                                  <Edit2 size={16} className="text-slate-600" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => {
                      setSelectedMember(null);
                      setCustomPermissionsEnabled(false);
                    }}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#56afb6] transition-all"
                  >
                    <ArrowLeft size={18} />
                    <span className="font-medium">Back to Team</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                    <Check size={16} />
                    Save Changes
                  </button>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Edit Team Member</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={selectedMember.name}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={selectedMember.email}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Role Group</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none">
                        {roles.map(role => (
                          <option key={role.id} value={role.id} selected={role.id === selectedMember.roleId}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Approval Limit (SAR)</label>
                      <div className="relative">
                        <DollarSign size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          value={selectedMember.approvalLimit}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Maximum amount this user can approve without escalation</p>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Enable Custom Individual Permissions</p>
                          <p className="text-xs text-slate-500">Override role group permissions for this user</p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customPermissionsEnabled}
                            onChange={(e) => setCustomPermissionsEnabled(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#56afb6]"></div>
                        </label>
                      </div>

                      {customPermissionsEnabled && (
                        <div className="mt-4">
                          <PermissionMatrix
                            permissions={getRoleById(selectedMember.roleId)?.permissions || {}}
                            onChange={() => {}}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
