import API from "../services/API";

export function deleteAllCookies(domain, path) {
    // Get all cookies as a string
    const cookies = document.cookie.split(';');
    
    // Go through each cookie and delete it
    cookies.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
    });
}

export function deleteCookie(name, domain, path) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; samesite=lax`;
};

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export async function getCsrfCookie() {
    try {
        // call axios
        const response = await API.get('/sanctum/csrf-cookie');
        // expect datas
        console.log('Response Headers:', response.headers);
        console.log('Response Data:', await response.data);
        console.log('Document Cookie:', document.cookie);
    } catch (error) {
        console.error('Error fetching CSRF cookie:', error);
    }
};