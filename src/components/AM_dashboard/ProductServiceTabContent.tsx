import React, { useState } from 'react';
import AddProductOverlay from './AddProductOverlay';

interface Product {
  id: string;
  name: string;
  type: 'product' | 'service';
  price: number;
  quantity: number;
}

const ProductServiceTabContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Auxtik', type: 'product', price: 20, quantity: 1 },
    { id: '2', name: 'Auxtik', type: 'product', price: 20, quantity: 1 },
  ]);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsOverlayOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Product deleted successfully");
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsOverlayOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-surface animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-outline/10 flex justify-between items-center bg-surface sticky top-0 z-10">
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface leading-tight">
            <span className="material-symbols-outlined !text-[22px] text-primary-container">inventory_2</span>
            Product and Service
          </h2>
          <p className="text-[0.85rem] text-on-surface-variant font-medium ml-8 mt-1">Manage customer products and services</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-6 py-2 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-all shadow-sm tracking-widest uppercase active:scale-95"
        >
          <span className="material-symbols-outlined !text-[18px]">add</span>
          Add Product
        </button>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-8 bg-surface-container-low custom-scrollbar opacity-100">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 pb-40">
          {products.map((product) => (
            <div key={product.id} className="bg-surface border border-outline/10 rounded-sm p-6 flex flex-col transition-all duration-200 group relative hover:border-primary-container/20 hover:bg-primary-container/[0.02]">

              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-container/[0.06] rounded-sm flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined !text-[20px] text-primary-container">inventory_2</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[1rem] font-bold text-on-surface tracking-tight">{product.name}</h3>
                    <div className="inline-flex px-1.5 py-0.5 bg-surface-container text-on-surface-variant text-[0.6rem] font-bold uppercase tracking-wider rounded-sm w-fit border border-outline/5">
                      {product.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant/40 hover:text-primary-container transition-all"
                  >
                    <span className="material-symbols-outlined !text-[18px]">edit_square</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant/40 hover:text-error transition-all"
                  >
                    <span className="material-symbols-outlined !text-[18px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-surface-container/30 rounded-sm p-5 flex items-center justify-between border border-outline/5">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-emerald-500 mb-0.5">
                    <span className="material-symbols-outlined !text-[16px] font-bold">attach_money</span>
                    <span className="text-[1.15rem] font-bold">${product.price}</span>
                  </div>
                  <span className="text-[0.6rem] font-bold text-on-surface-variant/30 uppercase tracking-widest">Price</span>
                </div>

                <div className="h-6 w-[1px] bg-outline/10" />

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-blue-500 mb-0.5">
                    <span className="material-symbols-outlined !text-[16px] font-bold">tag</span>
                    <span className="text-[1.15rem] font-bold">{product.quantity}</span>
                  </div>
                  <span className="text-[0.6rem] font-bold text-on-surface-variant/30 uppercase tracking-widest">Quantity</span>
                </div>

                <div className="h-6 w-[1px] bg-outline/10" />

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-purple-500 mb-0.5">
                    <span className="material-symbols-outlined !text-[16px] font-bold">calculate</span>
                    <span className="text-[1.15rem] font-bold">${(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                  <span className="text-[0.6rem] font-bold text-on-surface-variant/30 uppercase tracking-widest">Total</span>
                </div>
              </div>

            </div>
          ))}

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-surface border-2 border-dashed border-outline/5 rounded-sm animate-in fade-in duration-500">
              <span className="material-symbols-outlined !text-[56px] text-on-surface-variant/10 mb-2">production_quantity_limits</span>
              <p className="text-[0.9rem] font-bold text-on-surface-variant/40">No products added for this customer</p>
            </div>
          )}
        </div>
      </div>

      <AddProductOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        product={editingProduct}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ProductServiceTabContent;
