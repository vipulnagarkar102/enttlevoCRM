import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Note {
  id: string;
  author: string;
  initials: string;
  avatar?: string;
  initialsBg: string;
  date: string;
  content: string;
  isPinned: boolean;
}

const NotesTabContent = () => {
  const { isDark } = useTheme();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      author: 'Shrinath Rao',
      initials: 'SR',
      initialsBg: isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary',
      date: 'OCT 24, 2023 • 10:30 AM',
      content: 'Discussed the security compliance requirements with the IT Director. They specifically mentioned needing SOC2 Type II reports for the\n\nAction Item: Send the latest security whitepaper by Friday.',
      isPinned: false
    },
    {
      id: '2',
      author: 'Arjun Mehta',
      initials: 'AM',
      initialsBg: 'bg-tertiary/10 text-tertiary',
      date: 'OCT 22, 2023 • 03:15 PM',
      content: 'Critical Account Context:\nPrimary goal for this quarter is consolidating their cloud spend across three disparate business units. Key stakeholders are very interested in a multi-region deployment.',
      isPinned: true
    },
    {
      id: '3',
      author: 'Sarah Jenkins',
      initials: 'SJ',
      initialsBg: 'bg-error/10 text-error',
      date: 'OCT 21, 2023 • 09:45 AM',
      content: 'Initial discovery call completed. The client is currently using a legacy system and is looking for a more automated way to manage their internal sales pipelines.',
      isPinned: false
    },
    {
      id: '4',
      author: 'Mukesh Kumar',
      initials: 'MK',
      initialsBg: isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary',
      date: 'OCT 18, 2023 • 11:20 AM',
      content: 'Follow-up email sent regarding the integration requirements. We need to confirm if they need custom API endpoints for their current ERP system.',
      isPinned: false
    }
  ]);

  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      author: 'Shrinath Rao',
      initials: 'SR',
      initialsBg: isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary',
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase().replace(',', ' •'),
      content: newNoteContent,
      isPinned: false
    };

    setNotes([newNote, ...notes]);
    setNewNoteContent('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content: editContent } : n));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return parseInt(b.id) - parseInt(a.id);
  });

  return (
    <div className="flex flex-col h-full w-full bg-surface animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 pb-0 border-b border-outline/10 flex flex-col gap-4 shrink-0">
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
            <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">note</span>
            Notes
          </h2>
          <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Manage and view account notes</p>
        </div>
        <div className="h-4"></div>
      </div>

      {/* Input Area */}
      <div className="p-6 shrink-0 border-b border-outline/5 bg-surface-container-low">
        <div className="bg-surface border border-outline/10 rounded-sm shadow-sm flex flex-col focus-within:border-primary-container/50 focus-within:ring-1 focus-within:ring-primary-container/20 transition-all">
          <div className="flex items-center justify-between p-3 border-b border-outline/5">
            <div className="flex items-center gap-2 text-on-surface-variant/50">
              <button className="material-symbols-outlined !text-[18px] hover:text-on-surface transition-colors">format_bold</button>
              <button className="material-symbols-outlined !text-[18px] hover:text-on-surface transition-colors">format_italic</button>
              <button className="material-symbols-outlined !text-[18px] hover:text-on-surface transition-colors">format_list_bulleted</button>
              <button className="material-symbols-outlined !text-[18px] hover:text-on-surface transition-colors">link</button>
              <button className="material-symbols-outlined !text-[18px] hover:text-on-surface transition-colors">image</button>
            </div>
            <span className="text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">Create New Note</span>
          </div>
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Start typing your note here... Use @ to mention a teammate."
            className="w-full p-4 bg-surface text-[0.85rem] text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none min-h-[100px] resize-y custom-scrollbar"
          />
          <div className="flex items-center justify-between p-3 border-t border-outline/5 bg-surface-container-low">
            <button className="flex items-center gap-2 text-[0.8rem] font-medium text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined !text-[18px]">attach_file</span>
              Attach files
            </button>
            <button
              onClick={handleAddNote}
              disabled={!newNoteContent.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-colors shadow-sm tracking-wider uppercase active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined !text-[16px]">save</span>
              Save Note
            </button>
          </div>
        </div>
      </div>

      {/* Note List */}
      <div className="flex-1 overflow-y-auto p-6 bg-surface-container-low space-y-4 custom-scrollbar">
        {sortedNotes.map(note => (
          <div key={note.id} className="bg-surface border border-outline/10 rounded-sm shadow-sm p-6 relative group transition-all hover:bg-primary-container/[0.04] hover:border-primary-container/20">
            
            {/* Action Buttons */}
            {editingId !== note.id && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 bg-surface pl-2 shadow-sm rounded-sm">
                <button onClick={() => handleTogglePin(note.id)} className={`transition-colors text-[18px] ${note.isPinned ? 'text-primary-container rotate-45' : 'text-on-surface-variant/40 hover:text-on-surface'}`} title={note.isPinned ? "Unpin" : "Pin"}>
                  <span className="material-symbols-outlined !text-[18px]" style={note.isPinned ? { fontVariationSettings: "'FILL' 1" } : {}}>push_pin</span>
                </button>
                <button onClick={() => handleStartEdit(note)} className="text-on-surface-variant/40 hover:text-on-surface transition-colors" title="Edit Note">
                  <span className="material-symbols-outlined !text-[18px]">edit</span>
                </button>
                <button onClick={() => handleDeleteNote(note.id)} className="text-on-surface-variant/40 hover:text-error transition-colors" title="Delete Note">
                  <span className="material-symbols-outlined !text-[18px]">delete</span>
                </button>
              </div>
            )}

            {note.isPinned && editingId !== note.id && (
              <div className="absolute top-4 right-4 text-primary-container group-hover:hidden transition-all duration-200">
                <span className="material-symbols-outlined !text-[18px] rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${note.initialsBg}`}>
                {note.avatar ? (
                  <img src={note.avatar} alt={note.author} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[1rem] font-bold">{note.initials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0 pr-12">
                <div className="flex flex-col mb-4">
                  <div className="text-[1rem] font-bold text-on-surface leading-tight">{note.author}</div>
                  <div className="text-[0.7rem] font-bold tracking-widest text-on-surface-variant/40 uppercase mt-0.5">{note.date}</div>
                </div>

                {editingId === note.id ? (
                  <div className="flex flex-col gap-3 mt-3 animate-in fade-in duration-200">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-3 bg-surface text-[0.85rem] text-on-surface border border-primary-container/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary-container/20 min-h-[80px] resize-y"
                      autoFocus
                    />
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 border border-outline/20 rounded-sm text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        disabled={!editContent.trim()}
                        className="px-3 py-1.5 bg-primary-container text-white border border-primary-container rounded-sm text-[0.75rem] font-bold hover:bg-primary-container/90 transition-colors uppercase tracking-wider disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-[0.9rem] text-on-surface/80 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 opacity-50">
            <span className="material-symbols-outlined !text-[48px] text-on-surface-variant/30 mb-4">note_stack</span>
            <h3 className="text-[1.1rem] font-bold text-on-surface mb-2">No notes yet</h3>
            <p className="text-[0.9rem] text-on-surface-variant">
              Create a note above to keep track of important information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesTabContent;


