# ServiceSphere

[Live Site URL](https://service-sphere-d85f8.web.app/)

## Description

ServiceSphere is an intuitive platform designed to make service sharing easy. Whether you are a service provider or a seeker, the platform allows you to manage, book, and share services with ease. It offers a seamless user experience with a variety of features to enhance both the service provider and seeker experience.

## Features

- **User Authentication**: Secure login and registration for service providers and seekers.
- **Service Management**: Providers can add, manage, and update their services.
- **Service Booking**: Users can book services or mark them as completed.
- **Personalized Dashboard**: Each user has a dedicated dashboard for managing their services, bookings, and to-dos.
- **Responsive Design**: Fully responsive interface ensuring a smooth experience on mobile and desktop.

## Technologies Used

- **Frontend**: React, React Router, DaisyUI, TailwindCSS, Framer Motion, React Icons, Swiper.
- **Backend**: Firebase for user authentication and data management.
- **State Management**: React Context API.
- **Package Management**: Bun (for package management).
---

## Running the Project Locally

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can check if it's installed by running `node -v` in your terminal. If it's not installed, download it from the [official Node.js website](https://nodejs.org/).
- **Bun**: If you are using Bun as your package manager, ensure it's installed. You can check by running `bun -v`. If it's not installed, you can follow the [installation guide](https://bun.sh/).

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rimasultana/ServiceSphere
   ```
   
2. **Navigate to the Project Folder**:
   After cloning the repository, navigate into the project directory:
   ```bash
   cd ServiceSphere
   ```

3. **Install Dependencies**:
   Depending on your package manager (npm, yarn, or Bun), install the necessary dependencies:

   - If using **npm**:
     ```bash
     npm install
     ```
   - If using **yarn**:
     ```bash
     yarn
     ```
   - If using **Bun**:
     ```bash
     bun install
     ```

4. **Set up Firebase Configuration**:
   - Create a Firebase project if you haven't already by following the [Firebase setup guide](https://firebase.google.com/docs/web/setup).
   - Create a `.env` file in the root directory of your project and add the Firebase configuration:

     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

5. **Run the Project Locally**:
   Once everything is set up, you can start the development server:
   
   - If using **npm**:
     ```bash
     npm run dev
     ```
   - If using **yarn**:
     ```bash
     yarn dev
     ```
   - If using **Bun**:
     ```bash
     bun run dev
     ```

   This will start the project and open it in your default web browser, usually at `http://localhost:5173`.

6. **Access the Application**:
   Open your browser and go to `http://localhost:5173` to view the application running locally.

---
