import { useState } from "react"
import db from "../utils/db"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const Add = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentNumber: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const c = collection(db, "students")
        try {
            const student = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                studentNumber: formData.studentNumber
            })
            navigate('/');
        } catch (error) {
            console.log('Student cannot be added', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Student Number:</label>
                <input type="text" name="studentNumber" value={formData.studentNumber} onChange={handleChange} />
            </div>
            <button type="submit">Add Student</button>
        </form>
    );
}