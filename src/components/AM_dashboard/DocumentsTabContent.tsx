import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}

const DocumentsTabContent = () => {
  const { isDark } = useTheme();
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'AM_Plan_v1.pdf', size: '2.4 MB', uploadDate: 'Mar 24, 2026' },
    { id: '2', name: 'Implementation_Guide.pdf', size: '1.8 MB', uploadDate: 'Mar 22, 2026' },
    { id: '3', name: 'Project_Checklist.docx', size: '3.1 MB', uploadDate: 'Mar 20, 2026' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(',', '')
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-surface animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-outline/10 flex flex-col gap-4 shrink-0">
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
            <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">folder</span>
            Documents
          </h2>
          <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Manage and upload AM documents</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-8">
        
        {/* Drop Zone */}
        <div className={`relative border-2 border-dashed ${isDark ? 'border-outline/20 bg-surface-container/5' : 'border-outline/10 bg-surface-container/10'} rounded-sm p-10 hover:bg-surface-container/30 hover:border-primary-container/30 transition-all group flex flex-col items-center justify-center text-center`}>
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            onChange={handleFileUpload}
            accept=".pdf,.docx,.xlsx,.pptx"
          />
          <div className="w-16 h-16 bg-surface rounded-full shadow-sm border border-outline/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-[32px] text-primary-container">cloud_upload</span>
          </div>
          <h3 className="text-[1.1rem] font-bold text-on-surface mb-1 tracking-tight">
            DRAG AND DROP FILES HERE
          </h3>
          <p className="text-[0.9rem] text-on-surface-variant/60 font-medium">
            or <span className="text-primary-container hover:underline cursor-pointer">browse your computer</span>
          </p>
          <p className={`mt-6 text-[0.7rem] font-bold ${isDark ? 'text-on-surface-variant/40' : 'text-on-surface-variant/30'} uppercase tracking-widest leading-relaxed`}>
            Supported formats: PDF, DOCX, XLSX, PPTX (Max 15MB)
          </p>
        </div>

        {/* List Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">
              Recent Documents
            </h3>
            <div className="relative w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-surface-container/30 border border-outline/10 rounded-sm py-1.5 pl-10 pr-3 text-[0.85rem] text-on-surface focus:outline-none focus:bg-surface focus:border-primary-container/30 transition-all placeholder:text-on-surface-variant/30 ${isDark ? 'bg-surface-container' : ''}`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest border-b border-outline/5">
                  <th className="px-4 py-3 font-bold">File Name</th>
                  <th className="px-4 py-3 font-bold text-center">Size</th>
                  <th className="px-4 py-3 font-bold text-right">Upload Date</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/5">
                {filteredDocuments.map(doc => (
                  <tr key={doc.id} className="group hover:bg-primary-container/[0.04] transition-colors cursor-pointer whitespace-nowrap">
                    <td className="px-4 py-4 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${isDark ? 'bg-error/20 text-error-light' : 'bg-error/10 text-error'} rounded-sm flex items-center justify-center shrink-0`}>
                          <span className="material-symbols-outlined !text-[18px]">description</span>
                        </div>
                        <span className="text-[0.85rem] font-bold text-on-surface/80 truncate max-w-[180px]">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-[0.8rem] font-medium text-on-surface-variant/60">{doc.size}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-[0.8rem] font-medium text-on-surface-variant/60">{doc.uploadDate}</span>
                    </td>
                    <td className="px-4 py-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }}
                        className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant/40 hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined !text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDocuments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-on-surface-variant/40 italic">
                      No documents found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentsTabContent;
