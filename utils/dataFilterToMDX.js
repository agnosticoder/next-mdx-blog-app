import { serialize } from 'next-mdx-remote/serialize';

const filterDataToMDX = async (data) => {
    console.log({ data });
    const filteredData = await data.map(async (todo) => {
        const filteredTodo = {
            ...todo,
            title: await serialize(todo.title),
        };
        return filteredTodo;
    });
    return filteredData;
};

export default filterDataToMDX;
