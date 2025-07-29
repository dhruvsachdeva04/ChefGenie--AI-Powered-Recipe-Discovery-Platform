import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCX91OUpqWbRhJuv-VAK2iVA8a-MtztG08"; // Replace with your actual Gemini API key

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getDishSuggestions(ingredients) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Suggest 5 Indian dishes that can be made using some or all of these ingredients: ${ingredients}. Only provide the names of the dishes, separated by commas.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text.split(',').map(dish => dish.trim());
}
