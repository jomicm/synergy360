import React, { useState } from 'react';

const Register = (props) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const _handleRegister = async(e) => {
    e.preventDefault();
    if (!userName || !email || !password || !confirmationPassword)  return;
    const res = await props.handleRegister(userName, email, password, confirmationPassword);
    if (res) {
      setUserName('');
      setEmail('');
      setConfirmationPassword('');
      setPassword('');
    }
   }
  return (
    <form name={'registerPage'}>
      <input id='userName' value={userName} placeholder='Enter username' onChange={e => setUserName(e.target.value)}/>
      <input id='email' value={email} placeholder='Enter email' type='email' onChange={e => setEmail(e.target.value)}/>
      <input id='password' value={password} placeholder='Enter password' type='password' required onChange={e => setPassword(e.target.value)}/>
      <input id='confirmationPassword' placeholder='Confirm password' type='password' required value={confirmationPassword} onChange={e => setConfirmationPassword(e.target.value)}/>
      <button onClick={e => _handleRegister(e)}>Register!</button>
    </form>
  )
}

export default Register;