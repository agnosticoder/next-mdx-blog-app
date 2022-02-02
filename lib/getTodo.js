const getTodo = async (createdAt) => {
    // console.log({ createdAt });
    try {
        return await fetch(`/api/gettodo/${createdAt}`);
    } catch (e) {
        throw new Error(e);
    }
};

export default getTodo;
