import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

 const Register = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some((user: any) => user.email === formData.email);
    if (userExists) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }
    const newUser = {
        id: Date.now().toString(),
        ...formData 
        };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('¡Registro completado con éxito! Ahora puedes iniciar sesión.');
    
    
    navigate('/login');
  }

  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
        />
      </div>

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

      <fieldset>
        <legend>Address</legend>

        <div>
          <label>Street</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
            required
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
            required
          />
        </div>

        <div>
          <label>Post Code</label>
          <input
            type="text"
            name="postCode"
            value={formData.address.postCode}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postCode: e.target.value } })}
            required
          />
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
            required
          />
        </div>
      </fieldset>

      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;