🛒 **MERN Ecommerce Website**  

A full-featured MERN Stack Ecommerce Web Application with complete user authentication, product management, secure payments, and an admin dashboard.
This project is built to simulate a real-world ecommerce system, focusing on scalability, security, and clean architecture.

🚀 **Features**  

👤 **User Features**  

User Registration & Login (JWT Authentication)
Forgot & Reset Password (Email-based)
Browse Products with Search, Filter & Pagination
Product Details & Reviews
Add to Cart & Checkout
Secure Stripe Payment Integration
Order History & Order Details
User Profile Management

🛠️ **Admin Features**  

Admin Dashboard
Create / Update / Delete Products
Manage Users (Admin/User roles)
Manage Orders & Order Status
Upload Product Images
View Sales & Orders Data

🧰 **Tech Stack**  

**Frontend**  

React.js
Redux Toolkit
React Router
Axios
CSS

**Backend**  

Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
Stripe Payment Gateway
Nodemailer
Cloudinary (Image Storage)

**Tools & Services**  

MongoDB Atlas
Stripe
Render (Deployment)
Git & GitHub

📁 **Project Structure**  

MERN ecommerce  

│
├── backend  
├── controllers
├── models
├── routes
├── middleware
├── utils
 config


├── frontend

│   ├── components/
│   ├── pages/
│   ├── features/
│   ├── redux/
│   └── styles/
│
└── README.md


## 📂 Project Structure
"
MERN-Ecommerce/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── config/
│
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── features/
│   ├── redux/
│   └── styles/
│
│── package.json
│── .gitignore
│── README.md
"

⚙️ **Installation & Setup**  

1️⃣ Clone the Repository

git clone https://github.com/usama247550/MERN-ecommerce.git

cd MERN-ecommerce

2️⃣ Backend Setup
cd backend
npm install

**Create a .env file in backend/config/ and add:**  

PORT=5000  

NODE_ENV=development  

MONGO_URI=your_mongodb_connection_string  

JWT_SECRET=your_jwt_secret

JWT_EXPIRE=5d

COOKIE_EXPIRE=5

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_API_KEY=your_stripe_publishable_key

SMTP_HOST=your_smtp_host

SMTP_PORT=your_smtp_port

SMTP_EMAIL=your_email

SMTP_PASSWORD=your_email_password

CLOUDINARY_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret



**Run backend:**  

npm run dev

3️⃣ **Frontend Setup**  

cd frontend

cd my-app

npm install

npm run dev


💳 **Stripe Test Card**  

Card Number: 4242 4242 4242 4242

Expiry Date: Any future date

CVC: Any 3 digits

🌐 **Deployment**  

Backend & Frontend deployed on Render

Environment variables configured from Render Dashboard

Live Demo: Coming Soon

📸 **Screenshots**
Add screenshots after deployment

👨‍💻 **Author**  

Usama
MERN Stack Developer

GitHub: https://github.com/usama247550

LinkedIn: https://www.linkedin.com/in/usama-javed-112186320

⭐ **Show Your Support**  

If you like this project, give it a ⭐ on GitHub!
