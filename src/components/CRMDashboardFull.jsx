import { useState } from 'react';
import { LayoutDashboard, Package, FileText, BarChart3, TrendingUp, Search, Bell, Plus, Download, Star, AlertTriangle, DollarSign, Users, Clock, Edit, Trash2, X, Megaphone, Building2, CheckSquare, Briefcase, ArrowUp, Check, Twitter, Linkedin, Facebook, Upload, Award, MoreHorizontal, ShieldCheck, Shield, Zap, FileCheck, CreditCard, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompanyScoreSummary, CompanyProfileTabs } from './SetupWizard';
import { ContractsPortalContent } from './ContractsPortal';
import { DataIntegrationsContent } from './DataIntegrations';
import { FinancingPaymentsContent, INIT_DISB } from './FinancingPayments';

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

const AccessControlContent = ({
  roles,
  setRoles,
  selectedRole,
  setSelectedRole,
  teamMembers,
  setTeamMembers,
  selectedMember,
  setSelectedMember,
  customPermissionsEnabled,
  setCustomPermissionsEnabled,
  accessTab,
  setAccessTab,
  departments,
  onAddDepartment,
  onAddEmployee,
  pendingTasks,
  completedTasks,
  onAddTask,
  onMarkTaskComplete,
}) => {

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

  const handleCreateRole = () => {
    const name = window.prompt('New role name?', 'New Role');
    if (!name) return;
    const newRole = {
      id: Date.now(),
      name,
      color: 'slate',
      permissions: Object.fromEntries(modules.map(m => [m.id, { view: true, edit: false, delete: false, approve: false }])),
    };
    setRoles([...roles, newRole]);
    setSelectedRole(newRole);
  };

  const handleInviteEmployee = () => {
    const name = window.prompt('Invite employee — full name?');
    if (!name) return;
    const email = window.prompt('Email address?', `${name.toLowerCase().replace(/\s+/g, '.')}@buildtech.sa`);
    setTeamMembers([...teamMembers, {
      id: Date.now(),
      name,
      email: email || '',
      roleId: roles[0]?.id,
      status: 'Pending',
      approvalLimit: 0,
    }]);
  };

  return (
    <div>
      {/* Access Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/70 backdrop-blur-md rounded-xl p-1 shadow-sm">
        <button
          onClick={() => setAccessTab('tasks')}
          className={`flex-1 min-w-[45%] sm:min-w-0 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            accessTab === 'tasks'
              ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CheckSquare size={16} />
          Tasks & Goals
        </button>
        <button
          onClick={() => setAccessTab('roles')}
          className={`flex-1 min-w-[45%] sm:min-w-0 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            accessTab === 'roles'
              ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Shield size={16} />
          Role Groups
        </button>
        <button
          onClick={() => setAccessTab('members')}
          className={`flex-1 min-w-[45%] sm:min-w-0 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            accessTab === 'members'
              ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users size={16} />
          Team Members
        </button>
        <button
          onClick={() => setAccessTab('departments')}
          className={`flex-1 min-w-[45%] sm:min-w-0 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            accessTab === 'departments'
              ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building2 size={16} />
          Departments
        </button>
      </div>

      {/* Tasks & Goals Tab */}
      {accessTab === 'tasks' && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="text-lg font-bold text-slate-900">Tasks & Goals</h3>
            <button onClick={onAddTask} className="w-full md:w-auto px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2">
              <Plus size={20} />
              Add New Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-4">Pending {pendingTasks.length === 0 && <span className="text-sm font-normal text-slate-400">(none)</span>}</h4>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-5">
                    <h5 className="text-base font-bold text-slate-900 mb-2">{task.title}</h5>
                    <p className="text-sm text-slate-600 mb-4">{task.desc}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Users className="text-purple-500" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{task.assignee}</p>
                        <p className="text-xs text-slate-500">Assigned to</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Reward</p>
                        <p className="text-lg font-bold text-teal-500">{task.reward.toLocaleString()} SAR</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Due Date</p>
                        <p className="text-sm font-medium text-slate-900">{task.due}</p>
                      </div>
                    </div>
                    <button onClick={() => onMarkTaskComplete(task)} className="w-full py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600">
                      Mark Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 mb-4">Completed {completedTasks.length === 0 && <span className="text-sm font-normal text-slate-400">(none)</span>}</h4>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div key={task.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-5 border-2 border-green-200">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h5 className="text-base font-bold text-slate-900">{task.title}</h5>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="text-green-600" size={18} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{task.desc}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Users className="text-blue-500" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{task.assignee}</p>
                        <p className="text-xs text-slate-500">Completed by</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Reward Paid</p>
                        <p className="text-lg font-bold text-green-600">{task.reward.toLocaleString()} SAR</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">✓ Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Departments Tab */}
      {accessTab === 'departments' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Department Structure</h3>
            <button onClick={onAddDepartment} className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <Plus size={16} />
              Add New Department
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {departments.map((dept, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-slate-900">{dept.name}</h4>
                  <button onClick={() => onAddEmployee(dept.name)} title="Add Employee" className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                    <Plus size={16} className="text-teal-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  {dept.employees.map((emp, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 rounded-full bg-${dept.color}-100 flex items-center justify-center`}>
                        <Users className={`text-${dept.color}-500`} size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{emp.name}</p>
                        <p className="text-xs text-slate-500">{emp.role}</p>
                      </div>
                    </div>
                  ))}
                  {dept.employees.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">No employees yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Groups Tab */}
      {accessTab === 'roles' && (
        <div>
          {!selectedRole ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Role Templates</h3>
                <button onClick={handleCreateRole} className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
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
                        <Edit size={16} className="text-slate-400" />
                      </button>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{role.name}</h4>
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
                  <ArrowUp size={18} className="rotate-[-90deg]" />
                  <span className="font-medium">Back to Roles</span>
                </button>
                <button onClick={() => { alert(`${selectedRole.name} permissions saved.`); setSelectedRole(null); }} className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
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
                    <h3 className="text-2xl font-bold text-slate-900">{selectedRole.name}</h3>
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

      {/* Team Members Tab */}
      {accessTab === 'members' && (
        <div>
          {!selectedMember ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Team Members</h3>
                <button onClick={handleInviteEmployee} className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
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
                                <Edit size={16} className="text-slate-600" />
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
                  <ArrowUp size={18} className="rotate-[-90deg]" />
                  <span className="font-medium">Back to Team</span>
                </button>
                <button onClick={() => { alert(`${selectedMember.name} updated.`); setSelectedMember(null); setCustomPermissionsEnabled(false); }} className="px-4 py-2 bg-gradient-to-r from-[#56afb6] to-teal-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                  <Check size={16} />
                  Save Changes
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Edit Team Member</h3>
                  
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
  );
};

export const CRMDashboardFull = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [roles, setRoles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [customPermissionsEnabled, setCustomPermissionsEnabled] = useState(false);
  const [teamAccessTab, setTeamAccessTab] = useState('roles');
  const [poFilter, setPoFilter] = useState('All');
  const [showNotifications, setShowNotifications] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', stock: '', minStock: '', price: '' });

  const [products, setProducts] = useState([
    { id: 1, name: 'Heavy Duty Excavator', category: 'Heavy Machinery', stock: 8, minStock: 5, price: 450000, image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=100' },
    { id: 2, name: 'Steel Reinforcement Bars', category: 'Building Materials', stock: 2, minStock: 10, price: 850, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100' },
    { id: 3, name: 'Industrial Concrete Mixer', category: 'Heavy Machinery', stock: 15, minStock: 5, price: 125000, image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=100' },
    { id: 4, name: 'Safety Helmets (Box of 50)', category: 'Safety Equipment', stock: 3, minStock: 20, price: 1200, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100' },
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 'PO-2024-001', supplier: 'Global Materials Supply', product: 'Steel Reinforcement Bars', amount: 22500, due: 'Dec 15', status: 'Completed', rating: 4.5 },
    { id: 'PO-2024-002', supplier: 'BuildTech Construction', product: 'Concrete Mix', amount: 18000, due: 'Dec 20', status: 'Pending', rating: 4.7 },
    { id: 'PO-2024-003', supplier: 'Heavy Equipment Co.', product: 'Excavator Parts', amount: 45000, due: 'Dec 10', status: 'Completed', rating: 4.8 },
  ]);

  const [payments, setPayments] = useState([
    { id: 'INST-01', amount: 150000, dueDate: 'Sep 15, 2026', status: 'Paid', paidDate: 'Sep 14, 2026' },
    { id: 'INST-02', amount: 150000, dueDate: 'Oct 15, 2026', status: 'Paid', paidDate: 'Oct 15, 2026' },
    { id: 'INST-03', amount: 150000, dueDate: 'Nov 15, 2026', status: 'Paid', paidDate: 'Nov 13, 2026' },
    { id: 'INST-04', amount: 150000, dueDate: 'Dec 15, 2026', status: 'Upcoming' },
    { id: 'INST-05', amount: 150000, dueDate: 'Jan 15, 2027', status: 'Upcoming' },
    { id: 'INST-06', amount: 150000, dueDate: 'Feb 15, 2027', status: 'Upcoming' },
  ]);
  const [disb, setDisb] = useState(INIT_DISB);

  const [departments, setDepartments] = useState([
    { name: 'Executive Management', employees: [{ name: 'محمد العمري', role: 'CEO' }], color: 'teal' },
    { name: 'Finance & Accounting', employees: [{ name: 'عبدالله السعد', role: 'CFO' }], color: 'blue' },
    { name: 'Human Resources', employees: [{ name: 'فاطمة الأحمد', role: 'HR Manager' }], color: 'purple' },
    { name: 'Marketing', employees: [], color: 'pink' },
    { name: 'Sales', employees: [{ name: 'سارة المحمد', role: 'Sales Lead' }], color: 'orange' },
    { name: 'Operations', employees: [], color: 'green' },
  ]);

  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, title: 'Increase Monthly Sales', desc: 'Achieve sales target of 50,000 SAR', assignee: 'فاطمة الأحمد', reward: 2000, due: '2026-12-31' },
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: 2, title: 'Improve Customer Service', desc: 'Respond within 24hrs', assignee: 'عمر الزهراني', reward: 1500 },
  ]);

  const [purchasedPackage, setPurchasedPackage] = useState(null);

  const notifications = [
    { text: 'Low stock alert: Safety Helmets', time: '5 hours ago' },
    { text: 'PO-2024-001 marked as completed', time: '2 hours ago' },
    { text: 'New RFQ received from Al-Noor Trading', time: '1 day ago' },
  ];

  const handleAddProduct = () => {
    if (!newProduct.name) return;
    setProducts([...products, {
      id: Date.now(),
      name: newProduct.name,
      category: 'Uncategorized',
      stock: Number(newProduct.stock) || 0,
      minStock: Number(newProduct.minStock) || 0,
      price: Number(newProduct.price) || 0,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100',
    }]);
    setNewProduct({ name: '', description: '', stock: '', minStock: '', price: '' });
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handlePayInstallment = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'Paid', paidDate: 'Today' } : p));
  };

  const handleToggleDisb = (di, ri) =>
    setDisb(prev => prev.map((d, i) =>
      i === di ? { ...d, reqs: d.reqs.map((r, j) => j === ri ? { ...r, done: !r.done } : r) } : d
    ));

  const handleMarkTaskComplete = (task) => {
    setPendingTasks(pendingTasks.filter(t => t.id !== task.id));
    setCompletedTasks([{ ...task }, ...completedTasks]);
  };

  const handleAddTask = () => {
    setPendingTasks([{ id: Date.now(), title: 'New Task', desc: 'Describe the goal for this task', assignee: 'Unassigned', reward: 0, due: '—' }, ...pendingTasks]);
  };

  const handleAddDepartment = () => {
    const name = window.prompt('New department name?', 'New Department');
    if (!name) return;
    setDepartments([...departments, { name, employees: [], color: 'slate' }]);
  };

  const handleAddEmployee = (deptName) => {
    const name = window.prompt(`Add employee to ${deptName}:`, '');
    if (!name) return;
    setDepartments(departments.map(d => d.name === deptName ? { ...d, employees: [...d.employees, { name, role: 'Team Member' }] } : d));
  };

  const mockSuppliers = [
    { name: 'Global Materials Supply', deliveryTime: 2.8, rating: 4.7, orders: 67 },
    { name: 'BuildTech Construction', deliveryTime: 3.2, rating: 4.5, orders: 45 },
    { name: 'Heavy Equipment Co.', deliveryTime: 2.5, rating: 4.8, orders: 52 },
  ];

  const allTabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Overview' },
    { id: 'products', icon: Package, label: 'My Products' },
    { id: 'orders', icon: FileText, label: 'Purchase Orders' },
    { id: 'analytics', icon: DollarSign, label: 'Financing Eligibility' },
    { id: 'torbiona', icon: CreditCard, label: 'Fund Disbursements' },
    { id: 'suppliers', icon: Users, label: 'Supplier Performance' },
    { id: 'market', icon: TrendingUp, label: 'Market Analytics' },
    { id: 'advertising', icon: Megaphone, label: 'Advertising Packages' },
    { id: 'departments', icon: Building2, label: 'Department Management' },
    { id: 'tasks', icon: CheckSquare, label: 'Workspace & Team' },
    { id: 'company', icon: Briefcase, label: 'Company Page Editor' },
    { id: 'data-integrations', icon: Zap, label: 'Data & Integrations' },
    { id: 'access-control', icon: ShieldCheck, label: 'Team & Access' },
    { id: 'contracts-portal', icon: FileCheck, label: 'Digital Contracts' },
  ];

  const handleNavClick = (item) => {
    if (item.id === 'departments') {
      setActiveTab('departments');
      setTeamAccessTab('departments');
    } else if (item.id === 'access-control') {
      setActiveTab('access-control');
      setTeamAccessTab('roles');
    } else if (item.id === 'tasks') {
      setActiveTab('tasks');
      setTeamAccessTab('tasks');
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white/90 backdrop-blur shadow-sm fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 
            onClick={() => setCurrentView('b2b-platform')}
            className="text-2xl font-bold text-teal-500 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Mezzanine
          </h1>
          <p className="text-xs text-slate-500 mt-1">Admin - BuildTech</p>
        </div>
        <nav className="p-4">
          {allTabs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all ${
                  activeTab === item.id ? 'bg-teal-500 text-white' : 'text-slate-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 w-full">
        {/* Mobile Top Header */}
        <div className="md:hidden bg-white shadow-sm sticky top-0 z-40 px-4 py-3 border-b">
          <h1 
            onClick={() => setCurrentView('b2b-platform')}
            className="text-xl font-bold text-teal-500 cursor-pointer"
          >
            Mezzanine
          </h1>
          <p className="text-xs text-slate-500">Admin - BuildTech</p>
        </div>

        {/* Desktop Top Header */}
        <div className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-40">
          <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-2">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={18} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 max-w-[calc(100vw-1rem)] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 font-bold text-sm text-slate-900">Notifications</div>
                  {notifications.map((n, idx) => (
                    <div key={idx} className="p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <p className="text-sm text-slate-800">{n.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => { setActiveTab('products'); setShowProductModal(true); }}
                className="hidden md:flex px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 items-center gap-2"
              >
                <Plus size={16} />
                Quick Actions
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          {/* Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Dashboard Overview</h2>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {[
                  { label: 'Total Revenue', value: '$892K', trend: '+15%', icon: DollarSign, color: 'teal' },
                  { label: 'Active Purchase Orders', value: '12', trend: '+3', icon: FileText, color: 'blue' },
                  { label: 'Total Products', value: '45', trend: '+8', icon: Package, color: 'purple' },
                  { label: 'Low Stock Alerts', value: '2', trend: 'Critical', icon: AlertTriangle, color: 'red' },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                      <div className={`w-12 h-12 rounded-xl bg-${kpi.color}-100 flex items-center justify-center mb-4`}>
                        <Icon className={`text-${kpi.color}-500`} size={24} />
                      </div>
                      <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
                      <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                      <p className={`text-sm mt-2 ${kpi.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>{kpi.trend}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  { label: 'Add New Product', onClick: () => { setActiveTab('products'); setShowProductModal(true); } },
                  { label: 'Add Employee', onClick: () => { setActiveTab('departments'); setTeamAccessTab('departments'); } },
                  { label: 'Browse Marketplace', onClick: () => setCurrentView('b2b-platform') },
                ].map((action) => (
                  <button key={action.label} onClick={action.onClick} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 hover:shadow-md transition-all text-left">
                    <Plus className="text-teal-500 mb-3" size={24} />
                    <p className="font-medium text-slate-900">{action.label}</p>
                  </button>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { text: 'PO-2024-001 completed - Steel Reinforcement Bars', time: '2 hours ago' },
                    { text: 'Low stock alert: Safety Helmets', time: '5 hours ago', alert: true },
                    { text: 'New supplier added: Heavy Equipment Co.', time: '1 day ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activity.alert ? 'bg-red-500' : 'bg-teal-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{activity.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Products */}
          {activeTab === 'products' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">My Products</h2>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="w-full md:w-auto px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add New Product
                </button>
              </div>

              <div className="w-full overflow-x-auto bg-white/90 backdrop-blur rounded-2xl shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Product</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Category</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Stock</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Price</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-slate-900 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover" />
                            <span className="font-medium text-slate-900 text-xs md:text-sm">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-slate-600 text-xs md:text-sm whitespace-nowrap">{product.category}</td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 text-xs md:text-sm">{product.stock}</span>
                            {product.stock < product.minStock && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full whitespace-nowrap">Low</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 font-medium text-slate-900 text-xs md:text-sm whitespace-nowrap">${product.price.toLocaleString()}</td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex gap-1 md:gap-2">
                            <button onClick={() => setShowProductModal(true)} className="p-2 hover:bg-gray-100 rounded-lg"><Edit size={14} className="text-slate-600" /></button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Purchase Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Purchase Orders</h2>
              
              <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto hide-scrollbar">
                {['All', 'Pending', 'Completed'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setPoFilter(filter)}
                    className={`px-3 md:px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${poFilter === filter ? 'bg-teal-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-teal-50'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {purchaseOrders.filter(po => poFilter === 'All' || po.status === poFilter).map((po) => (
                  <div key={po.id} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{po.id}</h3>
                        <p className="text-sm text-slate-500">Supplier: {po.supplier}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${po.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {po.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Product</p>
                        <p className="font-medium text-slate-900 text-sm">{po.product}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Amount</p>
                        <p className="font-medium text-slate-900 text-sm">${po.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Due Date</p>
                        <p className="font-medium text-slate-900 text-sm">{po.due}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Rating</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < Math.floor(po.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                          ))}
                          <span className="text-sm text-slate-900 ml-1">{po.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button onClick={() => alert(`Downloading ${po.id}.pdf...`)} className="flex items-center gap-2 text-teal-500 hover:text-teal-600 font-medium">
                        <Download size={16} />
                        Download PDF
                      </button>
                      {po.status === 'Pending' && (
                        <button
                          onClick={() => setPurchaseOrders(purchaseOrders.map(o => o.id === po.id ? { ...o, status: 'Completed' } : o))}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supplier Performance */}
          {activeTab === 'suppliers' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Supplier Performance</h2>
              
              <div className="space-y-4">
                {mockSuppliers.map((supplier, idx) => (
                  <div key={idx} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">{supplier.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Avg Delivery Time</p>
                        <p className="text-2xl font-bold text-slate-900 mb-2">{supplier.deliveryTime} Days</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${100 - supplier.deliveryTime * 10}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Quality Rating</p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-2xl font-bold text-slate-900">{supplier.rating}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className={i < Math.floor(supplier.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Orders Completed</p>
                        <p className="text-2xl font-bold text-slate-900">{supplier.orders}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Analytics */}
          {activeTab === 'market' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Market Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Supply</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Available Products</p>
                        <p className="text-4xl font-bold text-slate-900">1,247</p>
                      </div>
                      <ArrowUp className="text-green-500" size={32} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Active Suppliers</p>
                        <p className="text-4xl font-bold text-slate-900">89</p>
                      </div>
                      <ArrowUp className="text-green-500" size={32} />
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Demand</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Purchase Orders</p>
                        <p className="text-4xl font-bold text-slate-900">342</p>
                      </div>
                      <TrendingUp className="text-teal-500" size={32} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Active Buyers</p>
                        <p className="text-4xl font-bold text-slate-900">156</p>
                      </div>
                      <TrendingUp className="text-teal-500" size={32} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                      <FileText className="text-teal-500" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Monthly Market Report</h3>
                      <p className="text-sm text-slate-500">Comprehensive market trends analysis</p>
                    </div>
                  </div>
                  <button onClick={() => alert('Downloading Monthly_Market_Report.pdf...')} className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Report
                  </button>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Megaphone className="text-purple-500" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Promotional Ad</h3>
                      <p className="text-sm text-slate-500">Marketing campaign materials</p>
                    </div>
                  </div>
                  <button onClick={() => alert('Downloading Promotional_Ad_Assets.zip...')} className="w-full py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50 flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Assets
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Financing Status */}
          {activeTab === 'analytics' && (
            <div>
              <div className="flex items-baseline justify-between mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Financing Eligibility</h2>
                <p className="text-sm text-slate-400">أحقية التمويل</p>
              </div>

              <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 size={18} className="flex-shrink-0" />
                  <span className="text-sm font-semibold">Mezzanine Facility — BuildTech Construction</span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                  <div>
                    <p className="text-[11px] sm:text-xs text-white/70 mb-1">Approved</p>
                    <p className="text-base sm:text-xl md:text-2xl font-bold leading-tight">850,000<span className="block sm:inline text-[10px] sm:text-xs text-white/70"> SAR</span></p>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-white/70 mb-1">Disbursed</p>
                    <p className="text-base sm:text-xl md:text-2xl font-bold leading-tight">500,000<span className="block sm:inline text-[10px] sm:text-xs text-white/70"> SAR</span></p>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-white/70 mb-1">Remaining</p>
                    <p className="text-base sm:text-xl md:text-2xl font-bold leading-tight">350,000<span className="block sm:inline text-[10px] sm:text-xs text-white/70"> SAR</span></p>
                  </div>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '59%' }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Next Payment</p>
                    <p className="text-sm font-bold text-slate-900">Pending — proof of receipt required</p>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Risk Status</p>
                    <p className="text-sm font-bold text-slate-900">Stable</p>
                  </div>
                </div>
              </div>

              {/* Company Profile Score */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
                <CompanyScoreSummary />
              </div>

              {/* Enhance Your Score */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
                <CompanyProfileTabs />
              </div>
            </div>
          )}

          {/* Fund Disbursements */}
          {activeTab === 'torbiona' && (
            <FinancingPaymentsContent
              payments={payments}
              onPay={handlePayInstallment}
              disb={disb}
              onToggleDisb={handleToggleDisb}
            />
          )}

          {/* Advertising Packages */}
          {activeTab === 'advertising' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Advertising Packages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Daily Priority</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">100</span>
                    <span className="text-xl text-slate-500 ml-2">SAR</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">First appearance for 1 day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Advertising image in interface</span>
                    </li>
                  </ul>
                  {purchasedPackage === 'Daily Priority' ? (
                    <button disabled className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-medium flex items-center justify-center gap-2">
                      <Check size={18} /> Active
                    </button>
                  ) : (
                    <button onClick={() => setPurchasedPackage('Daily Priority')} className="w-full py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                      Purchase Package
                    </button>
                  )}
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6 border-2 border-teal-500 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">Most Popular</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Weekly Priority</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">1,000</span>
                    <span className="text-xl text-slate-500 ml-2">SAR</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">First appearance for 1 week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">2 featured products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Ad image in interface</span>
                    </li>
                  </ul>
                  {purchasedPackage === 'Weekly Priority' ? (
                    <button disabled className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-medium flex items-center justify-center gap-2">
                      <Check size={18} /> Active
                    </button>
                  ) : (
                    <button onClick={() => setPurchasedPackage('Weekly Priority')} className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                      Purchase Package
                    </button>
                  )}
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-6">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Premium</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Monthly Priority</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">10,000</span>
                    <span className="text-xl text-slate-500 ml-2">SAR</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">1 full month visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">2 featured products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Large ad image</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-teal-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-slate-600">Detailed analytics</span>
                    </li>
                  </ul>
                  {purchasedPackage === 'Monthly Priority' ? (
                    <button disabled className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-medium flex items-center justify-center gap-2">
                      <Check size={18} /> Active
                    </button>
                  ) : (
                    <button onClick={() => setPurchasedPackage('Monthly Priority')} className="w-full py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                      Purchase Package
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Company Page Management */}
          {activeTab === 'company' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8 sticky top-16 md:top-20 bg-cream py-4 z-30">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Company Page Management</h2>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <button onClick={() => setCurrentView('company-profile')} className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                    Preview Public Page
                  </button>
                  <button onClick={() => alert('Company page changes saved!')} className="px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Branding */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Branding</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-all cursor-pointer">
                        <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600">Click to upload logo</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cover Photo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-all cursor-pointer">
                        <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600">Click to upload cover</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">About</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                      <input type="text" placeholder="BuildTech Construction" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
                      <input type="number" placeholder="15" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Who We Are</label>
                      <textarea rows="4" placeholder="Tell your story..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"></textarea>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input type="tel" placeholder="+966 50 123 4567" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input type="email" placeholder="info@buildtech.sa" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Physical Address</label>
                      <input type="text" placeholder="Riyadh, Saudi Arabia" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Social Media</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Twitter className="text-blue-500" size={20} />
                      </div>
                      <input type="text" placeholder="@buildtech" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Linkedin className="text-blue-700" size={20} />
                      </div>
                      <input type="text" placeholder="company/buildtech" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Facebook className="text-blue-600" size={20} />
                      </div>
                      <input type="text" placeholder="buildtech.sa" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Certifications & Awards</h3>
                    <button className="flex items-center gap-2 text-teal-500 hover:text-teal-600 font-medium">
                      <Plus size={18} />
                      Add Certificate
                    </button>
                  </div>
                  <div className="space-y-3">
                    {['ISO 9001:2015 Certified', 'Best Construction Company 2023'].map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Award className="text-teal-500" size={20} />
                        <span className="flex-1 text-sm text-slate-900">{cert}</span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-16 md:bottom-0 bg-cream py-4 mt-8 flex flex-col md:flex-row justify-end gap-3">
                <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-medium hover:bg-teal-50">
                  Preview Public Page
                </button>
                <button className="px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Team, Access & Workspace (also covers Department Management + Workspace & Team) */}
          {(activeTab === 'access-control' || activeTab === 'departments' || activeTab === 'tasks') && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">
                {teamAccessTab === 'tasks' ? 'Workspace & Team' : 'Team & Access'}
              </h2>
              <AccessControlContent
                roles={roles}
                setRoles={setRoles}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers}
                selectedMember={selectedMember}
                setSelectedMember={setSelectedMember}
                customPermissionsEnabled={customPermissionsEnabled}
                setCustomPermissionsEnabled={setCustomPermissionsEnabled}
                accessTab={teamAccessTab}
                setAccessTab={setTeamAccessTab}
                departments={departments}
                onAddDepartment={handleAddDepartment}
                onAddEmployee={handleAddEmployee}
                pendingTasks={pendingTasks}
                completedTasks={completedTasks}
                onAddTask={handleAddTask}
                onMarkTaskComplete={handleMarkTaskComplete}
              />
            </div>
          )}

          {/* Digital Contracts */}
          {activeTab === 'contracts-portal' && <ContractsPortalContent />}

          {/* Data & Integrations */}
          {activeTab === 'data-integrations' && <DataIntegrationsContent />}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
        <div className="grid grid-cols-5 gap-0 px-1 py-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
            { id: 'products',  icon: Package,         label: 'Products' },
            { id: 'orders',    icon: FileText,         label: 'Orders' },
            { id: 'torbiona',  icon: CreditCard,       label: 'Funds' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2.5 rounded-lg transition-all min-h-[52px] ${
                  activeTab === item.id ? 'text-teal-500' : 'text-slate-500'
                }`}
              >
                <Icon size={19} />
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center py-2.5 rounded-lg min-h-[52px] ${showMoreMenu ? 'text-teal-500' : 'text-slate-500'}`}
          >
            <MoreHorizontal size={19} />
            <span className="text-[10px] mt-0.5 font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Mobile More Menu */}
      {showMoreMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowMoreMenu(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">More Options</h3>
              <button onClick={() => setShowMoreMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {allTabs.filter(t => !['dashboard', 'products', 'orders', 'analytics'].includes(t.id)).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { handleNavClick(item); setShowMoreMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id ? 'bg-teal-500 text-white' : 'text-slate-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 md:p-6 border-b md:border-0 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">Add New Product</h3>
                <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <input type="text" placeholder="Product Title" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
              <textarea placeholder="Description" rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none"></textarea>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" placeholder="Quantity" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
                <input type="number" placeholder="Min Quantity" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
              </div>
              <input type="number" placeholder="Price" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" />
              <button className="w-full py-3 min-h-[48px] bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
