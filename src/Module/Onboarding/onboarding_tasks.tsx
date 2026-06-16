import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import TaskManager from '../../components/onboarding_dashboard/TaskManager';
import CreateTaskOverlay from '../../components/onboarding_dashboard/CreateTaskOverlay';

const OnboardingTasks: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAddTask = (taskData: any) => {
        console.log('Onboarding Task submitted:', taskData);
        setRefreshTrigger(prev => prev + 1);
        setEditingTask(null);
    };

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden min-h-screen">
            <Sidebar />
            <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Main Content */}
            <main className="main-content mt-10 flex flex-col bg-surface min-h-screen">
                <TaskManager 
                    setIsAdding={setIsAdding} 
                    setEditingTask={setEditingTask}
                    refreshTrigger={refreshTrigger}
                />
            </main>

            {/* Top-level overlays to ensure full viewport coverage */}
            <CreateTaskOverlay 
                isOpen={isAdding || !!editingTask} 
                initialData={editingTask}
                onClose={() => {
                    setIsAdding(false);
                    setEditingTask(null);
                }} 
                onAddTask={handleAddTask} 
            />
        </div>
    );
};

export default OnboardingTasks;
