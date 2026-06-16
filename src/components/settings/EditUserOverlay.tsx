import React, { useState, useEffect } from 'react';

interface EditUserOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: number; name: string; role: string } | null;
  onSave: (userId: number, newRole: string) => void;
}

const EditUserOverlay: React.FC<EditUserOverlayProps> = ({ isOpen, onClose, user, onSave }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  if (!isOpen) return null;

  const roles = ['Super Admin', 'Admin', 'User'];

  const dropdownMenuClass = "absolute top-full mt-1 left-0 w-full bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-[120] animate-in fade-in duration-100";
  const dropdownItemClass = "px-4 py-2.5 text-[0.85rem] text-on-surface font-medium hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors flex items-center justify-between";
  const dropdownTriggerClass = "flex items-center justify-between w-full px-4 py-2.5 border border-outline/15 bg-surface-container-low rounded-sm text-[0.9rem] text-on-surface cursor-pointer hover:border-primary-container/50 transition-colors group";

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] animate-in fade-in" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[500px] max-w-[90vw] bg-surface-container shadow-2xl z-[101] flex flex-col border-l border-outline/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button onClick={onClose} className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="flex items-center gap-3 pr-8">
            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
               <span className="material-symbols-outlined !text-[22px]">manage_accounts</span>
            </div>
            <div>
              <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight">Edit User Access</h2>
              <p className="text-[0.8rem] text-on-surface-variant font-medium">Update permissions for {user?.name}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-surface">
          <div className="space-y-6">
            <div className="flex flex-col gap-2 relative">
              <label className="text-[0.85rem] font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined !text-[18px] text-primary-container">shield</span>
                Assign User Role
              </label>
              <p className="text-[0.75rem] text-on-surface-variant mb-2">Changing a role will instantly update the user's permissions across the platform.</p>
              
              <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={dropdownTriggerClass}>
                <span className="font-semibold text-on-surface">{selectedRole || 'Select Role'}</span>
                <span className={`material-symbols-outlined !text-[20px] text-on-surface-variant transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </div>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-[110]" onClick={() => setIsDropdownOpen(false)} />
                  <div className={dropdownMenuClass}>
                    {roles.map(role => (
                      <div 
                        key={role} 
                        onClick={() => { setSelectedRole(role); setIsDropdownOpen(false); }} 
                        className={dropdownItemClass}
                      >
                        <span className={selectedRole === role ? 'text-primary-container font-bold' : ''}>{role}</span>
                        {selectedRole === role && <span className="material-symbols-outlined !text-[18px] text-primary-container">check_circle</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-primary-container/5 border border-primary-container/10 rounded-sm">
                <div className="flex gap-3">
                   <span className="material-symbols-outlined text-primary-container !text-[20px]">info</span>
                   <p className="text-[0.75rem] text-on-surface-variant leading-relaxed">
                     <strong className="text-on-surface block mb-1">Role Permissions Note:</strong>
                     {selectedRole === 'Super Admin' && "Super Admins have full access to all system settings, billing, and user management."}
                     {selectedRole === 'Admin' && "Admins can manage leads, deals, and reports but cannot access system billing or global settings."}
                     {selectedRole === 'User' && "Standard users can access assigned leads and personal tasks only."}
                   </p>
                </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button 
            onClick={onClose} 
            className="min-w-[100px] px-6 py-1.5 border border-outline/10 rounded-sm text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => { if (user) onSave(user.id, selectedRole); onClose(); }} 
            className="min-w-[120px] px-6 py-1.5 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold hover:bg-primary-container/90 shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined !text-[18px]">save</span>
            Update Role
          </button>
        </div>
      </div>
    </>
  );
};

export default EditUserOverlay;
