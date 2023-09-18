export const getAgeColor = (age) => {
  if (age < 26) {
    return "green";
  } else if (age < 50) {
    return "purple";
  } else {
    return "orange";
  }
};

// Set item in localStorage
export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get item from localStorage
export const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Remove item from localStorage
export const removeItem = (key) => {
  localStorage.removeItem(key);
};

// Clear all items from localStorage
export const clearAllL = () => {
  localStorage.clear();
};
