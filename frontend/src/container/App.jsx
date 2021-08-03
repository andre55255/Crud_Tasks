import React from 'react';
import Routes from '../routes/Routes';

import { AuthProvider } from '../provider/auth';
import { TaskProvider } from '../provider/task';

export default function App() {
    return (
        <AuthProvider>
            <TaskProvider>
                <Routes />
            </TaskProvider>
        </AuthProvider>
    );
}
