import React, { useState } from 'react';

export const TaskContext = React.createContext({
    id: '',
    dscTask: ''
});

export const TaskProvider = props => {
    const [task, setTask] = useState({
        id: '',
        dscTask: ''
    });

    return (
        <TaskContext.Provider value={{task, setTask}}>
            {props.children}
        </TaskContext.Provider>
    );
}