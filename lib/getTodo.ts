import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface GetTodoResponse{
    content: string
}

const getTodo = async (createdAt: string) => {
    // console.log({ createdAt });
    try {
        const res =  await fetch(`/api/gettodo/${createdAt}`);
        const result:GetTodoResponse = await res.json();
        return result;
    } catch (e) {
        console.warn({e});
    }
};

export default getTodo;
