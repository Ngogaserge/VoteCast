import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        // Fetch users from backend
        fetch("/api/admin/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));

        // Fetch user role statistics for chart
        fetch("/api/admin/user-role-stats")
            .then((response) => response.json())
            .then((data) => setUserStats(data))
            .catch((error) => console.error("Error fetching user role stats:", error));
    }, []);

    useEffect(() => {
        if (Object.keys(userStats).length > 0) {
            const ctx = document.getElementById("chart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Object.keys(userStats),
                    datasets: [
                        {
                            label: "Number of Users per Role",
                            data: Object.values(userStats),
                            backgroundColor: "rgba(0, 123, 255, 0.2)",
                            borderColor: "rgba(0, 123, 255, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [userStats]);

    const handleDelete = (id) => {
        // Call delete API
        console.log("Deleting user:", id);
        // Add fetch call for deletion
    };

    return (
        <div className="container mt-4">
            <h3>User Management</h3>
            <hr />
            <div className="d-flex gap-2 mb-3">
                <a href="/admin/add" className="btn btn-primary">
                    Add New User
                </a>
                <a href="/admin/search" className="btn btn-primary">
                    Search User
                </a>
                <a href="/admin/download/users" className="btn btn-success">
                    Download Data
                </a>
                <a href="/admin/upload" className="btn btn-success">
                    Upload Data
                </a>
            </div>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.role}</td>
                        <td>
                            <a href={`/admin/users/edit/${user.id}`} className="btn btn-warning btn-sm">
                                Edit
                            </a>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h4>User Role Statistics</h4>
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    );
};

export default AdminDashboard;
