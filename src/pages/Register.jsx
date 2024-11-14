import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/form.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://login-page-backend-i5bh.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.status === 201) {
        navigate('/login')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Service error: ' + error)
    }
  };

  return (

    <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
       {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <h1 className="h3 mb-3 fw-normal text-center">Please create an account</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='on'
            required
          />
          <label htmlFor="name">Name </label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='on'
            required
          />
          <label htmlFor="email">E-mail </label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Create account
        </button>

      </form>
      <p className="text-center mt-5">Already have an account? <Link to="/login">Log in</Link></p>
    </main>
  )
}

export default Register
