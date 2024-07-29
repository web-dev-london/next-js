import prisma from "@/modules/db";
import { revalidatePath } from "next/cache";


async function getData() {
    const data = await prisma.todo.findMany({
        select: {
            id: true,
            input: true
        },
        orderBy: {
            createdAt: "desc"
        },
    });

    return data
}

export default async function Home() {
    const data = await getData();

    async function create(formData: FormData) {
        "use server";

        const input = formData.get("input") as string;

        await prisma.todo.create({
            data: {
                input: input
            }
        })

        revalidatePath("/");
    }

    async function edit(formData: FormData) {
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

        revalidatePath("/");
    }

    async function removeTodo(formData: FormData) {
        "use server";

        const inputId = formData.get("inputId") as string;
        await prisma.todo.delete({
            where: {
                id: inputId
            }
        })
        revalidatePath("/");
    }

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
                    <form
                        action={create}
                        className="flex flex-col"
                    >
                        <input
                            className="border rounded-lg p-2 my-2"
                            type="text"
                            name="input"
                        />
                        <button
                            className="border rounded-lg p-2 my-2 bg-blue-600 text-white"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>

                    <div className="mt-5 flex flex-col gap-y-2">
                        {data.map((todo) => (
                            <form
                                key={todo.id}
                                className="flex gap-x-2"
                                action={edit}
                            >
                                <input type="hidden" name="inputId" value={todo.id} />
                                <input
                                    type="text"
                                    defaultValue={todo.input}
                                    className="border rounded-lg p-2"
                                    name="input"
                                />

                                <button
                                    className="border rounded-lg p-2 bg-blue-600 text-white"
                                    type="submit"
                                >
                                    Save
                                </button>

                                <button
                                    formAction={removeTodo}
                                    className="border rounded-lg p-2 bg-red-600 text-white"
                                    type="submit"
                                >
                                    Delete
                                </button>
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
