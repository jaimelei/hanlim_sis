import React, { useState, useEffect } from 'react';

/**
 * AddStudentForm - Component for adding new student records
 * @param {function} onClose - Callback to close the modal
 */
const AddStudentForm = ({ onClose }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Sanitize and trim all input values
        const data = {
          name: e.target.name.value.trim(),
          student_id: e.target.student_id.value.trim(),
          program: e.target.program.value.trim(),
          year_level: e.target.year_level.value.trim(),
          email_address: e.target.email_address.value.trim()
        };

        // Validate that all fields have values
        for (const [key, value] of Object.entries(data)) {
          if (!value) {
            alert(`Please enter a valid ${key.replace('_', ' ')}`);
            return;
          }
        }

        // POST request to add new student
        fetch('http://localhost/hanlim-api/controllers/add-student.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(response => {
            if (response.status === 'success') {
              alert('Student added successfully.');
              onClose(); // Close modal on success
            } else if (response.errors) {
              // Display validation errors if any
              alert(response.errors.join('\n'));
            } else {
              alert(response.message || 'Failed to add student.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the student.');
          });
      }}
      className="flex flex-col gap-4 font-montserrat text-lg"
    >
      {/* Name input field */}
      <input name="name" type="text" placeholder="Name" className="border rounded p-2" />
      
      {/* Student ID input field */}
      <input name="student_id" type="text" placeholder="Student ID" className="border rounded p-2" />

      {/* Program dropdown */}
      <select name="program" defaultValue="" className="border rounded p-2 text-gray-400 font-montserrat text-lg">
        <option className="" value="" disabled>Select Program</option>
        <option value="Accountancy">Accountancy</option>
        <option value="Architecture">Architecture</option>
        <option value="Education">Education</option>
        <option value="Engineering">Engineering</option>
        <option value="Medical">Medical</option>
      </select>
  
      {/* Year level dropdown */}
      <select name="year_level" defaultValue="" className="border rounded p-2 text-gray-400 font-montserrat text-lg">
        <option value="" disabled>Select Year Level</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>

      {/* Email input field */}
      <input name="email_address" type="email" placeholder="Email Address" className="border rounded p-2" />
      
      {/* Submit button */}
      <button type="submit" className="text-white py-2 rounded bg-[#9f9271] hover:bg-[#887d61] font-montserrat text-lg">
        Add Student
      </button>
    </form>
  );
};

/**
 * EditStudentForm - Component for editing existing student records
 * @param {function} onClose - Callback to close the modal
 */
const EditStudentForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState({
    name: '',
    year_level: '',
    program: '',
    email_address: '',
  });

  // Create a wrapped close handler that resets the form
  const handleClose = () => {
    setStep(1);
    setStudentId('');
    setStudentData({
      name: '',
      year_level: '',
      program: '',
      email_address: '',
    });
    onClose(); // Call the original onClose
  };

  const handleFetchStudent = (e) => {
    e.preventDefault();
    const trimmedId = studentId.trim();
    if (!trimmedId) {
      alert('Please enter a valid Student ID.');
      return;
    }
    
    fetch(`http://localhost/hanlim-api/controllers/search-student.php?student_id=${trimmedId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.students.length > 0) {
          const student = data.students[0];
          setStudentData({
            name: student.name,
            year_level: student.year_level,
            program: student.program,
            email_address: student.email_address,
          });
          setStep(2);
        } else {
          alert('Student not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        alert('Failed to fetch student.');
      });
  };

  const handleEditStudent = (e) => {
    e.preventDefault();
    const updatedData = {
      student_id: studentId.trim(),
      ...studentData,
    };

    for (const [key, value] of Object.entries(updatedData)) {
      if (!value) {
        alert(`Please enter a valid ${key.replace('_', ' ')}`);
        return;
      }
    }

    fetch('http://localhost/hanlim-api/controllers/edit-student.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          alert('Student updated successfully.');
          handleClose(); // Use our custom close handler
        } else {
          alert(response.message || 'Failed to update student.');
        }
      })
      .catch(err => {
        console.error('Error updating student:', err);
        alert('An error occurred while updating the student.');
      });
  };

  return (
    <>
    <button 
        onClick={handleClose} 
        className="absolute top-4 right-4 text-black font-bold text-lg"
      >
        X
    </button>
    <form onSubmit={step === 1 ? handleFetchStudent : handleEditStudent} className="flex flex-col gap-4 font-montserrat text-lg">
      {step === 1 && (
        <>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="border rounded p-2"
          />
          <button type="submit" className="text-white py-2 rounded bg-[#9f9271] hover:bg-[#887d61]">
            Search Student
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            value={studentData.name}
            onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
            placeholder="Name"
            className="border rounded p-2"
          />
          
          <select 
            name="program"
            value={studentData.program}
            onChange={(e) => setStudentData({ ...studentData, program: e.target.value })}
            className="border rounded p-2 text-gray-700 font-montserrat text-lg"
          >
            <option value="" disabled>Select Program</option>
            <option value="Accountancy">Accountancy</option>
            <option value="Architecture">Architecture</option>
            <option value="Education">Education</option>
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
          </select>
          
          <select 
            name="year_level"
            value={studentData.year_level}
            onChange={(e) => setStudentData({ ...studentData, year_level: e.target.value })}
            className="border rounded p-2 text-gray-700 font-montserrat text-lg"
          >
            <option value="" disabled>Select Year Level</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <input
            type="email"
            value={studentData.email_address}
            onChange={(e) => setStudentData({ ...studentData, email_address: e.target.value })}
            placeholder="Email Address"
            className="border rounded p-2"
          />
          <button type="submit" className="text-white py-2 rounded bg-[#9f9271] hover:bg-[#887d61]">
            Save Changes
          </button>
        </>
      )}
    </form>
    </>
  );
};

/**
 * DeleteStudentForm - Component for deleting student records
 * @param {function} onClose - Callback to close the modal
 */
const DeleteStudentForm = ({ onClose }) => {
  // State for tracking form steps (1: password, 2: delete)
  const [step, setStep] = React.useState(1);
  const [password, setPassword] = React.useState('');
  const [studentId, setStudentId] = React.useState('');

  // Reset form when opened
  React.useEffect(() => {
    setStep(1);
    setPassword('');
    setStudentId('');
  }, []); // Empty dependency array means this runs once when component mounts

  // Handle student deletion
  const handleDeleteStudent = (e) => {
    e.preventDefault();

    const sanitizedId = studentId.trim();

    // Validate student ID
    if (!sanitizedId) {
      alert("Student ID is required.");
      return;
    }

    // Validate numeric student ID
    if (!/^\d+$/.test(sanitizedId)) {
      alert("Student ID must contain only numbers.");
      return;
    }

    // Send delete request
    fetch('http://localhost/hanlim-api/controllers/delete-student.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: sanitizedId })
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          alert('Student deleted successfully.');
          onClose(); // Close modal on success
        } else {
          alert(response.message || 'Failed to delete student.');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('An error occurred while deleting the student.');
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setStep(2);
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <form onSubmit={step === 1 ? handlePasswordSubmit : handleDeleteStudent} className="flex flex-col gap-4">
      {/* Step 1: Password verification */}
      {step === 1 && (
        <>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="bg-[#9f9271] hover:bg-[#887d61] text-white py-2 rounded"
          >
            Confirm Password
          </button>
        </>
      )}

      {/* Step 2: Delete confirmation */}
      {step === 2 && (
        <>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID to Delete"
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="text-white py-2 rounded bg-[#9f9271] hover:bg-[#887d61]"
          >
            Delete Student
          </button>
        </>
      )}
    </form>
  );
};

/**
 * SearchStudentForm - Component for searching/filtering students
 * @param {function} onResults - Callback with search results
 * @param {function} onClose - Callback to close the modal
 */
const SearchStudentForm = ({ onResults, onClose }) => {
  // State for search configuration
  const [searchBy, setSearchBy] = useState('name'); // 'name', 'student_id', or 'filter'
  const [searchInput, setSearchInput] = useState('');
  const [program, setProgram] = useState('None');
  const [yearLevel, setYearLevel] = useState('None');

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();

    const queries = new URLSearchParams();

    // Build query based on search type
    if (searchBy !== 'filter' && searchInput.trim()) {
      queries.append(searchBy, searchInput.trim());
    } else if (searchBy === 'filter') {
      if (program !== 'None') queries.append('program', program);
      if (yearLevel !== 'None') queries.append('year_level', yearLevel);
    }

    // Determine endpoint based on search type
    const baseURL = searchBy !== 'filter' 
      ? 'http://localhost/hanlim-api/controllers/search-student.php'
      : 'http://localhost/hanlim-api/controllers/view-student.php';

    // Execute search
    fetch(`${baseURL}?${queries.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          onResults(data.students || []); // Pass results to parent
        } else {
          onResults([]);
          alert(data.message || 'No students found.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while searching.');
      });
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-3 text-lg font-montserrat">
      {/* Search type radio buttons */}
      <div className="flex gap-4 items-center">
        <label className="flex items-center">
          <input
            type="radio"
            name="searchBy"
            value="name"
            checked={searchBy === 'name'}
            onChange={() => setSearchBy('name')}
            className="mr-2"
          />
          Name
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="searchBy"
            value="student_id"
            checked={searchBy === 'student_id'}
            onChange={() => setSearchBy('student_id')}
            className="mr-2"
          />
          Student ID
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="searchBy"
            value="filter"
            checked={searchBy === 'filter'}
            onChange={() => setSearchBy('filter')}
            className="mr-2"
          />
          Filter
        </label>
      </div>

      {/* Conditional rendering based on search type */}
      {searchBy !== 'filter' ? (
        // Text input for name/ID search
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={`Enter ${searchBy === 'name' ? 'Name' : 'Student ID'}`}
          className="border rounded p-2"
        />
      ) : (
        // Dropdowns for filter search
        <div className="flex gap-4">
          <select 
            value={program} 
            onChange={(e) => setProgram(e.target.value)} 
            className="border rounded p-2 flex-1"
          >
            <option value="None">All Programs</option>
            <option value="Engineering">Engineering</option>
            <option value="Architecture">Architecture</option>
            <option value="Accountancy">Accountancy</option>
            <option value="Education">Education</option>
            <option value="Medical">Medical</option>
          </select>
          <select 
            value={yearLevel} 
            onChange={(e) => setYearLevel(e.target.value)} 
            className="border rounded p-2 flex-1"
          >
            <option value="None">All Year Levels</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>
      )}

      {/* Submit button with dynamic text */}
      <button
        type="submit"
        className="bg-[#9f9271] hover:bg-[#887d61] text-white py-2 px-4 rounded"
      >
        {searchBy === 'filter' ? 'Apply Filter' : 'Search Student'}
      </button>
    </form>
  );
};

/**
 * ActionModal - Modal component for student CRUD operations
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback to close modal
 * @param {string} type - Determines which form to show ('add', 'edit', 'delete', 'search')
 * @param {function} onResults - Callback for search results (used by SearchStudentForm)
 */
const ActionModal = ({ isOpen, onClose, type, onResults }) => {
  // Render appropriate form based on type prop
  const renderContent = () => {
    switch (type) {
      case 'add':
        return <AddStudentForm onClose={onClose} />;
      case 'edit':
        return <EditStudentForm onClose={onClose} />;
      case 'delete':
        return <DeleteStudentForm onClose={onClose} />;
      case 'search':
        return <SearchStudentForm onResults={onResults} onClose={onClose} />;
      default:
        return <p>Unknown Action</p>;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-8 w-[400px] transform transition-transform duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-luckybones text-2xl">{type.toUpperCase()} STUDENT</h2>
          {type !== 'edit' && (
            <button onClick={onClose} className="text-black font-bold text-lg">X</button>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ActionModal;