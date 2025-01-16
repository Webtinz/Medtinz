import React from 'react';
import icone from '../../assets/images/Rectangle.png';
import icone2 from '../../assets/images/Icon.png';

const Dashboard = () => {
  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif'}}>
        <p className="text-primary ">September 12-22</p>
      <h2 className="text-primary fw-bold fs-1">Good morning, Doctor Jase</h2>

      <div className="row mb-4">
        <div className="col-md-4" style={{borderRadius: "20px"}}>
          <div className="card text-white mb-3 text-center" style={{borderRadius: "20px"}} >
            <div className="card-body" style={{borderRadius: "20px", background: 'linear-gradient(180deg, #28A745, #4CAF50)'
}}>
            <div className='d-flex justify-content-between'>
              <div>
              <h5 className="card-title text-start">Views</h5>
              <p className="card-text display-4 text-start">7,265</p>
              </div>
              <div className='text-end align-items-left'>
              <img src={icone2} />
              <p className="mt-4">+11.01%</p>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white mb-3 text-center" style={{borderRadius: "20px"}}>
            <div className="card-body" style={{borderRadius: "20px", background:' linear-gradient(180deg, #FF9800, #FFC107)'}}>
            <div className='d-flex justify-content-between'>
            <div>
              <h5 className="card-title">Active Users</h5>
              <p className="card-text display-4">2,318</p>
              </div>
              <div className='text-end align-items-left'>
              <img src={icone2} />
              <p className="mt-4">+6.08%</p>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white  mb-3 text-center" style={{borderRadius: "20px"}}>
            <div className="card-body" style={{borderRadius: "20px", background: "linear-gradient(180deg, #FF9800, #FFC107)"}}>
            <div className='d-flex justify-content-between'>
            <div>
              <h5 className="card-title">Active Users</h5>
              <p className="card-text display-4">2,318</p>

              </div>
              <div className='text-end align-items-left'>
              <img src={icone2} />
              <p className="mt-4">+6.08%</p>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="row " >
      <div className=" col-12 col-md-8 mt-4 bg-white p-4 mb-4" style={{borderRadius: "20px"}}>
          <div className="table-responsive">
          <h5 className='card-title bg-white p-4 fw-bold text-info'>Projects</h5>

            <table className="table table-hover table-striped p-4">
            <thead className="text-muted p-4">
              <tr>
                <th></th>
                <th  className="text-muted p-4">Manager</th>
                <th scope="col"  className="text-muted p-4">Date</th>
                <th scope="col"  className="text-muted p-4">Amount</th>
                <th scope="col"  className="text-muted p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td style={{height: "60px"}} className='d-flex justify-content-center'><img height={20} width={20} src={icone}/></td>
                  <td>{project.manager}</td>
                  <td>{project.date}</td>
                  <td>{project.amount}</td>
                  <td>
                    <span className='fs-8' style={{color: `${getStatusClass(project.status)}`, backgroundColor: `${getStatusClass2(project.status)}`, borderRadius: "10px", height: "10px", width: "800px"}}>{project.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <div className=" col-12 col-md-4" style={{height: "auto"}}>
          <div className="card text-white  mb-3 text-center" style={{borderRadius: "20px", height: "100%"}}>
            <div className="card-body " style={{borderRadius: "20px",background: 'linear-gradient(180deg, #FF9800, #FFC107)'}}>
            <div className='d-flex justify-content-between'>
            <div>
              <h5 className="card-title">Active Users</h5>
              <p className="card-text display-4">2,318</p>

              </div>
              <div className='text-end align-items-left'>
              <img src={icone2} />
              <p className="mt-4">+6.08%</p>
            </div>
            </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress':
      return '#AF52DE';
    case 'Complete':
      return '#34C759';
    case 'Pending':
      return '#007AFF';
    case 'Approved':
      return '#FFCC00';
    case 'Rejected':
      return '#00000066';
    default:
      return 'bg-secondary text-white';
  }
};

const getStatusClass2 = (status) => {
    switch (status) {
      case 'In Progress':
        return '';
      case 'Complete':
        return 'bg-success text-white';
      case 'Pending':
        return 'bg-info text-white';
      case 'Approved':
        return 'bg-warning text-dark';
      case 'Rejected':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

const projects = [
  { manager: 'ByeWind', date: 'Jun 24, 2024', amount: '$942.00', status: 'In Progress' },
  { manager: 'Natali Craig', date: 'Mar 10, 2024', amount: '$881.00', status: 'Complete' },
  { manager: 'Drew Cano', date: 'Nov 10, 2024', amount: '$409.00', status: 'Pending' },
  { manager: 'Orlando Diggs', date: 'Dec 20, 2024', amount: '$953.00', status: 'Approved' },
  { manager: 'Andi Lane', date: 'Jul 25, 2024', amount: '$907.00', status: 'Rejected' },
];

export default Dashboard;
