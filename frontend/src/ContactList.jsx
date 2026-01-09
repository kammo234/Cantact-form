export default function ContactList({ contacts, onDelete }) {
  const remove = async (id) => {
    await fetch(
      `https://cantact-form-backend.onrender.com/api/contacts/${id}`,
      { method: "DELETE" }
    );
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
