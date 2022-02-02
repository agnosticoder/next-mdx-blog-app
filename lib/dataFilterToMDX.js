import { serialize } from 'next-mdx-remote/serialize';

const filterDataToMDX = async (data) => {
    console.log(data);
    // console.log({ data });
    const filteredData = await data.map(async (todo) => {
        const filteredTodo = {
            ...todo,
            content: await serialize(todo.content),
        };
        return filteredTodo;
    });
    return filteredData;
};

export default filterDataToMDX;
