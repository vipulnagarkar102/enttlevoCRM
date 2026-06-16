import React from 'react';
import enttlevoIcon from '../assets/enttlevologo1.png';

interface TableLoaderProps {
  colSpan: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="h-[400px] p-0 relative border-none">
        <div className="sticky left-0 w-[calc(100vw-var(--sidebar-width,280px)-4rem)] flex flex-col items-center justify-center gap-6 h-full transition-all duration-300">
          <div className="relative">
            <img 
              src={enttlevoIcon} 
              alt="Loading..." 
              className="w-16 h-16 grayscale opacity-40 animate-float-pulse transition-all duration-700"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[0.8rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] animate-pulse">Synchronizing Records</h4>
            <p className="text-[0.7rem] text-on-surface-variant/20 italic font-medium tracking-tight">Accessing Enttlevo CRM Core...</p>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableLoader;
