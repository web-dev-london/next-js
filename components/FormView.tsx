'use client'
import { create } from "@/action"
import { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"
import SubmitButton from "./SubmitButton"

const FormView = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(create, null);

    return (
        <>
            <form
                action={async (formData: FormData) => {
                    await formAction(formData);
                    formRef.current?.reset()
                }}
                className="flex flex-col"
                ref={formRef}
            >
                <input
                    className="border rounded-lg p-2 my-2"
                    type="text"
                    name="input"
                />
                <SubmitButton />

                {state && <p className="text-red-500">{state}</p>}
            </form>
        </>
    )
}

export default FormView