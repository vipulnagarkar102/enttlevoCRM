import React, { useState, useEffect } from 'react';

interface CreateRoleOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: any) => void;
  role?: any;
}

const CreateRoleOverlay: React.FC<CreateRoleOverlayProps> = ({ isOpen, onClose, onSave, role }) => {
  const [roleName, setRoleName] = useState('');
  const [userType, setUserType] = useState<'manager' | 'user'>('user');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [modules, setModules] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setPermissions(role.permissions || []);
      setModules(role.modules || []);
      setUserType(role.type || 'user');
    } else {
      setRoleName('');
      setPermissions([]);
      setModules([]);
      setUserType('user');
    }
  }, [role, isOpen]);

  const permissionOptions = [
    { id: 'read', label: 'Read Access', description: 'Can view records and reports' },
    { id: 'write', label: 'Write Access', description: 'Can create and edit records' },
    { id: 'read_write', label: 'Full Read/Write', description: 'Full access to standard records' },
    { id: 'data_delete', label: 'Data Deletion', description: 'Can permanently remove records' },
    { id: 'report', label: 'Reporting', description: 'Can generate and export reports' },
    { id: 'bulk_edit', label: 'Bulk Edit', description: 'Can modify multiple records at once' },
    { id: 'API', label: 'API Access', description: 'Can manage API keys and integrations' },
    { id: 'settings', label: 'System Settings', description: 'Can modify platform configuration' }
  ];

  const moduleOptions = [
    { id: 'sales', label: 'Sales Dashboard' },
    { id: 'onboarding', label: 'Client Onboarding' },
    { id: 'account_management', label: 'Account Management' },
    { id: 'integrations', label: 'External Integrations' }
  ];

  useEffect(() => {
    if (roleName.toLowerCase() === 'superadmin') {
      setPermissions(permissionOptions.map(p => p.id));
      setModules(moduleOptions.map(m => m.id));
    }
  }, [roleName]);

  if (!isOpen) return null;

  const isSuperAdmin = roleName.toLowerCase() === 'superadmin';

  const togglePermission = (id: string) => {
    if (isSuperAdmin) return;
    setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleModule = (id: string) => {
    if (isSuperAdmin) return;
    setModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleCreate = () => {
    if (!roleName) return;
    onSave({
      ...(role || {}),
      name: roleName,
      type: userType,
      permissions,
      modules,
      icon: userType === 'manager' ? 'shield' : 'person'
    });
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 placeholder:text-on-surface-variant/30 transition-colors";
  const labelClass = "text-[0.85rem] font-bold text-on-surface flex items-center gap-2";

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] animate-in fade-in" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[520px] max-w-[90vw] bg-surface-container shadow-2xl z-[101] flex flex-col border-l border-outline/10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button onClick={onClose} className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="flex items-center gap-3 pr-8">
            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined !text-[22px]">{role ? 'manage_accounts' : 'add_moderator'}</span>
            </div>
            <div>
              <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight">{role ? 'Edit Role' : 'Create New Role'}</h2>
              <p className="text-[0.8rem] text-on-surface-variant font-medium">{role ? 'Update permissions and access' : 'Define permissions and module access'}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          
          <div className="grid grid-cols-1 gap-y-6">
            {/* Role Name */}
            <div className="space-y-1.5 flex flex-col">
              <label className={labelClass}>
                Role Name <span className="text-error">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g. Regional Manager" 
                className={inputClass}
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>

            {/* User Type */}
            <div className="space-y-1.5 flex flex-col">
              <label className={labelClass}>User Type</label>
              <div className="flex gap-4">
                {['manager', 'user'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setUserType(type as any)}
                    className={`flex-1 px-4 py-2.5 border rounded-sm text-[0.85rem] font-bold transition-all capitalize ${
                      userType === type 
                        ? 'bg-primary-container/10 border-primary-container text-primary-container' 
                        : 'border-outline/10 text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              <label className={labelClass}>Permissions Scope</label>
              <div className="border border-outline/10 rounded-sm bg-surface-container-low overflow-hidden">
                <div className="max-h-[220px] overflow-y-auto custom-scrollbar p-1">
                  {permissionOptions.map((opt) => (
                    <div 
                      key={opt.id}
                      onClick={() => togglePermission(opt.id)}
                      className={`group flex items-start gap-3 p-3 hover:bg-primary-container/5 cursor-pointer transition-colors border-b last:border-0 border-outline/5 ${isSuperAdmin ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-sm border transition-all flex items-center justify-center ${
                        permissions.includes(opt.id) 
                          ? 'bg-primary-container border-primary-container' 
                          : 'border-outline/30 bg-surface'
                      }`}>
                        {permissions.includes(opt.id) && <span className="material-symbols-outlined !text-[12px] text-white font-bold">check</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[0.75rem] font-bold ${permissions.includes(opt.id) ? 'text-primary-container' : 'text-on-surface'}`}>{opt.label}</p>
                        <p className="text-[0.65rem] text-on-surface-variant/70 mt-0.5">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Module Access */}
            <div className="space-y-3">
              <label className={labelClass}>Module Access</label>
              <div className="grid grid-cols-2 gap-3">
                {moduleOptions.map((mod) => (
                  <div 
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition-all ${
                      modules.includes(mod.id)
                        ? 'bg-primary-container/5 border-primary-container text-primary-container shadow-sm'
                        : 'bg-surface-container-low border-outline/10 text-on-surface-variant hover:bg-surface-container-high'
                    } ${isSuperAdmin ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-4 h-4 rounded-sm border transition-all flex items-center justify-center ${
                      modules.includes(mod.id) 
                        ? 'bg-primary-container border-primary-container' 
                        : 'border-outline/30 bg-surface'
                    }`}>
                      {modules.includes(mod.id) && <span className="material-symbols-outlined !text-[12px] text-white font-bold">check</span>}
                    </div>
                    <span className="text-[0.7rem] font-bold">{mod.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button 
            onClick={onClose} 
            className="min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            className={`min-w-[120px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold hover:bg-primary-container/90 shadow-sm active:scale-95 flex items-center justify-center gap-2 ${!roleName ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {role ? 'Update Role' : 'Create Role'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateRoleOverlay;
