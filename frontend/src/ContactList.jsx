export default function ContactList({ contacts, onDelete }) {
  const remove = async id => {
    await fetch(`http://localhost:5000/api/contacts/${id}`, { method: "DELETE" });
    onDelete();
  };

  return (
    <ul>
      {contacts.map(c => (
        <li key={c._id}>
          <b>{c.name}</b> – {c.email} – {c.phone}
          <button onClick={() => remove(c._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
