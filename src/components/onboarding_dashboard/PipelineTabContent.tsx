import React, { useState } from 'react';


type StepStatus = 'Pending' | 'In Progress' | 'Completed' | 'Skipped';

interface Step {
  id: string;
  title: string;
  status: StepStatus;
}

interface Phase {
  id: number;
  title: string;
  steps: Step[];
}

const PipelineTabContent: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: 1,
      title: 'Initial Discovery & Kick-off',
      steps: [
        { id: '1-1', title: 'Schedule Kick-off meeting', status: 'Completed' },
        { id: '1-2', title: 'Identify primary stakeholders', status: 'Completed' },
        { id: '1-3', title: 'Define project goals and success metrics', status: 'In Progress' },
      ],
    },
    {
      id: 2,
      title: 'Technical Requirement Analysis',
      steps: [
        { id: '2-1', title: 'Review existing infrastructure', status: 'Pending' },
        { id: '2-2', title: 'Security compliance check', status: 'Pending' },
      ],
    },
    {
      id: 3,
      title: 'Implementation & Configuration',
      steps: [
        { id: '3-1', title: 'Setup staging environment', status: 'Pending' },
        { id: '3-2', title: 'Data migration test', status: 'Pending' },
      ],
    },
  ]);

  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editStepTitle, setEditStepTitle] = useState('');
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);

  const currentPhase = phases[currentPhaseIndex];

  const handleAddStep = () => {
    if (!newStepTitle.trim()) return;
    const newStep: Step = {
      id: `${currentPhase.id}-${Date.now()}`,
      title: newStepTitle,
      status: 'Pending',
    };
    const updatedPhases = [...phases];
    updatedPhases[currentPhaseIndex].steps.push(newStep);
    setPhases(updatedPhases);
    setNewStepTitle('');
    setIsAddingStep(false);
  };

  const handleUpdateStatus = (id: string, status: StepStatus) => {
    const updatedPhases = phases.map(phase => ({
      ...phase,
      steps: phase.steps.map(step => step.id === id ? { ...step, status } : step)
    }));
    setPhases(updatedPhases);
    setOpenStatusDropdownId(null);
  };

  const handleDeleteStep = (id: string) => {
    const updatedPhases = phases.map(phase => ({
      ...phase,
      steps: phase.steps.filter(step => step.id !== id)
    }));
    setPhases(updatedPhases);
  };

  const handleStartEdit = (step: Step) => {
    setEditingStepId(step.id);
    setEditStepTitle(step.title);
  };

  const handleSaveEdit = (id: string) => {
    const updatedPhases = phases.map(phase => ({
      ...phase,
      steps: phase.steps.map(step => step.id === id ? { ...step, title: editStepTitle } : step)
    }));
    setPhases(updatedPhases);
    setEditingStepId(null);
  };

  const getPhaseStatus = (phase: Phase) => {
    const statuses = phase.steps.map(s => s.status);
    if (statuses.length === 0) return 'Empty';
    if (statuses.every(s => s === 'Completed')) return 'Completed';
    if (statuses.some(s => s === 'In Progress')) return 'In Progress';
    if (statuses.every(s => s === 'Pending')) return 'Pending';
    return 'In Progress';
  };

  const getStatusStyles = (status: StepStatus) => {
    switch (status) {
      case 'Completed': return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', dot: 'bg-emerald-500' };
      case 'In Progress': return { bg: 'bg-primary-container/10', text: 'text-primary-container', border: 'border-primary-container/20', dot: 'bg-primary-container' };
      case 'Skipped': return { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', dot: 'bg-orange-500' };
      default: return { bg: 'bg-on-surface-variant/5', text: 'text-on-surface-variant/60', border: 'border-on-surface-variant/10', dot: 'bg-on-surface-variant/40' };
    }
  };

  const phaseStatus = getPhaseStatus(currentPhase);
  const phaseStatusStyles = getStatusStyles(phaseStatus as StepStatus);

  return (
    <div className="flex flex-col h-full bg-surface animate-in fade-in duration-300 overflow-hidden">
      {/* Top Phase Indicator */}
      <div className="p-6 border-b border-outline/10 flex items-center justify-between sticky top-0 z-20 bg-surface">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button 
              disabled={currentPhaseIndex === 0}
              onClick={() => setCurrentPhaseIndex(prev => prev - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-outline/10 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/5 disabled:opacity-30 transition-all"
            >
              <span className="material-symbols-outlined !text-[20px]">chevron_left</span>
            </button>
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-0.5">Active Phase</span>
              <div className="flex items-center gap-3">
                <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight leading-none">Phase {currentPhase.id}</h2>
                <div className={`px-2 py-0.5 rounded-sm text-[0.6rem] font-bold uppercase tracking-wider border ${phaseStatusStyles.bg} ${phaseStatusStyles.text} ${phaseStatusStyles.border}`}>
                  {phaseStatus}
                </div>
              </div>
            </div>
            <button 
              disabled={currentPhaseIndex === phases.length - 1}
              onClick={() => setCurrentPhaseIndex(prev => prev + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-outline/10 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/5 disabled:opacity-30 transition-all"
            >
              <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
            </button>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {phases.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentPhaseIndex ? 'w-10 bg-primary-container' : 'w-2 bg-outline/10'}`} 
              />
            ))}
          </div>
        </div>

        <button 
          onClick={() => setIsAddingStep(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-all shadow-sm tracking-widest uppercase active:scale-95"
        >
          <span className="material-symbols-outlined !text-[18px]">add</span>
          Step
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-surface custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8 pb-40">
          
          {/* Section Header */}
          <div className="flex justify-between items-end border-b border-outline/10 pb-4 mb-8">
            <div className="flex flex-col gap-1">
              <div className="text-[0.7rem] font-bold text-primary-container uppercase tracking-widest">Current Milestones</div>
              <h3 className="text-[1.75rem] font-bold text-on-surface tracking-tight leading-tight">{currentPhase.title}</h3>
            </div>
            <div className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">
              {currentPhase.steps.filter(s => s.status === 'Completed').length} of {currentPhase.steps.length} Steps Done
            </div>
          </div>

          {/* Add Step Inline */}
          {isAddingStep && (
            <div className="bg-surface border border-outline/10 rounded-sm p-5 mb-8 shadow-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">New Implementation Step</h4>
                  <button onClick={() => setIsAddingStep(false)} className="text-on-surface-variant/40 hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined !text-[18px]">close</span>
                  </button>
                </div>
                <div className="flex gap-4">
                  <input 
                    autoFocus
                    value={newStepTitle}
                    onChange={(e) => setNewStepTitle(e.target.value)}
                    placeholder="Describe the milestone or task..."
                    className="flex-1 bg-transparent py-2 border-b border-outline/10 text-on-surface focus:outline-none focus:border-primary-container text-[0.95rem] transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
                  />
                  <button 
                    onClick={handleAddStep}
                    disabled={!newStepTitle.trim()}
                    className="px-6 py-2 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold uppercase tracking-widest disabled:opacity-50 transition-all"
                  >
                    Create Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Steps List */}
          <div className="space-y-4">
            {currentPhase.steps.length > 0 ? (
              currentPhase.steps.map((step) => {
                const styles = getStatusStyles(step.status);
                return (
                  <div 
                    key={step.id} 
                    className="group bg-surface border border-outline/10 rounded-sm flex items-stretch transition-all duration-200 hover:border-primary-container/20 hover:bg-primary-container/[0.02]"
                  >
                    <div className={`w-1 transition-colors duration-300 shrink-0 ${styles.dot}`} />
                    <div className="flex-1 p-4 pr-6 flex items-center justify-between gap-6 relative">
                      
                      <div className="flex-1 flex items-center gap-4">
                        {/* Status Dot */}
                        <div className="relative flex items-center justify-center shrink-0">
                          <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                          {step.status === 'In Progress' && (
                            <div className={`absolute w-2 h-2 rounded-full ${styles.dot} animate-ping opacity-75`} />
                          )}
                        </div>

                        {editingStepId === step.id ? (
                          <div className="flex-1 flex flex-col gap-2 mt-2 animate-in fade-in duration-200">
                            <input 
                              autoFocus
                              value={editStepTitle}
                              onChange={(e) => setEditStepTitle(e.target.value)}
                              className="w-full bg-transparent py-1 border-b border-primary-container text-[0.95rem] font-bold text-on-surface focus:outline-none"
                              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(step.id)}
                            />
                            <div className="flex justify-end gap-3 text-[0.7rem] font-bold uppercase">
                              <button onClick={() => setEditingStepId(null)} className="text-on-surface-variant/40 hover:text-on-surface">Cancel</button>
                              <button onClick={() => handleSaveEdit(step.id)} className="text-primary-container">Save Changes</button>
                            </div>
                          </div>
                        ) : (
                          <span className={`text-[0.95rem] font-bold tracking-tight transition-all ${step.status === 'Completed' ? 'text-on-surface-variant/40 line-through' : 'text-on-surface'}`}>
                            {step.title}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        {/* Status Dropdown */}
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenStatusDropdownId(openStatusDropdownId === step.id ? null : step.id);
                            }}
                            className={`flex items-center gap-2 px-3 py-1 border transition-all ${styles.bg} ${styles.text} ${styles.border} hover:opacity-80`}
                          >
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider">{step.status}</span>
                            <span className="material-symbols-outlined !text-[16px] opacity-40">expand_more</span>
                          </button>
                          
                          {openStatusDropdownId === step.id && (
                            <>
                              <div className="fixed inset-0 z-[100]" onClick={() => setOpenStatusDropdownId(null)} />
                              <div className="absolute right-0 top-full mt-1 w-48 bg-surface-container-high border border-outline/10 shadow-2xl rounded-sm py-1 z-[110] animate-in fade-in slide-in-from-top-1 duration-200">
                                {(['Pending', 'In Progress', 'Completed', 'Skipped'] as StepStatus[]).map((status) => {
                                  const sStyles = getStatusStyles(status);
                                  return (
                                    <button
                                      key={status}
                                      onClick={() => handleUpdateStatus(step.id, status)}
                                      className="w-full px-4 py-2.5 text-left text-[0.75rem] font-bold text-on-surface hover:bg-primary-container/10 hover:text-primary-container flex items-center gap-2 border-l-2 border-transparent hover:border-primary-container transition-all"
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full ${sStyles.dot}`} />
                                      {status}
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleStartEdit(step)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface-variant/40 hover:text-on-surface hover:bg-surface-container rounded-full transition-all"
                          >
                            <span className="material-symbols-outlined !text-[18px]">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteStep(step.id)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface-variant/40 hover:text-error hover:bg-error/10 rounded-full transition-all"
                          >
                            <span className="material-symbols-outlined !text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant/20 border-2 border-dashed border-outline/5 rounded-sm">
                <span className="material-symbols-outlined !text-[64px] mb-4">checklist</span>
                <p className="text-[1.15rem] font-bold tracking-tight uppercase">No steps in this phase</p>
                <button onClick={() => setIsAddingStep(true)} className="mt-4 text-[0.7rem] font-black text-primary-container hover:underline uppercase tracking-widest">Add your first step</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineTabContent;
