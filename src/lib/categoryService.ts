
// Sample initial category data
const initialCategories = [
  {
    id: 1,
    name: "drinks",
    description: "Beverages and drinks"
  },
  {
    id: 2,
    name: "food",
    description: "Food items"
  },
  {
    id: 3,
    name: "pastries",
    description: "Pastries and baked goods"
  }
];

export const getCategories = () => {
  try {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      return JSON.parse(storedCategories);
    }
    // Initialize with default categories if not found
    saveCategories(initialCategories);
    return initialCategories;
  } catch (error) {
    console.error('Error getting categories from localStorage', error);
    return initialCategories;
  }
};

export const saveCategories = (categories: any[]) => {
  try {
    localStorage.setItem('categories', JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories to localStorage', error);
  }
};
