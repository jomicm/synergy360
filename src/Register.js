import React, { useState } from 'react';

const Register = (props) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const _handleRegister = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password || !confirmationPassword) return;
    const res = await props.handleRegister(userName, email, password, confirmationPassword);
    if (res) {
      setUserName('');
      setEmail('');
      setConfirmationPassword('');
      setPassword('');
    }
  }
  return (
    <div name={'registerPage'}>
      <h3>Resgister here!</h3>
      <label>Username:
        <input id='userNameRegister' value={userName} placeholder='Enter username' onChange={e => setUserName(e.target.value)} />
      </label>
      <label>Email:
        <input id='emailRegister' value={email} placeholder='Enter email' type='email' onChange={e => setEmail(e.target.value)} />
      </label>
      <label>Password: 
        <input id='passwordRegister' value={password} placeholder='Enter password' type='password' required onChange={e => setPassword(e.target.value)} />
      </label>
      <label>Confirm password: 
        <input id='confirmationPasswordRegister' placeholder='Confirm password' type='password' required value={confirmationPassword} onChange={e => setConfirmationPassword(e.target.value)} />
      </label>
      <button onClick={e => _handleRegister(e)}>Register!</button>
    </div>
  )
}

export default Register;