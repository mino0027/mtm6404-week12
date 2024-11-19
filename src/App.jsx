import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './utils/db';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './App.css'

export const Contact = ({ id, studentNumber, firstName, lastName, email }) => {

  return (
    <div className='student'>
      <Link to={`/details/${id}`}>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{email}</p>
        <p><strong>{studentNumber}</strong></p>
      </Link>
    </div>
  );

}

function App() {

  const [classlist, setClasslist] = useState([]);

  const fetchClasslist = async () => {
    const q = query(collection(db, "students"), orderBy("lastName", "asc"))
    const docsSnapshot = await getDocs(q);
    const data = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() 
    }));
    setClasslist(data);
  };

  useEffect(() => {
    fetchClasslist();
  }, []);

  console.log(classlist);

  return (
    <div className='student-list'>
    {classlist.map((contact) => (
      <Contact 
        key={contact.id}
        id={contact.id} 
        studentNumber={contact.studentNumber} 
        firstName={contact.firstName} 
        lastName={contact.lastName} 
        email={contact.email} 
      />
    ))}
    <Link to="/add"><button>Add Student</button></Link>
    </div>
  )
}

export default App
