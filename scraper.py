import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementNotInteractableException
import time
import re
import requests
from selenium.webdriver.common.keys import Keys

API_KEY = "AIzaSyCX91OUpqWbRhJuv-VAK2iVA8a-MtztG08"  # Replace with your actual API key

app = Flask(__name__)

# More specific CORS configuration
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Debug middleware to check headers
@app.after_request
def after_request(response):
    print(f"Request origin: {request.headers.get('Origin', 'No origin')}")
    print(f"Response headers: {dict(response.headers)}")
    return response

# Explicit OPTIONS handler for preflight requests
@app.route('/recipe', methods=['OPTIONS'])
def handle_recipe_options():
    response = jsonify({'status': 'OK'})
    return response

def split_recipe(recipe_text):
    # Try splitting at 'INSTRUCTIONS' or 'Instructions' only
    parts = re.split(r'INSTRUCTIONS|Instructions', recipe_text, maxsplit=1)
    
    if len(parts) != 2:
        return None, None  # If no section marker is found
    
    # Determine which marker was used for instructions
    match = re.search(r'(INSTRUCTIONS|Instructions)', recipe_text)
    if match:
        instructions_marker = match.group(0)
    else:
        instructions_marker = 'INSTRUCTIONS'
    
    ingredients = parts[0].strip()
    instructions = instructions_marker + parts[1].strip()
    
    # Clean up the ingredients
    ingredients = ingredients.replace('INGREDIENTS', '\n', 1)
    ingredients = ingredients.replace('**Ingredients:**', '\n', 1)
    ingredients = ingredients.replace('•', '\n•').strip()
    
    # Clean up the instructions
    instructions = instructions.replace('INSTRUCTIONS', '\n', 1)
    instructions = instructions.replace(':**', '\n', 1)
    instructions = instructions.replace('•', '\n•').strip()
    
    return ingredients, instructions

