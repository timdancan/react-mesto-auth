import { useState } from "react"

export const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userData)
  }
  return (
    <div className="register">
      <p className="sign-title">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          className="sign-input"
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Пароль"
          className="sign-input"
        />
        <div className="register__button-container">
          <button
            type="submit"
            className="sign-button"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}
