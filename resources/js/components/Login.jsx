import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [login, setLogin] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === login.username && storedUser.password === login.password) {
        console.log('entrou')
        onLoginSuccess();
    } else {
    }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuário:</label>
                  <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha:</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
