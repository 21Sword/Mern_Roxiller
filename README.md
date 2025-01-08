
# MERN Transactions Dashboard

A comprehensive and interactive **Transactions Dashboard** built using the **MERN stack** (MongoDB, Express, React, Node.js). This project allows users to visualize transaction data through statistics, tables, and charts. It also supports dynamic data filtering based on month selection.

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
   git clone https://github.com/21Sword/Mern_Roxiller.git
   <br>
   cd repository-name

2. **Install dependencies:**
   - Install server dependencies:
     cd backend
     <br>
     npm run dev

   - Install client dependencies:
     cd frontend
     <br>
     npm start
    

3. **Configure environment variables:**
   - Create a `.env` file in the server directory with the following values:
     MONGO_URI=YOUR_MONGODB_URL
     PORT=5000

4. **Run the application:**
   - Start the backend server:
     cd backend
     -- First Run seedDatabase.js
     command -> node utils/seedDatabase.js
     npm run dev

   - Start the frontend server:
     cd frontend
     npm start
