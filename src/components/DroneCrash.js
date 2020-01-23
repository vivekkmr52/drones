import React from 'react'
import { Link } from 'react-router-dom';

function DroneCrash() {
    return (
        <div className="text-center">
            You have crashed a drone!!! You are banned from future logins and drone renting.
            <div>
                <Link to="/">Go Home</Link>
            </div>            
        </div>
    )
}

export default DroneCrash;
