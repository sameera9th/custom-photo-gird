import React, { createContext, useState } from 'react';

export const DragAndDropItemContext = createContext(); 

export const DragAndDropItemProvider = props => {

    const [dragDropData, setDragDropData] = useState({
        dragTraget: null,
        section: null,
    });

    return(
        <DragAndDropItemContext.Provider value={[dragDropData, setDragDropData]}>
            {props.children}
        </DragAndDropItemContext.Provider>    
    );
};