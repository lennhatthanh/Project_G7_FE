export const getErrorMessage = (error) => {
    const data = error?.response?.data;

    if (typeof data === 'string') {
        return data;
    }

    return data?.message || error?.message || 'Không thể kết nối đến máy chủ';
};
