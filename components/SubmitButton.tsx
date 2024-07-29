'use client'
import { useFormStatus } from "react-dom"

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <>
            <button
                className="border rounded-lg p-2 my-2 bg-blue-600 text-white"
            >
                {pending ? "Saving..." : "Save"}
            </button>
        </>
    )
}

export default SubmitButton