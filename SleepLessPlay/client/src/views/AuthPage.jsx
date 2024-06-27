import axios from "axios";

export const AuthPage = (props) => {

  const submitHandler = (e) => {
    e.preventDefault();
    const { value } = e.target[0];

    axios.post('http://localhost:8002/authenticate', { username: value })
      .then(r => props.onAuth({ ...r.data, secret: value }))
      .catch(err => console.log('error', err))
  };

  return (
    <div className="background">
      <form onSubmit={submitHandler} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set a username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}