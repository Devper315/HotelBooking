export const handleResponse = (response) => {
    if (response.status === 200) {
        return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
};

export const handleError = (message, error) => {
    console.error(message + ': ', error);
    throw error;
};
