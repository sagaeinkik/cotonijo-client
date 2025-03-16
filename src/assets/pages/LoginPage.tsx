import { useAuth } from "../hooks/useAuth"
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, login, authError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])

  //States
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLocalError('');

    //Snabb validering
    if(username.trim() === "" || password.trim() === "") {
      setLocalError("Please fill in your username and password.");
      return;
    }

    //Posta till API
    login({ username, password});
  }


  return (
    <div className="content-wrapper">
      <h1>Login</h1>
    <form onSubmit={handleSubmit} className="login-form">
      { authError && <p className="error">{authError}</p>}
      { localError && <p className="error">{localError}</p>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input type="submit" value="Log in" className="button" />
    </form>
    <p>Don't have an account yet? <Link to="/register">Sign up now!</Link></p>
    </div>
  )
}

export default LoginPage