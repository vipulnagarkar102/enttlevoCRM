import React from 'react';

interface EmailHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCompose: () => void;
}

const EmailHeader: React.FC<EmailHeaderProps> = ({ searchQuery, setSearchQuery, onCompose }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4 sm:mb-8">
      <div className="text-left">
        <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">Email</h1>
        <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Manage communications and email campaigns</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary-container !text-lg transition-colors">search</span>
          <input
            type="text"
            placeholder="Search in mail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 bg-surface-container-low border border-outline/10 rounded-sm py-1.5 pl-10 pr-3 text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:bg-surface-container transition-all"
          />
        </div>

        <div className="h-6 w-[1px] bg-outline-variant/30 mx-1"></div>

        <button
          onClick={onCompose}
          className="flex items-center gap-2 px-6 py-2 bg-primary-container text-white rounded-sm text-[0.85rem] font-bold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 tracking-wider uppercase"
        >
          <span className="material-symbols-outlined !text-[20px]">edit_square</span>
          Compose
        </button>
      </div>
    </div>
  );
};

export default EmailHeader;
