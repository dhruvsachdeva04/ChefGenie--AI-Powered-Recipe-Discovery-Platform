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

// The base URL for your deployed backend on Render
const API_BASE_URL =
  "https://chefgenie-ai-powered-recipe-discovery.onrender.com";

export const fetchRecipe = async (dishName) => {
  try {
    // Use the live backend URL for the fetch request
    const response = await fetch(
      `${API_BASE_URL}/recipe?dish=${encodeURIComponent(dishName)}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Try to parse error message from backend if available
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error; // Re-throw the error so the component can handle it
  }
};
