// src/context/ListContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Create the empty context "box"
const ListContext = createContext();

// 2. Create a "Provider" component. This is the "truck"
//    that holds the data and delivers it to all its children.
export const ListProvider = ({ children }) => {
  // This is the global state for the user's list
  const [myList, setMyList] = useState([]);

  // Function to add a movie to the list
  const addToList = (movie) => {
    // Check if the movie is already in the list
    if (!myList.find(item => item.id === movie.id)) {
      setMyList([...myList, movie]);
      
    } else {
      alert("This is already on your list.");
    }
  };

  // Function to remove a movie from the list
  const removeFromList = (movieId) => {
    setMyList(myList.filter(item => item.id !== movieId));
  };

  const isInList = (movieId) => {
    return !!myList.find(item => item.id === movieId);
  };

  // 3. This is the "value" we are providing to all components
  const value = {
    myList,
    addToList,
    removeFromList,
    isInList
  };

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
};

// 4. Create a custom hook. This is the "key" that lets
//    our components easily access the context.
export const useList = () => {
  return useContext(ListContext);
};