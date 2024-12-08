import React from 'react';

const HistoryCard = ({ history }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5>Voting History</h5>
            </div>
            <div className="card-body">
                <p>You have voted in the following elections:</p>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HistoryCard;
