import { useState } from "react";
import * as yup from "yup";
import "./formwithyup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    dob: "",
  });

  const validationschema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .matches(
        /[*.!@$%^&(){}[]:;<>|]/,
        "Password should contain at least one special character"
      )
      .matches(/[0-9]/)
      .matches(/[A-Z]/)
      .matches(/[a-z]/)
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "password doesn't match")
      .required("confirm password is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .min(18, "You must be atleast 18 years old")
      .max(100, "Your age connot be more than 100 years")
      .required("Age is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.date().required("Date of birth is required"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationschema.validate(formData, { abortEarly: false });
      console.log("Form submitted", formData);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>FirstName:</label>
          <input
            type="text"
            placeholder="first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        {errors.firstName && <div className="error">{errors.firstName}</div>}
        <div className="form-group">
          <label>LastName:</label>
          <input
            type="text"
            placeholder="last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {errors.lastName && <div className="error">{errors.lastName}</div>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <div className="error">{errors.email}</div>}
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {errors.phone && <div className="error">{errors.phone}</div>}
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={togglePasswordVisibility}
          />
        </div>
        {errors.password && <div className="error">{errors.password}</div>}
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        {errors.age && <div className="error">{errors.age}</div>}
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />
        </div>
        {errors.gender && <div className="error">{errors.gender}</div>}
        <div className="form-group">
          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        {errors.dob && <div className="error">{errors.dob}</div>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormWithYup;
