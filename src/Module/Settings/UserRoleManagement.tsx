import React, { useState } from 'react';
import EditUserOverlay from '../../components/settings/EditUserOverlay';
import CreateUserOverlay from '../../components/settings/CreateUserOverlay';
import CreateRoleOverlay from '../../components/settings/CreateRoleOverlay';

const UserRoleManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('User Management');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const tabs = [
    { name: 'User Management', icon: 'person' },
    { name: 'Roles and Permissions', icon: 'shield_person' },
    { name: 'Team Management', icon: 'groups' }
  ];

  const [usersData, setUsersData] = useState([
    { id: 1, name: 'Arjun Deshmukh', username: '@arjundeshmukh', email: 'a.deshmukh@reliance.com', contact: '+91 8787876765', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Vipul Patil', username: '@vipul', email: 'vipul@enttlevo.com', contact: '+91 9876543210', role: 'Sales Manager', status: 'Active' },
    { id: 3, name: 'Rahul Sharma', username: '@rahul', email: 'rahul@enttlevo.com', contact: '+91 9876543211', role: 'Account Manager', status: 'Inactive' },
    { id: 4, name: 'Meghna Singh', username: '@meghna', email: 'meghna@enttlevo.com', contact: '+91 9876543212', role: 'Support Rep', status: 'Active' },
    { id: 5, name: 'Siddharth Malhotra', username: '@sid_m', email: 's.malhotra@tcs.com', contact: '+91 8888877777', role: 'Sales Manager', status: 'Active' },
    { id: 6, name: 'Ananya Iyer', username: '@ananya', email: 'a.iyer@google.com', contact: '+91 9999900000', role: 'Account Manager', status: 'Active' },
    { id: 7, name: 'Vikram Singh', username: '@vikram', email: 'v.singh@zapp.org', contact: '+44 7700 900345', role: 'Support Rep', status: 'Inactive' },
    { id: 8, name: 'Kavita Reddy', username: '@kavita', email: 'k.reddy@mirrat.com', contact: '+91 91234 56789', role: 'Sales Rep', status: 'Active' },
  ]);

  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [isCreateOverlayOpen, setIsCreateOverlayOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<{ id: number; name: string; role: string } | null>(null);
  const [editingRole, setEditingRole] = useState<any>(null);

  const handleEditClick = (user: any) => {
    setEditingUser({ id: user.id, name: user.name, role: user.role });
    setIsEditOverlayOpen(true);
  };

  const handleSaveRole = (userId: number, newRole: string) => {
    setUsersData(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setIsEditOverlayOpen(false);
    setToastMessage('User role updated successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeletePermission = (roleId: number, permName: string) => {
    setRoles(prev => prev.map(r =>
      r.id === roleId ? { ...r, permissions: r.permissions.filter(p => p !== permName) } : r
    ));
    setToastMessage(`Permission "${permName}" removed successfully! Switched to custom.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreateRole = (roleData: any) => {
    if (editingRole) {
      setRoles(prev => prev.map(r => r.id === editingRole.id ? roleData : r));
      setToastMessage(`Role "${roleData.name}" updated successfully!`);
    } else {
      const newRole = {
        ...roleData,
        id: Date.now(),
        status: 'Custom'
      };
      setRoles(prev => [...prev, newRole]);
      setToastMessage(`Role "${roleData.name}" created successfully!`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setIsCreateRoleOpen(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: number, roleName: string) => {
    setRoles(prev => prev.filter(r => r.id !== roleId));
    setToastMessage(`Role "${roleName}" deleted successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const rolesData = [
    { id: 1, name: 'Super Admin', icon: 'shield', type: 'manager', permissions: ['read', 'write', 'read_write', 'data_delete', 'report', 'bulk_edit', 'API', 'settings'], modules: ['sales', 'onboarding', 'account_management', 'integrations'], status: 'Core' },
    { id: 2, name: 'Sales Manager', icon: 'trending_up', type: 'manager', permissions: ['read', 'write', 'report', 'bulk_edit'], modules: ['sales'], status: 'Custom' },
    { id: 3, name: 'Account Manager', icon: 'account_circle', type: 'manager', permissions: ['read', 'write', 'report'], modules: ['account_management'], status: 'Custom' },
    { id: 4, name: 'Sales Rep', icon: 'person', type: 'user', permissions: ['read', 'write'], modules: ['sales'], status: 'Core' },
    { id: 5, name: 'Support Agent', icon: 'support_agent', type: 'user', permissions: ['read', 'report'], modules: ['account_management'], status: 'Custom' }
  ];

  const [roles, setRoles] = useState(rolesData);

  const headerBgClass = "bg-[#1A171F]";

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FCFAFE] animate-in fade-in duration-300 overflow-hidden">
      {/* Header - Consistent with Profile */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-10 py-5 border-b border-outline/10 shadow-sm shrink-0">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="flex items-center justify-center p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3 lowercase">
              <span className="capitalize">Role Management</span>
              <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                System
              </span>
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Manage users, roles and team structure</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              if (activeTab === 'User Management') setIsCreateOverlayOpen(true);
              if (activeTab === 'Roles and Permissions') setIsCreateRoleOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold hover:bg-primary-container/90 transition-all group shadow-sm active:scale-95"
          >
            {activeTab === 'User Management' ? (
              <>
                <span className="material-symbols-outlined !text-[18px]">add</span>
                New User
              </>
            ) : (
              <>
                <span className="material-symbols-outlined !text-[18px]">add</span>
                New Role
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs - Consistent with Profile */}
      <div className="px-4 sm:px-10 border-b border-outline-variant/30 pt-4 bg-[#FCFAFE] shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 sm:gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all ${activeTab === tab.name
                ? 'border-primary-container text-primary-container'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline/20'
                }`}
            >
              <span className="material-symbols-outlined !text-[18px]">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 custom-scrollbar">
        {activeTab === 'User Management' && (
          <div className="space-y-4">
            {/* Table Container - Consistent with All Leads */}
            <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative transition-all mt-2">
              {/* Table toolbar */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-6 py-4 border-b border-outline/5">
                <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest text-center sm:text-left">
                  User Directory
                </h3>
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <div className="relative group w-full sm:w-auto">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">search</span>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline/10 rounded-sm text-[0.75rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 w-full sm:w-[240px] transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  {/* Status Dropdown Filter */}
                  <div className="relative group">
                    <button
                      onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-primary-container transition-colors rounded-sm uppercase tracking-wider group shadow-sm min-w-[120px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined !text-[16px]">filter_alt</span>
                        {statusFilter}
                      </div>
                      <span className={`material-symbols-outlined !text-[18px] transition-transform duration-300 ${isStatusDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {isStatusDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsStatusDropdownOpen(false)} />
                        <div className="absolute top-full right-0 mt-1 w-full min-w-[140px] bg-surface-container-high border border-outline/10 shadow-xl rounded-sm py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                          {['All', 'Active', 'Inactive'].map(opt => (
                            <div
                              key={opt}
                              onClick={() => { setStatusFilter(opt); setIsStatusDropdownOpen(false); }}
                              className={`px-4 py-2 text-[0.75rem] font-bold cursor-pointer transition-colors flex items-center justify-between ${statusFilter === opt ? 'bg-primary-container/10 text-primary-container' : 'text-on-surface-variant hover:bg-primary-container/5 hover:text-on-surface'}`}
                            >
                              {opt}
                              {statusFilter === opt && <span className="material-symbols-outlined !text-[14px]">check</span>}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline/5">
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Name</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Username</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Email</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Contact</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Role</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Status</th>
                      <th className="w-[100px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/5">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="transition-all cursor-pointer group h-[60px]">
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.08] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-sm bg-tertiary/10 flex items-center justify-center text-tertiary font-bold text-[0.65rem] uppercase">
                              {user.name.charAt(0)}
                            </div>
                            <span className="text-[0.85rem] font-semibold text-tertiary group-hover:underline transition-colors">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                          <span className="text-[0.8rem] font-medium text-on-surface-variant/70">{user.username}</span>
                        </td>
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                          <span className="text-[0.8rem] font-medium text-tertiary hover:underline">{user.email}</span>
                        </td>
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                          <span className="text-[0.8rem] font-medium text-on-surface-variant/70">{user.contact}</span>
                        </td>
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                          <span className="px-2 py-0.5 bg-surface-container rounded-sm text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-wider border border-outline/5 font-mono">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.65rem] font-black uppercase tracking-wider ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-on-surface-variant/10 text-on-surface-variant/50'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-on-surface-variant/30'}`}></div>
                            {user.status}
                          </div>
                        </td>
                        <td className="sticky right-0 w-[160px] p-0 overflow-visible z-30 pointer-events-none">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto sm:pointer-events-none group-hover:pointer-events-auto flex gap-2">
                            <button
                              onClick={() => handleEditClick(user)}
                              className="flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white rounded-sm text-[0.8rem] font-semibold hover:bg-orange-600 transition-all shadow-sm active:scale-95 whitespace-nowrap pointer-events-auto"
                            >
                              <span className="material-symbols-outlined !text-[18px]">edit</span>
                              Edit
                            </button>
                            <button
                              className="flex items-center gap-2 px-4 py-1.5 bg-error text-white rounded-sm text-[0.8rem] font-semibold hover:bg-error/90 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                            >
                              <span className="material-symbols-outlined !text-[18px]">delete</span>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Consistent with All Leads */}
              <div className="p-4 bg-surface-container-low border-t border-outline/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[0.75rem] text-on-surface-variant font-medium text-center sm:text-left">
                  Showing {filteredUsers.length > 0 ? 1 : 0} to {filteredUsers.length} of {usersData.length} users
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface rounded-sm font-semibold opacity-50 cursor-not-allowed">Previous</button>
                  <button className="px-3 py-1 text-[0.75rem] rounded-sm font-bold shadow-sm bg-primary-container text-white">1</button>
                  <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface rounded-sm font-semibold opacity-50 cursor-not-allowed">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Roles and Permissions' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            {/* Roles Table Container */}
            <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative transition-all mt-2">
              {/* Table toolbar */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-6 py-4 border-b border-outline/5">
                <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest text-center sm:text-left">
                  System Roles & Permissions
                </h3>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline/5">
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Role Name</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/50 uppercase tracking-widest whitespace-nowrap">Permissions Scope</th>
                      <th className="w-[120px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/5">
                    {roles.map((role) => (
                      <tr key={role.id} className="transition-all cursor-pointer group h-[64px]">
                        <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.08] transition-colors whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-sm bg-primary-container/10 flex items-center justify-center text-primary-container">
                              <span className="material-symbols-outlined !text-[16px]">{role.icon}</span>
                            </div>
                            <span className="text-[0.85rem] font-bold text-on-surface">{role.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((perm, pIdx) => (
                              <span key={pIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-high border border-outline/10 text-[0.7rem] font-bold text-on-surface-variant/80 rounded-sm hover:bg-surface-container-highest transition-colors group/tag">
                                {perm}
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDeletePermission(role.id, perm); }}
                                  className="hover:text-error transition-colors flex items-center"
                                >
                                  <span className="material-symbols-outlined !text-[14px]">cancel</span>
                                </button>
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="sticky right-0 w-[200px] p-0 z-30 pointer-events-none">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto sm:pointer-events-none group-hover:pointer-events-auto gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setEditingRole(role); setIsCreateRoleOpen(true); }}
                              className="flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white rounded-sm text-[0.8rem] font-semibold hover:bg-orange-600 transition-all shadow-sm active:scale-95 whitespace-nowrap pointer-events-auto"
                            >
                              <span className="material-symbols-outlined !text-[18px]">edit</span>
                              Edit
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteRole(role.id, role.name); }}
                              className="flex items-center gap-2 px-4 py-1.5 bg-error text-white rounded-sm text-[0.8rem] font-semibold hover:bg-error/90 transition-all shadow-sm active:scale-95 whitespace-nowrap pointer-events-auto"
                            >
                              <span className="material-symbols-outlined !text-[18px]">delete</span>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Team Management' && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in slide-in-from-top-2 duration-300">
            <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="material-symbols-outlined !text-[40px] text-on-surface-variant/20">groups</span>
            </div>
            <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight mb-2">Team Structure Settings</h2>
            <p className="text-[0.9rem] text-on-surface-variant/60 max-w-md">Configure departments, regional teams and reporting hierarchies in this section.</p>
            <button className="mt-8 px-6 py-2 bg-primary-container/10 text-primary-container border border-primary-container/20 rounded-sm text-[0.75rem] font-bold hover:bg-primary-container/20 transition-all uppercase tracking-widest">
              Initialize Team Setup
            </button>
          </div>
        )}
      </div>

      <EditUserOverlay
        isOpen={isEditOverlayOpen}
        onClose={() => setIsEditOverlayOpen(false)}
        user={editingUser}
        onSave={handleSaveRole}
      />

      <CreateUserOverlay
        isOpen={isCreateOverlayOpen}
        onClose={() => setIsCreateOverlayOpen(false)}
        onSave={(newUser) => {
          setUsersData(prev => [...prev, { ...newUser, id: Date.now(), status: 'Active' }]);
          setIsCreateOverlayOpen(false);
        }}
      />

      <CreateRoleOverlay
        isOpen={isCreateRoleOpen}
        onClose={() => { setIsCreateRoleOpen(false); setEditingRole(null); }}
        onSave={handleCreateRole}
        role={editingRole}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-[#1A171F] text-white px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UserRoleManagement;
