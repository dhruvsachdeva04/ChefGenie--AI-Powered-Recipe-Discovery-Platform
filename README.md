 ChefGenie: Your Personal Kitchen Assistant

Transform Simple Ingredients into Culinary Masterpieces!

Ever found yourself staring at your pantry, wondering what to cook? Recipify is here to solve that daily dilemma! Input whatever ingredients you have on hand, and watch as our intelligent system generates an array of delectable dish recommendations. But we don't stop there—each suggested recipe comes complete with detailed, easy-to-follow cooking instructions. Say goodbye to recipe hunting and hello to stress-free cooking adventures. Let Recipify guide you through your culinary journey with confidence and creativity!

 ✨ What Makes Recipify Special

- Intelligent Ingredient Analysis**: Feed in your available ingredients and receive personalized culinary suggestions
- Advanced AI Integration**: Powered by Google's Gemini AI for smart, context-aware recipe recommendations
- Comprehensive Recipe Details**: Every dish suggestion includes complete ingredient lists and detailed preparation steps
- Real-Time Recipe Fetching**: Automatically retrieves fresh recipes from trusted culinary websites
- Sleek Modern Interface**: Crafted with cutting-edge web technologies for optimal user experience
- Curated Recipe Collection**: Browse through popular and trending Indian cuisine favorites
- Seamless Search Experience**: Intuitive search functionality with instant results

 🔧 Built With Modern Technology

 Client-Side Architecture
- React.js - Component-based UI framework for dynamic user interfaces
- Vite.js - Lightning-fast development environment and build system
- React Router DOM - Seamless navigation and routing capabilities
- Modern CSS - Responsive design with contemporary styling
- Google Generative AI SDK - Advanced AI for intelligent recipe suggestions

 Server-Side Infrastructure
- Flask Framework - Lightweight Python web framework for API services
- Selenium WebDriver - Automated web scraping for recipe collection
- Google Gemini API - State-of-the-art AI for recipe generation
- Flask-CORS - Cross-origin request handling for seamless integration

 📦 Installation Requirements

Make sure your system has these essential tools:

- Python 3.7 or higher** - [Install Python](https://www.python.org/downloads/)
- Node.js 16 or newer** - [Get Node.js](https://nodejs.org/)
- npm package manager** - Included with Node.js installation
- Google Chrome Browser** - Essential for web scraping functionality
- ChromeDriver executable** - Browser automation driver
- Google Gemini API credentials** - [Obtain API key](https://makersuite.google.com/app/apikey)

 🚀 Getting Started Guide
 Step 1: Download the Project

```bash
git clone <repository-url>
cd recipy/Recipify
```

 Step 2: Install Dependencies

 Python Backend Setup
```bash
cd server
pip install -r requirements.txt
```

 JavaScript Frontend Setup
```bash
cd ../client
npm install
```

 Step 3: Configure API Access

 Frontend API Configuration
1. Navigate to `client/src/geminiService.jsx`
2. Update line 3 with your API credentials:
```javascript
const API_KEY = "YOUR_ACTUAL_GEMINI_API_KEY";
```

 Backend API Configuration
1. Open `server/scraper.py`
2. Replace the API key on line 15:
```python
API_KEY = "YOUR_ACTUAL_GEMINI_API_KEY"
```

 Step 4: Launch Backend Services

```bash
cd server
python scraper.py
```

Alternative command if needed:
```bash
python3 scraper.py
```

Backend will be accessible at `http://localhost:5001`

### Step 5: Initialize Frontend Development Server

Open a separate terminal and navigate to the client directory:

```bash
cd client
npm run dev
```

Frontend will be available at `http://localhost:5173`

 Step 6: Begin Your Culinary Journey

1. Launch your preferred web browser
2. Visit `http://localhost:5173`
3. Start discovering amazing recipes with Recipify!

🎮 User Guide

1. Input Your Ingredients: Simply type in the food items you have available
2. Receive Smart Suggestions: Our AI analyzes your ingredients and suggests perfect dishes
3. Explore Detailed Recipes: Click any suggestion to view complete cooking instructions
4. Cook with Ease**: Follow the clear, step-by-step guidance to create delicious meals

 🎯 Core Functionality

 Intelligent Recipe Discovery
- AI-driven ingredient analysis and matching
- Personalized culinary recommendations
- Authentic Indian cuisine focus

 Comprehensive Recipe Management
- Detailed ingredient specifications
- Step-by-step cooking methodology
- Source verification and credibility

