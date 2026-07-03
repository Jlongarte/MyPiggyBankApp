import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const user = existingUsers.find((user: any) => user.email === formData.email && user.password === formData.password);
         
        if (user) {
        
        const sessionData = { id: user.id, name: user.name, email: user.email };
        localStorage.setItem("currentUser", JSON.stringify(sessionData));

        
        navigate('/');
    } else {
        alert('Correo electrónico o contraseña incorrectos.');
    }

    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default Login