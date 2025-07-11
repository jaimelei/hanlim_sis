# 🏫 Hanlim Student Information System

Hanlim SIS is a CRUD-based web application developed as a school requirement. It allows for managing, visualizing, and exporting student records in a clean, mobile-responsive interface.

---

## 🔍 Overview  
The system includes key functionality for adding, updating, deleting, and searching student records, along with visual summaries of student distribution. Although built as a learning project, it was structured with practical use cases in mind — including data sanitization and authentication layers.

---

## 🚀 Features

- **Add Student**  
  Form includes dropdowns for program and year level. Inputs are sanitized both client- and server-side.

- **Edit Student Info**  
  Search by student ID to auto-populate existing data, reducing risk of manual input errors.

- **Delete Student**  
  Protected by admin password (hardcoded for demo purposes only).

- **Search & Filter**  
  - Search by name (supports partial matches)  
  - Search by student ID (exact match)  
  - Filter by program or year level

- **Visual Charts**  
  View student distribution with responsive charts:  
  - Pie chart by program  
  - Bar chart by year level

- **Export & Print**  
  A download button renders student details in printable format, simulating a basic ID generation or admin export function.

---

## 🔗 Preview  
For a more detailed breakdown, including screen recordings, please refer to the portfolio section: [https://jaimeleiindick.vercel.app](https://jaimeleiindick.vercel.app)

---

## 📘 Work Structure  
> ⚠️ *Note: The initial commit reflected in my GitHub includes most core features, as I first built the project to test deployment and layout. Later commits cover fixes, styling, and added features I wanted to test out in a hosted environment. I’ve done feature-by-feature commits during internship, even using separate branches, and plan to apply that consistently moving forward.*

001 | Frontend | Feature  
- Created the general layout of the system.

002 | Frontend | Feature  
- Created the header part and general color scheme.

003 | Backend | Feature  
- Created an endpoint for adding a student.

004 | Backend | Feature  
- Created an endpoint to fetch a specified number of students, sorted by most recently added.

005 | Backend | Feature  
- Created an endpoint for editing student details using the student ID as a parameter.

006 | Backend | Feature  
- Created an endpoint for deleting a student entry using the student ID as a parameter.

007 | Backend | Feature  
- Created an endpoint for searching students using multiple, optional parameters.

008 | Frontend | Feature  
- Created popup modals for the following buttons: Add, Edit, Delete, and Search.

009 | Frontend | Feature  
- Created a table display for the default list of students.

010 | Frontend | Feature  
- Created visual graphs.

011 | Frontend | Revision  
- Modified the "Delete Student" process to prompt a password before asking for the student ID.
