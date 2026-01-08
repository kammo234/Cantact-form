import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app">
      <h1>Contact Management</h1>
      <ContactForm onAdd={() => {}} />
    </div>
  );
}
