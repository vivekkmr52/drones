import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className="text-center">
            No Page Found!!
            <div>
                <Link to='/'>Login</Link>
            </div>
        </div>
    )
}

export default Error
