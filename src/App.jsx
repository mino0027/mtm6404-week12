import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './utils/db';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './App.css'

export const Contact = ({ id, firstName, lastName, email }) => {
  return (
    <div className='contact'>
      <Link to={`/details/${id}`}>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{email}</p>
      </Link>
    </div>
  ); 

}

function App() {

  const [contactlist, setContactlist] = useState([]);

  const fetchContactlist = async () => {
    const q = query(collection(db, "contacts"), orderBy("lastName", "asc"))
    const docsSnapshot = await getDocs(q);
    const data = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() 
    }));
    setContactlist(data);
  };

  useEffect(() => {
    fetchContactlist();
  }, []);

  console.log(contactlist);
  // add search bar here (search term for the first name and last name)
  return (

    <div className='contact-list'>
    {contactlist.map((contact) => (
      <Contact 
        key={contact.id}
        id={contact.id} 
        firstName={contact.firstName} 
        lastName={contact.lastName} 
        email={contact.email} 
      />
    ))}
    <Link to="/add"><button>Add Contact</button></Link>
    </div>
  )
}

export default App
