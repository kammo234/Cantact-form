import { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  // Email validation
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Phone validation exactly 10 digits
  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  // Validate all fields before submit
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      onAdd(); 
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  //Button enable condition
  const isFormValid =
    form.name.trim() &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone);

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name*"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
      <input
        placeholder="Email*"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
      <input
        placeholder="Phone*"
        value={form.phone}
        maxLength={10}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setForm({ ...form, phone: value });
        }}
      />
      {errors.phone && <small style={{ color: "red" }}>{errors.phone}</small>}

      <textarea
        placeholder="Message (optional)"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <button disabled={!isFormValid}>Submit</button>
    </form>
  );
}
