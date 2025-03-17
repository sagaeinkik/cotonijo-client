import { useAuth } from "../hooks/useAuth"
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const { isAuthenticated, signup, authError } = useAuth();
  const navigate = useNavigate();

  //Omdirigera om användare är inloggad
  useEffect(() => {
    if(isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])

  
  //States
  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault(); 
    setLocalError("");

    //Enkel validering 
    if(username.trim() === "" || fullName.trim() === "" || email.trim() === "" || password.trim() === "") {
      setLocalError("Please fill in all fields.");
      return;
    }

    //Posta till API
    signup({ fullName, username, email, password });
  }

  return (
    <div className="content-wrapper auth-wrapper">
      <h1>Sign up</h1>
      <p>We're so glad you want to join us! Fill in some information and you're all set to start leaving reviews.</p>
      { authError && <p className="error">{authError}</p>}
      { localError && <p className="error">{localError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full name:</label>
          <input type="text" name="fullName" id="fullName" onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Register" className="button" />
      </form>
      <p className="link">Already have an account? <Link to="/login">Log in here!</Link></p>
    </div>
  )
}

export default RegisterPage