import React from 'react';

interface AddProductOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

interface Product {
  id: string;
  name: string;
  type: 'product' | 'service';
  price: number;
  quantity: number;
}

const AddProductOverlay: React.FC<AddProductOverlayProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  const inputClass = "w-full px-3 py-2 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 placeholder:text-on-surface-variant/30 transition-colors";
  const labelClass = "flex items-center gap-2 text-[0.85rem] font-bold text-on-surface mb-1.5";

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[200] animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Right Drawer */}
      <div className="fixed top-0 right-0 h-full w-[440px] max-w-[90vw] bg-surface-container shadow-2xl z-[201] flex flex-col border-l border-outline/10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-outline/10 flex items-center justify-between bg-surface-container-low shadow-sm">
          <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight flex items-center gap-3">
            <span className="material-symbols-outlined !text-[20px] text-primary-container">{product ? 'edit' : 'add'}</span>
            {product ? 'Edit Product' : 'Add Product for Customer'}
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant/40 hover:text-on-surface hover:bg-surface-container rounded-full transition-all"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface custom-scrollbar">
          
          {/* Product Select */}
          <div className="flex flex-col">
            <label className={labelClass}>
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">inventory_2</span>
              Product <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select defaultValue={product?.name || "Auxtik"} className={`${inputClass} appearance-none cursor-pointer pr-10 text-on-surface-variant`}>
                <option value="Auxtik">Auxtik</option>
                <option value="Service A">Service A</option>
                <option value="Product B">Product B</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 !text-[18px] pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="flex flex-col">
            <label className={labelClass}>
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">tag</span>
              Quantity <span className="text-error">*</span>
            </label>
            <input 
              type="number" 
              defaultValue={product?.quantity || 1}
              placeholder="Enter quantity"
              className={inputClass}
            />
          </div>

          {/* Price Input */}
          <div className="flex flex-col">
            <label className={labelClass}>
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">attach_money</span>
              Price <span className="text-error">*</span>
            </label>
            <input 
              type="text" 
              defaultValue={product?.price || 20}
              placeholder="Enter price"
              className={inputClass}
            />
          </div>

          {/* Contacts Select */}
          <div className="flex flex-col">
            <label className={labelClass}>
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">group</span>
              Contacts
            </label>
            <div className="relative">
              <select className={`${inputClass} appearance-none cursor-pointer pr-10 text-on-surface-variant/50 italic`}>
                <option value="">Select contacts (optional)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 !text-[18px] pointer-events-none">expand_more</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 bg-surface-container-low flex justify-end gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button 
            onClick={onClose}
            className="min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            className="min-w-[100px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 uppercase tracking-wider shadow-sm active:scale-95 flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <span className="material-symbols-outlined !text-[18px]">{product ? 'check' : 'add'}</span>
            {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProductOverlay;
