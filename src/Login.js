import React, {useState} from 'react';

const Login = (props) => {
  const [emailLogin, setEmailLogin] = useState('a1@gmail.com');
  const [passwordLogin, setPasswordLogin] = useState('123456');
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
    <form name={'loginPage'}>
      <input id='email' placeholder='Enter email' type='email' value={emailLogin} onChange={e => setEmailLogin(e.target.value)}/>
      <input id='password' placeholder='Enter password' type='password' required value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)}/>
      <button onClick={e => _handleLogin(e)}>Login!</button>
    </form>
  )
}

export default Login;