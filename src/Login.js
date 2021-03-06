import React, {useState} from 'react';

const Login = (props) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const _handleLogin = async(e) => {
    e.preventDefault();
    if (!emailLogin || !passwordLogin)  return;
    try {
      const res = await props.handleLogin(emailLogin, passwordLogin);
      if (res) {
        setEmailLogin('');
        setPasswordLogin('');
      }
    } catch (e) {
      console.log('Login Error', e);
    }
  };
  return (
    <div name={'loginPage'}>
      <h3>Login bro!</h3>
      <label>Email: 
        <input id='emailLogin' placeholder='Enter email' type='email' value={emailLogin} onChange={e => setEmailLogin(e.target.value)}/>
      </label>
      <label>Password: 
        <input id='passwordLogin' placeholder='Enter password' type='password' value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} required/>
      </label>
      <button onClick={e => _handleLogin(e)}>Login!</button>
    </div>
  )
}

export default Login;