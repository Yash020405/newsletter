const API_BASE_URL = 'http://localhost:5000/api';

export const startFlow = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/flows/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to start flow');
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const updateFlow = async (flowId, state) => {
    try {
        const response = await fetch(`${API_BASE_URL}/flows/${flowId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state })
        });
        if (!response.ok) throw new Error('Failed to update flow');
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getFlow = async (flowId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/flows/${flowId}`);
        if (!response.ok) throw new Error('Failed to get flow');
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const deleteFlow = async (flowId) => {
    const response = await fetch(`${API_BASE_URL}/flows/${flowId}`, {
        method: 'DELETE'
    });
    return response.json();
};