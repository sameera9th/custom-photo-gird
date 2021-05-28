import React, { createContext, useState } from 'react';
import { useSelector } from "react-redux";

export const DragAndDropClickContext = createContext(); 

export const DragAndDropClickProvider = props => {
    
    const { user } = useSelector((state) => state.user);

    const [isClickOnMovie, setIsClickOnMovie] = useState(false);

    return(
        <DragAndDropClickContext.Provider value={[isClickOnMovie, setIsClickOnMovie, user]}>
            {props.children}
        </DragAndDropClickContext.Provider>    
    );
};