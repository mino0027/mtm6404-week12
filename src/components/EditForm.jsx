import { useState, useEffect } from "react";

export const EditForm = ({ student, onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentNumber: "",
    })

    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.firstName || "",
                lastName: student.lastName || "",
                email: student.email || "",
                studentNumber: student.studentNumber || "",
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
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
        <button type="submit">Update Student</button>
    </form>
    );

}