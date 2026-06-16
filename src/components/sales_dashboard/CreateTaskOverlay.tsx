import React, { useState, useEffect } from 'react';
import CustomCalendar from './CustomCalendar';
import { useTheme } from '../../context/ThemeContext';

interface CreateTaskOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { id?: string; title: string; category: string; description: string; date: string; time: string }) => void;
  initialData?: { id: string; title: string; category: string; description: string; date: string; time: string } | null;
}

const CreateTaskOverlay: React.FC<CreateTaskOverlayProps> = ({ isOpen, onClose, onAddTask, initialData }) => {
  const { isDark } = useTheme();
  const [taskData, setTaskData] = useState({
    title: '',
    category: 'Task',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTaskData({
        title: initialData.title,
        category: initialData.category,
        description: initialData.description || '',
        date: initialData.date,
        time: initialData.time
      });
    } else {
      setTaskData({
        title: '',
        category: 'Task',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!taskData.title.trim()) return;
    onAddTask({ ...taskData, id: initialData?.id });
    onClose();
  };

  const categories = ['Task', 'Call', 'Meeting'];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[998] transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Side Overlay */}
      <div className="fixed top-0 bottom-0 right-0 w-[500px] max-w-[90vw] bg-surface shadow-2xl z-[999] flex flex-col transform transition-transform duration-300 animate-slide-in-right border-l border-outline/10 overflow-hidden font-body">
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-on-surface-variant/40 p-2 hover:bg-surface-container hover:text-on-surface transition-all rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="pr-8">
            <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight leading-tight">{initialData ? 'Edit Task' : 'New Task'}</h2>
            <p className="text-[0.8rem] text-on-surface-variant mt-1">Fields marked with <span className="text-error font-medium">*</span> are required</p>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface custom-scrollbar">
          {/* Task Type */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">assignment</span>
              Task Type <span className="text-error font-medium">*</span>
            </label>
            <div className="relative w-full">
              <div
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-3 bg-surface-container border border-outline/20 rounded-sm px-3 py-2 cursor-pointer hover:bg-surface-container-high transition-colors justify-between group h-[42px]"
              >
                <span className="text-[0.85rem] text-on-surface font-medium">{taskData.category}</span>
                <span className={`material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-primary-container transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              {showCategoryDropdown && (
                <>
                  <div className="fixed inset-0 z-[1000]" onClick={() => setShowCategoryDropdown(false)} />
                  <div className="absolute top-full mt-1 left-0 w-full bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-[1001] animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => {
                          setTaskData({ ...taskData, category: cat });
                          setShowCategoryDropdown(false);
                        }}
                        className="px-3 py-2 text-[0.85rem] font-medium text-on-surface hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors"
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">title</span>
              Title <span className="text-error font-medium">*</span>
            </label>
            <input 
              type="text" 
              placeholder="What's this task about?" 
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              className="w-full px-3 py-2 border border-outline/20 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 placeholder:text-on-surface-variant/40 transition-all font-body h-[42px]" 
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">description</span>
              Description
            </label>
            <textarea 
              placeholder="Add more details about this task..." 
              rows={5}
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              className="w-full px-3 py-2 border border-outline/20 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 placeholder:text-on-surface-variant/40 transition-all font-body resize-none" 
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date with CustomCalendar */}
            <div className="space-y-1.5 flex flex-col relative">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">calendar_month</span>
                Date <span className="text-error font-medium">*</span>
              </label>
              <div
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center gap-3 bg-surface-container border border-outline/20 rounded-sm px-3 py-2 cursor-pointer hover:bg-surface-container-high transition-colors justify-between group h-[42px]"
              >
                <span className="text-[0.85rem] text-on-surface font-medium truncate">
                  {new Date(taskData.date).toLocaleDateString()}
                </span>
                <span className={`material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-primary-container transition-transform ${showCalendar ? 'rotate-180' : ''}`}>calendar_today</span>
              </div>
              {showCalendar && (
                <div className="relative">
                  <CustomCalendar 
                    selectedDate={taskData.date} 
                    onSelect={(date) => setTaskData({ ...taskData, date })} 
                    onClose={() => setShowCalendar(false)} 
                  />
                </div>
              )}
            </div>

            {/* Time */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">schedule</span>
                Time <span className="text-error font-medium">*</span>
              </label>
              <div className="relative h-[42px]">
                <input 
                  type="time" 
                  value={taskData.time}
                  onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
                  className={`w-full h-full px-3 py-2 bg-surface-container border border-outline/20 rounded-sm text-[0.85rem] text-on-surface font-medium focus:outline-none focus:border-primary-container/50 transition-all cursor-pointer font-body ${isDark ? '[color-scheme:dark]' : '[color-scheme:light]'}`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline/10 flex justify-end gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] bg-surface-container-low flex-shrink-0 z-[200]">
          <button 
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center justify-center min-w-[124px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-all uppercase tracking-wider shadow-sm active:scale-95"
          >
            {initialData ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default CreateTaskOverlay;


