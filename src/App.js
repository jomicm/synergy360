import React, {useState, useEffect} from 'react';
import './App.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';
import Register from './Register';
import Login from './Login';
import Call from './js/app';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
const database = firebase.database();

const rand = (max, zero) => Math.floor(Math.random() * Math.floor(max)) + zero;
const getUniqueCode = (limit, maxNum = 4, zero = 0) => {
  const newRes = [];
  Array(limit).fill(0).map((e, ix) => {
    if (!ix) { 
      newRes.push(rand(maxNum, zero));
    } else {
      const prev = newRes[ix - 1];
      let ran = rand(maxNum, zero);
      while (prev === ran) ran = rand(maxNum, zero);
      newRes.push(ran);
    }
  });
  return newRes;
};



function App(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [gameID, setGameID] = useState(false);
  const [existingGameID, setExistingGameID] = useState('');
  const { signOut, signInWithGoogle } = props;
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('Waiting for player 2');
  let user = firebase.auth().currentUser;

  const handleRegister = async(userName, email, password, confirmationPassword) => {
    if (password !== confirmationPassword) {
      return 
    }
    try {
      const res = await firebaseAppAuth.createUserWithEmailAndPassword(email, password)
      if (res.user) {
        await res.user.updateProfile({ displayName: userName });
        setLoggedIn(true);
        return true;
      } else {
        console.log('Not valid user Register');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async(emailLogin, passwordLogin) => {
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
      if (res.user) {
        setLoggedIn(true);
        return true;
      } else {
        console.log('Not valid user Login');
      }
    } catch (e) {
      console.log('no', e.message);
    }
  };

  const createGame = async () => {
    const uID = getUniqueCode(6, 9, 0).join('')
    setGameID(uID);
    setPlayer1(user.displayName);
    database.ref('games/' + uID).set({'gameID': uID, player1: {id: user.uid, name: user.displayName}});
    await database.ref('/games/' + uID).on('value', (snapshot) => {
      console.log('aqui estamos papi', snapshot.val())
      if (snapshot.val().player2) {
        setPlayer2(snapshot.val().player2.name)
      }
    })
  };

  const handleSignOut = e => {
    e.preventDefault();
    signOut()
    setLoggedIn(false);
  }

  const joinGame = async() => {
    try {
      console.log('existingGameID', existingGameID);
      // database.ref('games/' + gameID).update({['games/' + existingGameID]: { player2: {id: user.uid, name: user.displayName}}});
      const player2 = await database.ref('/games/' + existingGameID + '/player2').once('value');
      console.log('player2', player2.val());
      if (player2.val()) {
        console.log('Already player2 in the game');
        return;
      }
      const gameRef = await database.ref('games/' + existingGameID + '/player2/');
      await gameRef.set({id: user.uid, name: user.displayName})
      const snapshot = await database.ref('/games/' + existingGameID).once('value');
      console.log('res', snapshot.val())
      setGameID(existingGameID);
      setPlayer2(user.displayName);
      setPlayer1(snapshot.val().player1.name);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{width: window.innerWidth * 1, height: window.innerHeight * 1}} className="App">
      {!isLoggedIn && <Register handleRegister={handleRegister}/>}
      {!isLoggedIn && <Login handleLogin={handleLogin}/>}
      {/* {isLoggedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={signInWithGoogle}>Sign in with Google</button>} */}
      {isLoggedIn && <div className="App">
        <header className="App-header">
          {/* { user ? <img src={user.photoURL} className="App-logo" alt="logo" /> : <p></p>} */}
          { (isLoggedIn || user) ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p> }
          { (isLoggedIn || user) ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={signInWithGoogle}>Sign in with Google</button> }
        </header>
      </div>}
      {isLoggedIn && !gameID && <div>
          <button onClick={()=>createGame()}>+ Create Game</button>
          <input placeholder='Enter Game ID' value={existingGameID} onChange={e => setExistingGameID(e.target.value)}/>
          <button onClick={joinGame}>Join Game</button>
        </div>
      }
      {isLoggedIn && gameID && <div>
        <p>Game ID: {gameID}</p>
        <p>Player 1: {player1}</p>
        <p>Player 2: {player2}</p>
      </div>}
      {/* <iframe title="Escape360" src={'http://172.46.3.245:8081/index.html?clientId=clientId1&gameId=4242'} style={{ width: '100%', height: '100%', backgroundColor: 'blueviolet' }} /> */}
      
    </div>
  );
}

// export default App;
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);