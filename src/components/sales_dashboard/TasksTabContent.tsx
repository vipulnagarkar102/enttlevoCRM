import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

type TaskCategory = 'Meeting' | 'Follow up' | 'Mail' | 'Message' | 'Call';

interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  date: string;
  time: string;
  isCompleted: boolean;
  completedAt?: string;
}

const TasksTabContent = () => {
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Quarterly Review Meeting',
      category: 'Meeting',
      date: 'Feb 18, 2026',
      time: '10:00:00',
      isCompleted: false
    },
    {
      id: '2',
      title: 'Follow up with Procurement',
      category: 'Follow up',
      date: 'Feb 19, 2026',
      time: '14:30:00',
      isCompleted: false
    },
    {
      id: '3',
      title: 'Send Partnership Proposal',
      category: 'Mail',
      date: 'Feb 20, 2026',
      time: '09:00:00',
      isCompleted: false
    },
    {
      id: '4',
      title: 'Quick check-in with CFO',
      category: 'Message',
      date: 'Feb 20, 2026',
      time: '16:45:00',
      isCompleted: false
    },
    {
      id: '5',
      title: 'Cold call referral leads',
      category: 'Call',
      date: 'Feb 21, 2026',
      time: '11:30:00',
      isCompleted: false
    },
    {
      id: '6',
      title: 'Initial Discovery Call',
      category: 'Call',
      date: 'Feb 10, 2026',
      time: '10:00:00',
      isCompleted: true,
      completedAt: 'Feb 10, 2026'
    },
    {
      id: '7',
      title: 'NDA Documents Sent',
      category: 'Mail',
      date: 'Feb 08, 2026',
      time: '15:20:00',
      isCompleted: true,
      completedAt: 'Feb 08, 2026'
    },
    {
      id: '8',
      title: 'Stakeholder Alignment',
      category: 'Meeting',
      date: 'Feb 05, 2026',
      time: '11:00:00',
      isCompleted: true,
      completedAt: 'Feb 05, 2026'
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: 'Meeting',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      isCompleted: false
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsAdding(false);
  };

  const handleToggleStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return {
          ...t,
          isCompleted: !t.isCompleted,
          completedAt: !t.isCompleted ? dateStr : undefined
        };
      }
      return t;
    }));
  };

  const handleStartEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: editTitle } : t));
    setEditingId(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getCategoryStyles = (category: TaskCategory) => {
    switch (category) {
      case 'Meeting': return { bg: isDark ? 'bg-purple-900/30' : 'bg-purple-500/10', text: isDark ? 'text-purple-300' : 'text-purple-600', icon: 'groups' };
      case 'Follow up': return { bg: isDark ? 'bg-orange-900/30' : 'bg-orange-500/10', text: isDark ? 'text-orange-300' : 'text-orange-600', icon: 'person_search' };
      case 'Mail': return { bg: isDark ? 'bg-amber-900/30' : 'bg-secondary/10', text: isDark ? 'text-amber-300' : 'text-amber-600', icon: 'mail' };
      case 'Message': return { bg: isDark ? 'bg-indigo-900/30' : 'bg-indigo-500/10', text: isDark ? 'text-indigo-300' : 'text-indigo-600', icon: 'chat_bubble' };
      case 'Call': return { bg: isDark ? 'bg-emerald-900/30' : 'bg-emerald-500/10', text: isDark ? 'text-emerald-300' : 'text-emerald-600', icon: 'call' };
      default: return { bg: 'bg-outline/10', text: 'text-on-surface-variant', icon: 'task' };
    }
  };

  const pendingTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);

  return (
    <div className="flex flex-col h-full w-full bg-surface animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 border-b border-outline/10 flex justify-between items-center bg-surface z-10 sticky top-0">
        <div>
          <h2 className="text-[1.25rem] font-bold text-on-surface">Tasks</h2>
          <p className="text-[0.8rem] text-on-surface-variant font-medium">Manage your pending and completed activities</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-2 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-all shadow-sm tracking-widest uppercase active:scale-95"
        >
          <span className="material-symbols-outlined !text-[18px]">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Task'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-surface-container-low custom-scrollbar">
        {isAdding && (
          <div className="mb-8 bg-surface border border-primary-container/30 rounded-sm p-4 shadow-sm animate-in slide-in-from-top-2 duration-200">
             <div className="flex flex-col gap-4">
                <h3 className="text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">New Task</h3>
                <div className="flex gap-4">
                  <input 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 bg-transparent border-b border-outline/10 py-2 text-on-surface focus:outline-none focus:border-primary-container text-[0.9rem] placeholder:text-on-surface-variant/30"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                  />
                  <button 
                    onClick={handleAddTask}
                    disabled={!newTaskTitle.trim()}
                    className="px-6 py-2 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold uppercase tracking-widest disabled:opacity-50"
                  >
                    Create Task
                  </button>
                </div>
             </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-8 h-full min-h-0">
          
          {/* Pending Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Pending
            </h3>
            <div className="space-y-4">
              {pendingTasks.map(task => {
                const styles = getCategoryStyles(task.category);
                return (
                  <div key={task.id} className="bg-surface border border-outline/10 rounded-sm shadow-sm flex items-stretch relative group overflow-hidden transition-all hover:border-primary-container/20 hover:bg-primary-container/[0.02]">
                    <div className="w-1 bg-emerald-500 shrink-0"></div>
                    <div className="flex-1 p-4 pr-12">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm ${styles.bg} ${styles.text} text-[0.65rem] font-bold uppercase tracking-wider`}>
                          <span className="material-symbols-outlined !text-[14px]">{styles.icon}</span>
                          {task.category}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
                          <button onClick={() => handleStartEdit(task)} className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant/40 hover:text-on-surface transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">edit</span>
                          </button>
                          <button onClick={() => handleDeleteTask(task.id)} className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant/40 hover:text-error transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">delete</span>
                          </button>
                          <button onClick={() => handleToggleStatus(task.id)} className="p-1 hover:bg-emerald-500/10 rounded-full text-on-surface-variant/40 hover:text-emerald-500 transition-colors" title="Mark as complete">
                            <span className="material-symbols-outlined !text-[20px]">check_circle</span>
                          </button>
                        </div>
                        <button onClick={() => handleToggleStatus(task.id)} className="material-symbols-outlined !text-[20px] text-on-surface-variant/20 hover:text-emerald-500 transition-colors group-hover:hidden">check_circle</button>
                      </div>

                      {editingId === task.id ? (
                        <div className="flex flex-col gap-2 mt-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-transparent text-[0.95rem] font-bold text-on-surface border-b border-primary-container focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                          />
                          <div className="flex justify-end gap-2 text-[0.7rem] font-bold uppercase">
                            <button onClick={() => setEditingId(null)} className="text-on-surface-variant/40">Cancel</button>
                            <button onClick={() => handleSaveEdit(task.id)} className="text-primary-container">Save</button>
                          </div>
                        </div>
                      ) : (
                        <h4 className="text-[0.95rem] font-bold text-on-surface mb-1">{task.title}</h4>
                      )}
                      
                      <div className="text-[0.75rem] font-medium text-on-surface-variant/60">
                        {task.date} <span className="mx-1.5 opacity-30">•</span> {task.time}
                      </div>
                    </div>
                  </div>
                );
              })}
              {pendingTasks.length === 0 && (
                <div className="py-8 text-center text-on-surface-variant/40 text-[0.85rem] font-medium bg-surface-container/20 rounded-sm italic border border-dashed border-outline/10">
                  No pending tasks
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/20"></span>
              Completed
            </h3>
            <div className="space-y-4">
              {completedTasks.map(task => {
                const styles = getCategoryStyles(task.category);
                return (
                  <div key={task.id} className="bg-surface/60 border border-outline/5 rounded-sm flex items-stretch relative group overflow-hidden transition-all hover:bg-surface-container/20">
                    <div className="w-0.5 bg-outline/10 shrink-0"></div>
                    <div className="flex-1 p-4 pr-12">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-surface-container text-on-surface-variant/40 text-[0.65rem] font-bold uppercase tracking-wider`}>
                          <span className="material-symbols-outlined !text-[14px] opacity-60">{styles.icon}</span>
                          {task.category}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
                           <button onClick={() => handleStartEdit(task)} className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant/30 hover:text-on-surface-variant transition-colors">
                              <span className="material-symbols-outlined !text-[18px]">edit</span>
                           </button>
                           <button onClick={() => handleToggleStatus(task.id)} className="p-1 hover:bg-emerald-500/10 rounded-full text-emerald-500 transition-colors" title="Mark as pending">
                             <span className="material-symbols-outlined !text-[20px]">check_circle</span>
                           </button>
                        </div>
                        <span className="material-symbols-outlined !text-[20px] text-emerald-500 group-hover:hidden">check_circle</span>
                      </div>

                      {editingId === task.id ? (
                        <div className="flex flex-col gap-2 mt-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-transparent text-[0.95rem] font-bold text-on-surface-variant/40 border-b border-outline/20 focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                          />
                          <div className="flex justify-end gap-2 text-[0.7rem] font-bold uppercase">
                            <button onClick={() => setEditingId(null)} className="text-on-surface-variant/30">Cancel</button>
                            <button onClick={() => handleSaveEdit(task.id)} className="text-on-surface-variant/40">Save</button>
                          </div>
                        </div>
                      ) : (
                        <h4 className="text-[0.95rem] font-medium text-on-surface-variant/40 line-through mb-1">{task.title}</h4>
                      )}
                      
                      <div className="text-[0.75rem] font-medium text-on-surface-variant/30">
                        Completed on {task.completedAt || task.date}
                      </div>
                    </div>
                  </div>
                );
              })}
              {completedTasks.length === 0 && (
                <div className="py-8 text-center text-on-surface-variant/30 text-[0.85rem] font-medium bg-surface-container/10 rounded-sm italic border border-dashed border-outline/5">
                  No completed tasks
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TasksTabContent;


