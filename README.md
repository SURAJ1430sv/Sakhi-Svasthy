## 🌸 Sakhi-Svasthy

A women-centric health and wellness platform designed to empower women with easy access to medical resources, health tracking, and awareness tools.

## 📜 Description

Sakhi-Svasthy is a digital health solution focused on providing women with a safe, supportive, and accessible platform for managing their physical and mental well-being.
The project was built with the motivation to address the lack of dedicated healthcare platforms for women, where they can not only track health records but also find guidance, awareness, and community support.

It aims to solve problems such as:
Limited awareness of women’s health issues in rural and urban areas.
Difficulty in accessing personalized healthcare resources.
Lack of digital platforms combining education, tracking, and doctor consultation for women.

## ✨ Images and Key Features 

User Authentication: Secure login & registration for personalized access.
<img width="1568" height="829" alt="image" src="https://github.com/user-attachments/assets/cf19545e-4a3c-4435-a540-4cac753aa975" />

Health Records Management: Track and manage health history easily.
<img width="1570" height="861" alt="image" src="https://github.com/user-attachments/assets/c11d62a4-85bc-4e68-9d5e-914e14687acc" />

Awareness Hub: Articles, blogs, and resources on women’s health & wellness.
<img width="1544" height="909" alt="image" src="https://github.com/user-attachments/assets/3dca45ed-3322-4897-ac54-dc69e2e345ad" />

Consultation Support: Option to connect with healthcare providers (extendable).
<img width="1537" height="825" alt="image" src="https://github.com/user-attachments/assets/097e6536-b19c-4ccf-a4e4-91a4dbcaf0e6" />

Responsive UI: Accessible on mobile and desktop for maximum usability.
<img width="1616" height="907" alt="image" src="https://github.com/user-attachments/assets/5730f016-6c1a-4e4f-8230-a87045b566c2" />

Community Features (Optional): Safe space for discussions and Q&A.

## 🛠️ Tech Stack

## 🛠️ Tech Stack

* **Frontend:** React.js (TypeScript), Tailwind CSS, Axios  
* **Backend:** Node.js, Express.js  
* **Database:** Neon db 
* **Authentication:** JWT-based secure login system  
* **APIs:** RESTful API integration  
* **Version Control:** Git & GitHub  

---

## 🚀 Getting Started

Follow these steps to set up **Sakhi-Svasthya** locally.

### 🧩 Prerequisites

Make sure you have the following installed:
* Node.js (v18 or later)  
* MongoDB (running locally or MongoDB Atlas)  
* Git  

---

### ⚙️ Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/SURAJ1430sv/ArogyaSakhi.git
    ```

2. Navigate to the project directory:
    ```bash
    cd ArogyaSakhi
    ```

3. Install dependencies for both client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

4. Set up your environment variables:
    Create a `.env` file inside the **server** folder and add:
    ```
    DATABASE_URI=your_db_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000
    ```

5. Start the development servers:
    ```bash
    # Backend
    cd server
    npm start

    # Frontend
    cd ../client
    npm run dev
    ```

6. Open your browser and visit:
    ```
    http://localhost:5173
    ```

---

## 📂 Project Structure
 # In  .env file you have to make small change  you have to add your sql id link and sql password 
Example : DATABASE_URL="postgresql://postgres:suraj@localhost:5432/sakhisvasthya"
