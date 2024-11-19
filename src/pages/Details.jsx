import { useEffect, useState } from "react";
import db from "../utils/db";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom"
import { EditForm } from "../components/EditForm";

export const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});

    const fetchStudentById = async (studentId) => {
        const docRef = doc(db, "students", studentId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            setStudent({
                id: docSnapshot.id,
                ...docSnapshot.data()
            })
        } else {
            console.log('Document does not exist!')
            return null;
        }
    }

    const handleUpdate = async (updatedStudent) => {
        try {
            const docRef = doc(db, "students", id)
            await updateDoc(docRef, updatedStudent)
            navigate('/');
        } catch (error) {
            console.log("Error updating student!", error)
        }
    }

    const handleStudentDelete = async () => {
        const msg = "Are you sure you want to delete?";
        try {
            if (confirm(msg) == true) {
                const docRef = doc(db, "students", id);
                await deleteDoc(docRef);
                setStudent({});
                navigate('/');
            } else {
               navigate(0); 
            }
        } catch (error) {
            console.log("Error deleting student!", error);
        }
    }

    useEffect(() => {
        fetchStudentById(id)
    }, [id])

    const DeleteButton = () => {
        return (
            <button onClick={handleStudentDelete}>Delete ?</button>
        )
    }

    return (
        <div className="edit-form">
            {student ? (
                <>
                    <EditForm student={student} onUpdate={handleUpdate} />
                    <DeleteButton />
                </>
            ) : (
               <p>Loading student details...</p> 
            )}
        </div>
    )
}