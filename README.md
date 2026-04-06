# **BookVenture: Smart AI-powered, Personalized Library Management System**

**BookVenture** is a comprehensive, modern E-library management platform designed to automate traditional library operations while providing an intelligent, user-centric experience. Developed as a **B.Tech Minor Project** at the **Guru Nanak Institute of Technology**, this system moves beyond simple manual record-keeping to offer AI-enhanced features like personalized recommendations and advanced semantic search.

---

## **Key Features**

*   **AI-Powered Recommendation Engine:** Utilizes **Natural Language Processing (NLP)** techniques, specifically **TF-IDF** and **Cosine Similarity**, to suggest books based on a user's favorites and reading history.
*   **Advanced Search Functionality:** Includes a basic search using case-insensitive regular expressions and an **NLP-enhanced advanced search** that semantically compares keywords against book descriptions. It also incorporates **fuzzy matching** to handle minor spelling errors.
*   **Real-time Analytics:** Features a **Trending Books** section that dynamically updates based on real-time user interaction data, such as click counts and view frequency.
*   **Role-Based Access Control:** Tailored interfaces and functionalities for **Visitors**, **Registered Users**, and **Administrators**.
*   **Interactive UI Components:** Includes a visually rich "Book Wall," "Author Spotlights," "Upcoming Events," and a dedicated "User Review" section to foster community engagement.
*   **Responsive Design:** A fully adaptive interface built to ensure accessibility across desktops, tablets, and smartphones.

---

## **Technology Stack**

### **Frontend**
*   **React.js:** For building a dynamic and responsive user interface.
*   **Tailwind CSS:** For fast, modern styling and utility-first design.
*   **React Router:** For seamless client-side navigation.
*   **Axios:** For handling HTTP requests to the backend APIs.

### **Backend**
*   **Node.js & Express.js:** To execute server-side JavaScript and build RESTful APIs.
*   **JWT (JSON Web Token):** For secure user authentication and session management.
*   **Bcrypt.js:** For secure password hashing.

### **Database**
*   **MongoDB:** A NoSQL database for flexible and scalable data storage.
*   **Mongoose:** ODM for modeling MongoDB data within the Node.js environment.

### **Machine Learning / NLP**
*   **Natural (NLP library):** Used for processing book descriptions (TF-IDF).
*   **Cosine Similarity:** The core algorithm for the content-based recommendation engine.

---

## **System Workflow**

1.  **Visitor:** Can browse trending books, view book descriptions, read author spotlights, and access public events.
2.  **Registered User:** Gains access to personalized features, including adding books to favorites, receiving AI-based recommendations, submitting reviews, and managing a borrowing history.
3.  **Administrator:** Responsible for platform moderation, managing the book and author database, organizing literary events, and approving or denying book borrow requests.

---

## **Installation & Setup**

*Information regarding specific installation commands is not detailed in the sources, but the system is designed to be hosted as follows:*
*   **Frontend:** Deployed on **Netlify**.
*   **Backend:** Hosted on **Render**.
*   **Database:** Cloud-hosted via **MongoDB Atlas**.

---

## **Project Team**
*   **Aditya Kumar** (University Roll No: 501022010002)
*   **Puskar Mal** (University Roll No: 501022010014)
*   **Satyajit Roy** (University Roll No: 501022010020)
*   **Sounak Dey** (University Roll No: 501022010023)
*   **Guided By:** Ms. Suparna Maity, Dept. of ECS, GNIT

---

## **Future Scopes**
The platform is designed for future expansion, including the integration of **E-books and Audiobooks**, development of a dedicated **mobile application**, and implementation of **QR/Barcode scanning** for physical library workflows.
