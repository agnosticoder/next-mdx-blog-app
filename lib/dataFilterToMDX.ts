import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

interface FilterToMDXProp {
    content: string
}

const filterDataToMDX = async (data:FilterToMDXProp[]) => {
    // console.log({ data });
    const filteredData = await data.map(async (todo) => {
        const filteredTodo = {
            ...todo,
            content: await serialize(todo.content, {mdxOptions: {remarkPlugins:[remarkGfm]}}),
        };
        return filteredTodo;
    });
    return await Promise.all(filteredData);
};

export default filterDataToMDX;
