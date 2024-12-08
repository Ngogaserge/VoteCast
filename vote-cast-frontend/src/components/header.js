import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-primary text-white py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h4">Online Voting System</h1>
                <div>
                    <Link to="/logout" className="btn btn-danger">Logout</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
