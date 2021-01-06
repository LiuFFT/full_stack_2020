import React, { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        id='username'
                        type='text'
                        name='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        name='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id='login' type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm