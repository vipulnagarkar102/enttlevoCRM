import React from 'react';

interface CreateUserOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: any) => void;
}

const CreateUserOverlay: React.FC<CreateUserOverlayProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const inputClass = "w-full px-3 py-2.5 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 placeholder:text-on-surface-variant/30 transition-colors";

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] animate-in fade-in" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[800px] max-w-[90vw] bg-surface-container shadow-2xl z-[101] flex flex-col border-l border-outline/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button onClick={onClose} className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="pr-8">
            <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight">Create New User</h2>
            <p className="text-[0.8rem] text-on-surface-variant mt-1">Fields marked with <span className="text-error">*</span> are required</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">badge</span>
                First Name <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="Enter first name" className={inputClass} />
            </div>
            
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">badge</span>
                Last Name <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="Enter last name" className={inputClass} />
            </div>

            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">alternate_email</span>
                Username <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="@username" className={inputClass} />
            </div>

            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">mail</span>
                Email Address <span className="text-error">*</span>
              </label>
              <input type="email" placeholder="Enter email address" className={inputClass} />
            </div>

            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">call</span>
                Contact Number <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="+91 00000 00000" className={inputClass} />
            </div>

            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">shield_person</span>
                User Role <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select defaultValue="" className="w-full px-3 py-2.5 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface-variant/70 focus:outline-none focus:border-primary-container/50 appearance-none transition-colors">
                  <option value="" disabled>Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Account Manager">Account Manager</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 !text-[18px] pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button onClick={onClose} className="min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancel</button>
          <button className="min-w-[120px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold hover:bg-primary-container/90 shadow-sm active:scale-95 flex items-center justify-center gap-2">
            Create User
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUserOverlay;
