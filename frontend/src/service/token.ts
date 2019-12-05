export const saveToken = (token: string) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const discardToken  = () => localStorage.removeItem('token')

export const withToken = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})