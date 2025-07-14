'use client'

const httpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export const makeApiRequest = (url, reqOption) => new Promise((resolve, reject) => {
    const {
        method = httpMethods.GET,
        body = null,
        isPublic = false,
        fileData = false,
        csvData = false,
        ...restOption
    } = reqOption;

    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTk5Y2FmYWRlZGYwNGQzYzk2NWVjYzE5OWQzMTIxYyIsIm5iZiI6MTc1MDc2NjE5MS44ODYwMDAyLCJzdWIiOiI2ODVhOTI2ZmM3Y2RlOWU3YmY0ZjZiZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Bu4GiRounhqsU9FYj79yhDI39DFM6cdkNp3qCN2bvU8',
    };

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        ...restOption,
    };

    fetch(url, options)
        .then(async (response) => {
            if (!response.ok) {
                const errorResponse = await response.json();
                throw { status: response.status, error: errorResponse };
            }
            // No content response 
            if (response.status === 204) {
                return null;
            }
            return response.json();
        })
        .then((data) => {
            resolve({ data });
        })
        .catch((error) => {
            reject(error);
        });
});

export const apiRequest = async (url, options) => {
    const result = await makeApiRequest(url, options);
    return result;
};

export const GET = (url, options) => apiRequest(url, { method: httpMethods.GET, ...options });
export const POST = (url, options) => apiRequest(url, { method: httpMethods.POST, ...options });
export const PUT = (url, options) => apiRequest(url, { method: httpMethods.PUT, ...options });
export const DELETE = (url, options) => apiRequest(url, { method: httpMethods.DELETE, ...options });
