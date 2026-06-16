import React, { useState } from 'react';

const ManagersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const managerData = [
    { id: 1, firstName: 'local', lastName: 'sales', email: 'rushib777777@gmail.com', username: 'local_sales', companyid: 'Cm896' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 's.johnson@enttevo.com', username: 'sarah_j', companyid: 'Cm896' },
    { id: 3, firstName: 'Michael', lastName: 'Chen', email: 'm.chen@sales.co', username: 'mchen_dev', companyid: 'Cm896' },
    { id: 4, firstName: 'Emma', lastName: 'Wilson', email: 'emma.w@enttevo.com', username: 'wilson_e', companyid: 'Cm896' },
    { id: 5, firstName: 'Alex', lastName: 'Rodriguez', email: 'alex.r@nexus.io', username: 'arod_sales', companyid: 'Cm896' },
    { id: 6, firstName: 'Jessica', lastName: 'Taylor', email: 'j.taylor@enttevo.com', username: 'jtaylor88', companyid: 'Cm896' },
    { id: 7, firstName: 'David', lastName: 'Lee', email: 'd.lee@sales.co', username: 'dlee_mgr' },
    { id: 8, firstName: 'Sophia', lastName: 'Martinez', email: 'sophia.m@nexus.io', username: 'smart_sales' },
    { id: 9, firstName: 'Daniel', lastName: 'Brown', email: 'd.brown@enttevo.com', username: 'dbrown_pro' },
    { id: 10, firstName: 'Olivia', lastName: 'Garcia', email: 'olivia.g@sales.co', username: 'ogarcia_v' },
    { id: 11, firstName: 'Ryan', lastName: 'Miller', email: 'r.miller@nexus.io', username: 'rmiller_mgr' },
  ];

  const filteredData = managerData.filter(manager =>
    manager.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center bg-surface-container px-6 py-4 border-b border-outline/5">
        <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
          Active Account Managers
        </h3>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">search</span>
          <input
            type="text"
            placeholder="Search managers..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline/10 rounded-sm text-[0.75rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 w-[240px] transition-all placeholder:text-on-surface-variant/30"
          />
        </div>
      </div>

      {/* Table */}
      <div className="min-h-[300px] overflow-y-auto overflow-x-auto relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline/5 sticky top-0 z-20">
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap bg-surface-container">Company ID</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap bg-surface-container">First Name</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap border-l border-outline/5 bg-surface-container">Last Name</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap border-l border-outline/5 bg-surface-container">Email</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap border-l border-outline/5 bg-surface-container">Username</th>
              <th className="sticky right-0 w-0 p-0 z-20 bg-surface-container"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline/5 whitespace-nowrap">
            {currentData.length === 0 ? (
              <tr className="h-[200px]">
                <td colSpan={5} className="px-6 py-0 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 opacity-40 text-on-surface">
                    <span className="material-symbols-outlined !text-[48px]">search_off</span>
                    <span className="text-[0.85rem] font-medium tracking-wide">No results found for "{searchQuery}"</span>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((manager) => (
                <tr key={manager.id} className="transition-all cursor-pointer group hover:bg-primary-container/[0.06] h-[52px]">
                  <td className="px-6 py-0"><span className="text-[0.85rem] font-semibold text-on-surface">{manager.companyid}</span></td>
                  <td className="px-6 py-0"><span className="text-[0.85rem] font-semibold text-on-surface">{manager.firstName}</span></td>
                  <td className="px-6 py-0 border-l border-outline/5"><span className="text-[0.85rem] font-medium text-on-surface-variant">{manager.lastName}</span></td>
                  <td className="px-6 py-0 border-l border-outline/5"><span className="text-[0.8rem] text-tertiary hover:underline font-medium">{manager.email}</span></td>
                  <td className="px-6 py-0 border-l border-outline/5"><span className="text-[0.8rem] text-on-surface font-semibold">{manager.username}</span></td>
                  <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap">
                        <span className="material-symbols-outlined !text-[18px]">account_circle</span>
                        View Profile
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 bg-surface-container border-t border-outline/5 flex justify-between items-center">
        <span className="text-[0.75rem] text-on-surface-variant font-medium">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} active managers
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface rounded-sm font-semibold transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container-high'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 text-[0.75rem] rounded-sm font-bold shadow-sm transition-all ${currentPage === num ? 'bg-primary-container text-white' : 'bg-surface-container-low border border-outline/10 text-on-surface hover:bg-surface-container-high'}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface rounded-sm font-semibold transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container-high'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagersTable;
