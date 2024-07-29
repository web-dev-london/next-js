import { edit, removeTodo } from "@/action";
import DeleteButton from "@/components/DeleteButton";
import FormView from "@/components/FormView";
import SaveButton from "@/components/SaveButton";
import prisma from "@/modules/db";


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

const ActionTodo = async () => {
    const data = await getData();
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
                    <FormView />

                    <div className="mt-5 flex flex-col gap-y-2">
                        {data.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex gap-x-2"
                            >
                                <form
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

                                    <SaveButton />
                                </form>
                                <form
                                    action={removeTodo}
                                >
                                    <input type="hidden" name="inputId" value={todo.id} />
                                    <DeleteButton />
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ActionTodo;