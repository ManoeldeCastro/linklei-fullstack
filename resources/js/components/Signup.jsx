import React, { useState } from 'react';

function Signup({ onSignupSuccess }) {
  const [user, setUser] = useState({ name: '', username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    onSignupSuccess();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Cadastro</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome:</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuário:</label>
                  <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha:</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
