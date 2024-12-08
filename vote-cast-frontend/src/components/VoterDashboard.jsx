import React, { useEffect, useState } from 'react';
import { getVoterDashboardData } from '../services/api';

const VoterDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getVoterDashboardData();
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching voter dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    if (!dashboardData) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h1>Welcome to the Online Voting App!</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Your Profile</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {dashboardData.name}</p>
                            <p><strong>Email:</strong> {dashboardData.email}</p>
                            <p><strong>Role:</strong> {dashboardData.role}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Available Elections</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {dashboardData.elections.map((election) => (
                                    <li key={election.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {election.name}
                                        <a href={`/vote/${election.id}`} className="btn btn-primary btn-sm">Vote Now</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Voting History</h5>
                        </div>
                        <div className="card-body">
                            <ul>
                                {dashboardData.votingHistory.map((history) => (
                                    <li key={history.id}>{history.details}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterDashboard;
