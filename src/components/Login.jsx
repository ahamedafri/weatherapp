import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'; // Import your CSS file for styling
import '../App.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'user' && password === '1234') {
            navigate('/weather', { replace: true });
        } else {
            setError("Incorrect username or password. Please try again.");
        }
    };

    return (
        <div className='login-container bg_img'>
            <div className="login-content box_container1 box1">
                <h2>Login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container">
                        <label htmlFor="username">UserName</label>
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type='text'
                            placeholder='user'
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            placeholder='1234'
                        />
                    </div>
                    <div className="input-container">
                       <span>FOR TESTING</span><br/>
                       <span>Username = "user"</span><br/>
                       <span>Password = "1234"</span>
                    </div>
                    <div className="input-container">
                        <button type='submit'>Login</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
