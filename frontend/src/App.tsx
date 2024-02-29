import { Suspense, useEffect, useState } from "react";
import { getContacts } from "./api";
import { Contact } from "./type";

function App() {
  return (
    <>
      <h1>Contacts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactList />
      </Suspense>
      <ContactListEeffect />
    </>
  );
}

function ContactList() {
  const contacts = getContacts();

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <div style={{ color: "blue" }}>
            {contact.name} | {contact.email}
          </div>
        </li>
      ))}
    </ul>
  );
}

function ContactListEeffect() {
  const [contacts, setContacts] = useState<Contact[]>();
  const [order, setOrder] = useState<string>();

  useEffect(() => {
    const fetchContacts = async () => {
      const ret = await fetch(`http://localhost:8000/contacts?order=${order}`);
      if (!ret.ok) {
        throw new Error("通信失敗");
      }
      const contacts = await ret.json();
      setContacts(contacts);
    };

    fetchContacts();
  }, [order]);

  const handleClick = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  return (
    <>
      {contacts ? (
        <>
          <Contacts contacts={contacts} />
          <button onClick={handleClick}>asc/desc</button>
        </>
      ) : (
        "loading..."
      )}
    </>
  );
}

function Contacts({ contacts }: { contacts: Contact[] }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <div style={{ color: "blue" }}>
            {contact.name} | {contact.email}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default App;
