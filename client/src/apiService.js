// src/apiService.js
// export async function fetchRecipe(dish) {
//     try {
//       const response = await fetch(`http://localhost:5000/recipe?dish=${encodeURIComponent(dish)}`);
//       if (!response.ok) {
//         throw new Error('Recipe not found');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching recipe:', error);
//       throw error;
//     }
//   }

export const fetchRecipe = async (dishName) => {
  try {
    const response = await fetch(
      `http://localhost:5001/recipe?dish=${encodeURIComponent(dishName)}`,
      {
        method: "GET",
        mode: "cors", // Explicitly set CORS mode
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};
