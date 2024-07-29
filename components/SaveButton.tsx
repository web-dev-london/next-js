"use client"
import { useFormStatus } from "react-dom";

const SaveButton = () => {
    const { pending } = useFormStatus();
    return (
        <>
            <button
                className="border rounded-lg p-2 bg-blue-600 text-white"
                type="submit"
            >
                {pending ? "Saving..." : "Save"}
            </button>
        </>
    );
}

export default SaveButton;