HANLIM STUDENT INFORMATION SYSTEM (SIS)

Hanlim SIS is a web-based student information system built with a PHP backend and React frontend. It enables managing student records including adding, editing, deleting, viewing, and searching students, with visual statistics and filterable data display.

---

FEATURES

- Student Record Management
  - Add new students with complete information
  - Edit or delete existing student records
  - Search students by name or student ID
  - Filter students by program and year level

- Dashboard
  - View program distribution as a Pie Chart
  - View year level distribution as a Bar Chart

- Modal System for Actions
  - Reusable modal (`ActionModal`) for performing CRUD operations

- Responsive UI
  - Mobile-friendly layout
  - Clean and consistent color theme (`bg-[#9f9271]`, `hover:bg-[#887d61]`)

- Backend API
  - PHP-based REST endpoints using local server (XAMPP)
  - Connects to MySQL for persistent data

---

TECH STACK

Frontend:
- React
- Tailwind CSS
- Recharts (for charts)
- Axios (for API requests)

Backend:
- PHP (hosted locally)
- MySQL (managed via phpMyAdmin)

Hosting:
- PHP backend hosted locally using XAMPP
- Frontend served locally using React dev server

---

HOW TO USE

1. Clone both frontend and backend repositories

Frontend (React):
https://github.com/jaimeleiindick/hanlim-sis

Backend (PHP):
https://github.com/jaimeleiindick/hanlim-api

2. Set up the backend using XAMPP (see below)

3. Start the React frontend
- Make sure the backend is running locally
- Run `npm install` then `npm run dev` from the frontend folder
- Access the app on your local browser (usually http://localhost:5173)

---

BACKEND SETUP (PHP with XAMPP)

1. Clone the backend repository:
https://github.com/jaimeleiindick/hanlim-api

2. Move the backend folder to XAMPP's `htdocs` directory:
Typically located at: C:\xampp\htdocs\
Move the entire `hanlim-api` folder there:
C:\xampp\htdocs\hanlim-api\

3. Start Apache and MySQL using XAMPP:
Open the XAMPP Control Panel and start both Apache and MySQL.

4. Set up the database:
Open phpMyAdmin at: http://localhost/phpmyadmin
Create a new database named: hanlim_sis
Import your provided SQL schema into the database.

5. Configure database connection:
Open the `config.php` file inside `hanlim-api`.
Update the credentials as follows:
DB_SERVER: localhost
DB_USERNAME: root
DB_PASSWORD: (leave blank)
DB_DATABASE: hanlim_sis

6. Access the backend:
Your PHP API will now be accessible at:
http://localhost/hanlim-api/