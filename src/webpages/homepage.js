// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend
} from 'recharts';
import { FaEllipsisV } from 'react-icons/fa';
import ActionModal from '../components/action-modal';
import '../index.css';

// Define color palette for charts
const COLORS = ['#FFCC33', '#FFB84D', '#FFA500', '#FF8C00', '#FF7F32'];

const DashboardStats = () => {
  // Static lists for programs and year levels
  const programs = ['Engineering', 'Architecture', 'Accountancy', 'Education', 'Medical'];
  const yearLevels = [1, 2, 3, 4];

  // State for chart data
  const [programData, setProgramData] = useState([]);
  const [yearLevelData, setYearLevelData] = useState([]);

  // Fetch student data counts for charts
  useEffect(() => {
    const fetchCounts = async () => {
      const progData = [];
      const yearData = [];

      // Get count of students per program
      for (const program of programs) {
        const res = await fetch(`http://localhost/hanlim-api/controllers/view-student.php?program=${program}`);
        const data = await res.json();
        progData.push({ name: program, value: data.students ? data.students.length : 0 });
      }

      // Get count of students per year level
      for (const year of yearLevels) {
        const res = await fetch(`http://localhost/hanlim-api/controllers/view-student.php?year_level=${year}`);
        const data = await res.json();
        yearData.push({ year: `Year ${year}`, count: data.students ? data.students.length : 0 });
      }

      // Update state
      setProgramData(progData);
      setYearLevelData(yearData);
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 gap-4 text-lg font-montserrat text-black">

      {/* Pie Chart: Program Distribution */}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-luckybones mb-3">Program Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={programData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {/* Color each slice */}
            {programData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <PieTooltip />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            content={() => (
              <div className="flex flex-wrap justify-center text-black font-momontserrat text-sm">
                {programData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center mx-2 my-1">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </div>

      {/* Bar Chart: Year Level Count */}
      <div className="w-full flex flex-col items-center mb-28">
        <h2 className="text-3xl font-luckybones mb-2">Year Level Count</h2>
        <BarChart
          width={500}
          height={300}
          data={yearLevelData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fill: 'black' }} />
          <YAxis tick={{ fill: 'black' }} allowDecimals={false} />
          <BarTooltip />
          <Legend
            content={() => (
              <div className="flex justify-center mt-4 text-black font-montserrat text-md">
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#887d61' }} />
                  <span>Count</span>
                </div>
              </div>
            )}
          />
          <Bar dataKey="count" fill="#887d61" />
        </BarChart>
      </div>
    </div>
  );
};

const Homepage = () => {
  // Modal control states
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Student list state
  const [students, setStudents] = useState([]);

  // Load initial student data
  useEffect(() => {
    fetch('http://localhost/hanlim-api/controllers/view-student.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setStudents(data.students || []);
        }
      })
      .catch(console.error);
  }, []);

  // Modal open/close handlers
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // State to track which row’s menu is open
  const [menuIndex, setMenuIndex] = useState(null);

  // Handle downloading a PDF for a student
  const handleDownload = async (student) => {
    try {
      const response = await fetch('http://localhost/hanlim-api/controllers/pdf-generation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${student.name}-info.pdf`;
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download PDF.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#ddd7c5] overflow-hidden">

      {/* Top header area */}
      <div className="homepage-header">
        <h1 className="font-kalayaan text-5xl header-title mt-6">Hanlim University</h1>
        <h2 className='font-luckybones text-5xl mt-3 mb-2'>Student Information System</h2>
      </div>

      {/* Main content area */}
      <div className="w-full h-full flex flex-row justify-center">

        {/* Main panel for student management */}
        <div className='w-[75%] flex flex-col items-center'>

          {/* Action buttons */}
          <div className='flex flex-row justify-center items-center font-luckybones text-2xl'>
            {['add', 'edit', 'delete', 'search'].map((type) => (
              <button
                key={type}
                onClick={() => openModal(type)}
                className='transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-[#B5A983] w-[250px] h-[50px] m-10 rounded-lg border-2 border-black capitalize'
              >
                {type} Student
              </button>
            ))}
          </div>

          {/* Modal component for all actions */}
          <ActionModal isOpen={isModalOpen} onClose={closeModal} type={modalType} onResults={(data) => setStudents(data)} />

          {/* Table of students */}
          <div className='flex flex-col items-center bg-[#c7b784] w-[80%] min-h-[68%] max-h-[68%] rounded-3xl overflow-hidden overflow-y-auto scrollbar-hide p-1'>
            <table className="w-[80%] mt-6 border border-collapse text-left text-base">
              <thead>
                <tr className="bg-[#9f9271] text-white">
                  <th className="p-2 border">Student ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Program</th>
                  <th className="p-2 border">Year Level</th>
                  <th className="p-2 border">Email Address</th>
                  <th className="p-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-100 relative">
                      <td className="p-2 border">{s.student_id}</td>
                      <td className="p-2 border">{s.name}</td>
                      <td className="p-2 border">{s.program}</td>
                      <td className="p-2 border">{s.year_level}</td>
                      <td className="p-2 border">{s.email_address}</td>
                      <td className="p-2 border text-center relative">
                        <button
                          onClick={() => setMenuIndex(menuIndex === i ? null : i)}
                          className="hover:text-gray-700"
                        >
                          <FaEllipsisV />
                        </button>
                        {menuIndex === i && (
                          <div className="absolute right-2 top-8 z-10 bg-white border rounded-md shadow-md">
                            <button
                              className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                              onClick={() => {
                                handleDownload(s);
                                setMenuIndex(null);
                              }}
                            >
                              Download
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-2 border text-center">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel for dashboard charts */}
        <div className='bg-[#B5A983] w-[25%] h-full border-l-4 border-l-black flex flex-col justify-center items-center'>
          <DashboardStats />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
