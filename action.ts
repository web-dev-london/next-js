'use server';

import { revalidatePath } from "next/cache";
import prisma from "./modules/db";


export async function create(prevState: any, formData: FormData) {
    "use server";
    try {

        const input = formData.get("input") as string;

        await prisma.todo.create({
            data: {
                input: input
            }
        })

        revalidatePath("/action-todo");
    } catch (error) {
        console.log(error);
        return `Failed to create todo`
    }
}

export async function edit(formData: FormData) {
    "use server";

    const inputId = formData.get("inputId") as string;
    const input = formData.get("input") as string;

    await prisma.todo.update({
        where: {
            id: inputId
        },
        data: {
            input: input
        }
    })

    revalidatePath("/action-todo");
}

export async function removeTodo(formData: FormData) {
    "use server";

    const inputId = formData.get("inputId") as string;
    await prisma.todo.delete({
        where: {
            id: inputId
        }
    })
    revalidatePath("/action-todo");
}