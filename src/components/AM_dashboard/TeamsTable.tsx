import React, { useState } from 'react';

const TeamsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const teamData = [
    { id: 1, name: 'Raj Kumar', email: 'raj.kumar@sales.co', phone: '+1 555-0101', address: '123 Baker St, London' },
    { id: 2, name: 'Sanya Malhotra', email: 'sanya@enttevo.com', phone: '+1 555-0102', address: '45 MG Road, Bangalore' },
    { id: 3, name: 'Kevin Peters', email: 'k.peters@nexus.io', phone: '+1 555-0103', address: '789 Silicon Ave, San Jose' },
    { id: 4, name: 'Sofia Vergara', email: 'sofia@sales.co', phone: '+1 555-0104', address: '321 Ocean Drive, Miami' },
    { id: 5, name: 'Rohan Das', email: 'p.das@enttevo.com', phone: '+1 555-0105', address: '56 Park Street, Kolkata' },
    { id: 6, name: 'Nisha Gupta', email: 'nisha.g@sales.co', phone: '+1 555-0106', address: '89 Tech Park, Pune' },
    { id: 7, name: 'Liam Smith', email: 'l.smith@nexus.io', phone: '+1 555-0107', address: '234 Maple St, Toronto' },
    { id: 8, name: 'Aria Khan', email: 'a.khan@enttevo.com', phone: '+1 555-0108', address: '876 Pearl St, Dubai' },
    { id: 9, name: 'Ethan Hunt', email: 'ethan.h@sales.co', phone: '+1 555-0109', address: '45 Secret Lane, Washington DC' },
    { id: 10, name: 'Mia Wong', email: 'm.wong@nexus.io', phone: '+1 555-0110', address: '900 Financial Dist, Singapore' },
  ];

  const filteredData = teamData.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center bg-surface-container px-6 py-4 border-b border-outline/5">
        <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
          Active AM Team
        </h3>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">search</span>
          <input
            type="text"
            placeholder="Search team members..."
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
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap bg-surface-container">Name</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap border-l border-outline/5 bg-surface-container">Email</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap border-l border-outline/5 bg-surface-container">Phone</th>
              <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap border-l border-outline/5 bg-surface-container">Address</th>
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
              currentData.map((member) => (
                <tr key={member.id} className="transition-all cursor-pointer group hover:bg-primary-container/[0.06] h-[52px]">
                  <td className="px-6 py-0"><span className="text-[0.85rem] font-semibold text-on-surface">{member.name}</span></td>
                  <td className="px-6 py-0 border-l border-outline/5"><span className="text-[0.8rem] text-tertiary hover:underline font-medium">{member.email}</span></td>
                  <td className="px-6 py-0 border-l border-outline/5"><span className="text-[0.8rem] text-on-surface font-medium">{member.phone}</span></td>
                  <td className="px-6 py-0 border-l border-outline/5"><span className="text-[0.8rem] text-on-surface-variant line-clamp-1">{member.address}</span></td>
                  <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap">
                        <span className="material-symbols-outlined !text-[18px]">account_circle</span>
                        View Member
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
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} team members
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

export default TeamsTable;
