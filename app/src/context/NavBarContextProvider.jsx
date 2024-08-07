import React, { useState } from 'react';
import NavBarContext from './NavBarContext';

const NavBarContextProvider = ({children}) => {
    const [slider,setSlider]=useState('getJob');
    return (
        <div>
            <NavBarContext.Provider value={{slider,setSlider}}>
            {children}
            </NavBarContext.Provider>
        </div>
    );
};

export default NavBarContextProvider;