def scrape_recipe(dish):
    print(f"🔍 Starting web scraping for: {dish}")
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Re-enable headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920x1080")
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
        # Alternative: Use full path if needed
        # driver = webdriver.Chrome(executable_path='/opt/homebrew/bin/chromedriver', options=chrome_options)
        print("✅ Chrome driver initialized successfully")
    except Exception as e:
        print(f"❌ Failed to initialize WebDriver: {str(e)}")
        return {"error": f"Failed to initialize WebDriver: {str(e)}"}
    
    try:
        url = 'https://www.indianhealthyrecipes.com/'
        print(f"🌐 Navigating to: {url}")
        driver.get(url)
        
        wait = WebDriverWait(driver, 10)
        
        print("🔍 Looking for search button...")
        try:
            # First, let's see what buttons are available
            all_buttons = driver.find_elements(By.TAG_NAME, 'button')
            print(f"🔍 Found {len(all_buttons)} buttons on the page")
            for i, btn in enumerate(all_buttons[:5]):  # Show first 5 buttons
                print(f"   Button {i}: '{btn.text}' (class: {btn.get_attribute('class')})")
            
            # Add a small delay to let the page load
            time.sleep(2)
            
            # Try to find and click the search toggle button directly
            search_toggles = driver.find_elements(By.CLASS_NAME, 'search-toggle-open')
            if search_toggles:
                print(f"🔍 Found {len(search_toggles)} search toggle buttons")
                # Use JavaScript to click the button
                driver.execute_script("arguments[0].click();", search_toggles[0])
                print("✅ Search button clicked with JavaScript")
            else:
                # Fallback to waiting for clickable
                search_toggle = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'search-toggle-open')))
                search_toggle.click()
                print("✅ Search button clicked (waited)")
        except Exception as e:
            print(f"❌ Error finding search button: {str(e)}")
            # Let's also check for other possible search elements
            try:
                search_links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="search"]')
                print(f"🔍 Found {len(search_links)} search links")
                search_forms = driver.find_elements(By.TAG_NAME, 'form')
                print(f"🔍 Found {len(search_forms)} forms")
                search_inputs = driver.find_elements(By.CSS_SELECTOR, 'input[type="search"], input[placeholder*="search"]')
                print(f"🔍 Found {len(search_inputs)} search inputs")
            except Exception as debug_e:
                print(f"❌ Debug error: {str(debug_e)}")
            raise e
        
        print("🔍 Looking for search box...")
        try:
            search_box = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'search-field')))
            search_box.send_keys(dish)
            print(f"✅ Typed '{dish}' in search box")
        except Exception as e:
            print(f"❌ Error finding search box: {str(e)}")
            # Try alternative selectors
            try:
                search_box = driver.find_element(By.CSS_SELECTOR, 'input[type="search"], input[placeholder*="search"], input[name*="search"]')
                search_box.send_keys(dish)
                print(f"✅ Typed '{dish}' in alternative search box")
            except Exception as alt_e:
                print(f"❌ Alternative search box also failed: {str(alt_e)}")
                # Try one more approach - look for any input field
                try:
                    search_box = driver.find_element(By.TAG_NAME, 'input')
                    search_box.send_keys(dish)
                    print(f"✅ Typed '{dish}' in generic input field")
                except Exception as final_e:
                    print(f"❌ All search box attempts failed: {str(final_e)}")
                    raise e
        
        print("🔍 Looking for search submit button...")
        try:
            search_submit = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'search-submit')))
            search_submit.click()
            print("✅ Search submitted")
        except Exception as e:
            print(f"❌ Error finding search submit: {str(e)}")
            # Try alternative submit methods
            try:
                # Try pressing Enter on the search box
                search_box.send_keys(Keys.RETURN)
                print("✅ Search submitted with Enter key")
            except Exception as enter_e:
                print(f"❌ Enter key also failed: {str(enter_e)}")
                raise e
        
        print("🔍 Looking for search results...")
        search_results = driver.find_elements(By.TAG_NAME, 'a')
        print(f"📊 Found {len(search_results)} links on the page")
        
        recipe_found = False
        
        for i, result in enumerate(search_results):
            result_text = result.text.strip()
            if result_text and dish.lower() in result_text.lower():
                recipe_link = result.get_attribute("href")
                print(f"🎯 Found matching recipe: '{result_text}' -> {recipe_link}")
                driver.get(recipe_link)
                recipe_found = True
                
                print("🔍 Extracting recipe content...")
                visible_text = driver.find_element(By.TAG_NAME, 'body').text
                print(f"📄 Page text length: {len(visible_text)} characters")
                
                # Look for 'INGREDIENTS' only as the start marker
                start_index = visible_text.find("INGREDIENTS")
                
                end_index = visible_text.find("NOTES")
                if end_index == -1:
                    end_index = visible_text.find("VIDEO")
                if end_index == -1:
                    end_index = visible_text.find("NUTRITION INFO")
                
                print(f"📍 Start marker found at index: {start_index}")
                print(f"📍 End marker found at index: {end_index}")
                
                if start_index != -1 and end_index != -1:
                    ingredients_text = visible_text[start_index:end_index].strip()
                    print(f"📝 Extracted text length: {len(ingredients_text)} characters")
                    print(f"📝 First 200 chars: {ingredients_text[:200]}...")
                    
                    ingredients_text = re.sub(r'▢\s*\n*', ' • ', ingredients_text)
                    ingredients_text = ingredients_text.replace("INGREDIENTS ", "\n", 1)
                    # Add a line break before section markers
                    ingredients_text = re.sub(r'(INSTRUCTIONS)', r'\1\n', ingredients_text)
                    
                    ingredients, instructions = split_recipe(ingredients_text)
                    
                    if ingredients and instructions:
                        print("✅ Successfully extracted recipe!")
                        return {
                            "recipe_link": recipe_link,
                            "ingredients": ingredients,
                            "instructions": instructions,
                        }
                    else:
                        print("❌ Failed to split recipe into ingredients and instructions")
                        return {"error": "Failed to parse recipe sections"}
                else:
                    print(f"❌ Couldn't find section markers. Start: {start_index}, End: {end_index}")
                    return {"error": "Couldn't find 'INGREDIENTS' or the end marker in the visible text."}
        
        if not recipe_found:
            print(f"❌ No matching recipe found for '{dish}'")
            return {"error": "No matching recipe found."}
    
    except Exception as e:
        print(f"❌ An error occurred: {str(e)}")
        print(f"📋 Full traceback: {traceback.format_exc()}")
        return {"error": f"An error occurred: {str(e)}\n{traceback.format_exc()}"}
    
    finally:
        driver.quit()
        print("🔒 Chrome driver closed")

def fetch_dishes(dish):
    # Fixed: Updated to use gemini-1.5-flash instead of deprecated gemini-pro
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "contents": [
            {
                "parts": [
                    {"text": f"Give me recipe of Indian dish: {dish} with just Ingredients and Instructions?"}
                ]
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        
        response_data = response.json()
        recipe = response_data['candidates'][0]['content']['parts'][0]['text']
        
        # Optional: Save to file for debugging
        file_path = "temp_recipe.txt"
        with open(file_path, 'w') as file:
            file.write(recipe)
        
        ingredients, instructions = split_recipe(recipe)
        
        return {
            "ingredients": ingredients,
            "instructions": instructions,
        }        
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return {"error": f"HTTP error: {http_err}"}
    except Exception as err:
        print(f"Error occurred: {err}")
        return {"error": f"Error: {err}"}
        

@app.route('/recipe', methods=['GET'])
def get_recipe():
    dish = request.args.get('dish')
    if not dish:
        return jsonify({"error": "Please provide a dish name."}), 400
    
    print(f"Searching for recipe: {dish}")  # Debug log
    
    # Try web scraping first
    result = scrape_recipe(dish)
    
    # If scraping fails, try Gemini API
    if "error" in result:
        print("Web scraping failed, trying Gemini API...")
        result = fetch_dishes(dish)
    
    if "error" in result:
        return jsonify(result), 404
    else:
        return jsonify(result), 200

@app.route('/')
def home():
    return "Welcome to the Recipe Scraper API. Use /recipe?dish=DISH_NAME to get a recipe."

@app.route('/test-cors')
def test_cors():
    return jsonify({"message": "CORS is working!", "origin": request.headers.get('Origin', 'No origin')})

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')