import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase.utils';

const SignInPage = () => {
  //signInWithGooglePopup è una funzione asincrona,
  //se vogliamo usare await, dobbiamo definire la funzione
  //logGoogleUser come async
  const logGoogleUser = async () =>{
    const {user} = await signInWithGooglePopup();
    const userDocReference = await createUserDocumentFromAuth(user);  
  }

  return (
    <div className="signIn">
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Log in with google Popup</button>
    </div>
  );
}

export default SignInPage;
