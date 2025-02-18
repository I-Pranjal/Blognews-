import React, { createContext, useState } from 'react';

// Create a context
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [person , setPerson] = useState(null);

  const change =  (newUser) => {
    setPerson(newUser); 
  }

  const reset = () => {
    setPerson(null); 
  }

  return (
    <MyContext.Provider value={{ person , change , reset}}>
        {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
