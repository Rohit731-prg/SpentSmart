💰 SpentSmart – AI-Powered Financial Management System
🚀 Overview

SpentSmart is a full-stack financial management application that helps users track their expenses and investments while providing AI-powered financial insights.

Unlike traditional expense trackers, SpentSmart goes beyond simple CRUD operations by integrating machine learning models (scikit-learn) to analyze spending behavior and suggest smarter financial decisions.
✨ Features
🔐 Authentication System

    User Signup & Login
    Secure Password Handling

💸 Expense Management

    Add, Edit, Delete expenses
    Categorized expense tracking
    Monthly expense tracking

📈 Investment Tracking

    Add and manage investments
    Track total investment value
    Monthly investment summary

📊 Dashboard Analytics

    Total Remaining Balance
    Total Expense & Investment Overview
    Monthly insights

🤖 AI Financial Insights (Core Feature)

    Savings Recommendations based on spending habits
    Investment Suggestions
    ML-powered predictions using scikit-learn

🧠 Machine Learning Integration

SpentSmart uses custom-trained models built with scikit-learn to analyze user financial data.
🔍 What the model does:

    Predicts spending patterns
    Suggests optimal saving strategies
    Provides smart investment recommendations

⚙️ ML Workflow:

    Data collection from user transactions
    Feature extraction (expenses, categories, time)
    Model training using sklearn
    Prediction generation
    Display insights in UI

    ⚠️ Note: The model is trained on user-specific data for personalized recommendations.

🛠️ Tech Stack
Frontend

    React.js / React Native
    Tailwind CSS

Backend

    Node.js
    Express.js
    MongoDB (Mongoose)

Machine Learning

    Python
    scikit-learn

Other Tools

    Axios
    JWT (if implemented)
    Nodemailer (for email verification)

📁 Project Structure

SpentSmart/
│
├── client/               # Frontend (React / React Native)
├── server/               # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│
├── ml-model/             # Machine Learning scripts
│   ├── training.py
│   ├── model.pkl
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/Rohit731-prg/SpentSmart.git
cd SpentSmart

2️⃣ Setup Backend

cd server
npm install
npm run dev

3️⃣ Setup Frontend

cd client
npm install
npm run dev

4️⃣ Setup Environment Variables

Create .env file in backend:

MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SCERET_KEY=your_email

5️⃣ Run ML Model (if required)
📸 Screenshots
🔐 Login Page

    Clean authentication UI

📊 Dashboard

    Balance overview
    Expense & Investment summary

💼 Investment Section

    Track and manage investments

🧾 Expense Section

    Daily expense tracking

🚀 Future Improvements

    📊 Data Visualization
    📱 Fully optimized mobile UI
    ☁️ Deployment (Vercel + Render)
    🔐 Advanced Security (Rate limiting, refresh tokens)

🧪 Use Cases

    Personal finance tracking
    Budget planning
    Expense behavior analysis
    Smart savings recommendations

🎯 Why This Project Stands Out

    Combines MERN Stack + Machine Learning
    Real-world financial use case
    Goes beyond CRUD with intelligent predictions
    Demonstrates full-stack + AI capability

👨‍💻 Author

Rohit Singha

    Passionate Full Stack Developer
    MERN Stack | Machine Learning Integration

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!