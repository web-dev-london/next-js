"use client"
import { useFormStatus } from "react-dom";


const DeleteButton = () => {
    const { pending } = useFormStatus();
    return (
        <>
            <button
                className="border rounded-lg p-2 bg-red-600 text-white"
                type="submit"
            >
                {pending ? "Deleting..." : "Delete"}
            </button>
        </>
    );
}

export default DeleteButton;