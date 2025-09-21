import { useEffect, useState } from "react";
import "../css/Dashboard.css";
import axios from "axios";

const Dashboard = () => {

  const [student, setStudent] = useState(0)
  const [admin, setAdmin] = useState(0)
  const [book, setBook] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
    .then(res => {
      if(res.data.ok){
        setStudent(res.data.student)
        setAdmin(res.data.admin)
        setBook(res.data.book)
      }
    }).catch(err => console.log(err))
  },[])

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        
        {/* Book Card */}
        <div className="dashboard-box book-card">
          <div className="card-icon">
            <i className="fas fa-book"></i>
          </div>
          <h2>Total Books</h2>
          <div className="stat-number">{book}</div>
          <div className="stat-label">Books in Library</div>
          <div className="card-footer">
            <span className="trend positive">+12% this month</span>
          </div>
        </div>

        {/* Student Card */}
        <div className="dashboard-box student-card">
          <div className="card-icon">
            <i className="fas fa-users"></i>
          </div>
          <h2>Total Students</h2>
          <div className="stat-number">{student}</div>
          <div className="stat-label">Registered Students</div>
          <div className="card-footer">
            <span className="trend positive">+8% this month</span>
          </div>
        </div>

        {/* Admin Card */}
        <div className="dashboard-box admin-card">
          <div className="card-icon">
            <i className="fas fa-user-shield"></i>
          </div>
          <h2>Total Admins</h2>
          <div className="stat-number">{admin}</div>
          <div className="stat-label">System Administrators</div>
          <div className="card-footer">
            <span className="trend neutral">No change</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;