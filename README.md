### Pune Voyager 

Pune Voyager is a full-stack web application designed to help users explore and learn about various places in Pune. 
The platform provides detailed information about places, allows users to browse through them easily and share their thoughts through comments, creating an interactive exploration experience.

### 🚀 Project Overview :
Pune Voyager aims to make discovering places in Pune simple and engaging. 
Users can view information about different locations, read descriptions and interact with the platform through a clean and intuitive interface. 
The project follows a modular full-stack architecture with a clear separation between frontend and backend.

### ✨ Features:
▪️Explore various places in Pune  
▪️View detailed information about each place  
▪️User authentication (Signup & Login)  
▪️Comment and share opinions about places  
▪️Responsive and user-friendly UI  
▪️Clean separation of frontend and backend  

### 🔧 Tech Stack:
🔹Frontend: React.js  
🔹Backend: Node.js, Express.js  
🔹Database: MongoDB Atlas  
🔹Deployment: Render (backend) & Vercel (frontend)  

### 📁 Project Structure:
```PuneVoyager/
├── backend/                     # Backend (Node.js + Express)
│   ├── library/                 # Utility / helper functions
│   ├── models/                  # Mongoose schemas
│   │   ├── Place.js
│   │   └── User.js
│   ├── routes/                  # API route definitions
│   ├── app.js                   # Express app configuration
│   ├── database.js              # Database connection setup
│   ├── index.js                 # Server entry point
│   ├── seedPlaces.js            # Script to seed place data
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                    # Frontend (React.js)
│   ├── public/
│   │   ├── images/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── PlaceCard.js
│   │   │   └── PlacesList.js
│   │   │
│   │   ├── pages/               # Application pages
│   │   │   ├── HomePage.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── PlaceDetail.js
│   │   │
│   │   ├── data/
│   │   │   └── places.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```
### 🧠 Technical Highlights:
- Implemented user authentication to restrict actions such as commenting  
- Designed and developed RESTful APIs for places, users, and comments  
- Used environment-based API configuration to connect frontend and backend across development and production environments  
- Managed secure application configuration using environment variables  

### ⚙️ Setup Notes:
This project follows a standard MERN stack architecture with a clear separation between frontend and backend.  
Environment variables are used for configuration and security purposes.  
Detailed backend and frontend setup steps are intentionally omitted, as this project is intended primarily for demonstration and portfolio presentation.  

### 🔐 Environment Variables:
This project uses environment variables to manage configuration and sensitive information securely. All `.env` files are excluded from version control using `.gitignore`.  
🔹Frontend:  
- REACT_APP_API_URL:   
  Specifies the base URL of the backend API that the React frontend communicates with.  
  This allows seamless switching between development and production environments.  
🔹Backend  
- MONGO_URI:      
  MongoDB connection string used to connect the backend server to the database.  
- PORT:    
  Defines the port on which the backend server runs.  
Using environment-based configuration helps maintain security, scalability, and clean separation between development and production setups.  

### 🌐 Live Deployment:  
Live Application: https://pune-voyager.vercel.app/  
This project is deployed to demonstrate real-world full-stack architecture and application flow.  

### 📌 Notes:    
This project follows a modular frontend-backend architecture commonly used in scalable full-stack web applications.  

⭐ If you like this project, feel free to star the repository!  
