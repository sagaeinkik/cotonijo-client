//Cookie-interface
interface userCookie {
    cookieName: string;
    cookieValue?: string;
}

//Skapa cookie med valfritt namn
export function cookieCreator(data: userCookie): void {
    document.cookie = `${data.cookieName}=${data.cookieValue}; max-age=10800; path=/;`;
}

//Anropa /auth-route för att kolla om användaren ens är inloggad
export async function checkUser(): Promise<boolean> {
    try {
        const res = await fetch('https://cotonijoapi.up.railway.app/auth/me', {
            credentials: 'include', //Skicka med httpOnly-cookie
        });
        const result = await res.json();

        //Returnera om svaret från API innehåller "loggedIn"
        return result.loggedIn;
    } catch (error) {
        return false;
    }
}

//Ta bort cookies
export function deleteCookies(cookie: userCookie): void {
    document.cookie = `${cookie.cookieName}=; max-age=0; path=/;`;
}

//Hämta cookie
export function getCookie(cookieName: string): string | null {
    //Lägg cookies i en array
    const value = `; ${document.cookie}`;
    //Dela upp sträng vid kaknamn
    const parts = value.split(`; ${cookieName}=`);

    //Om det finns en cookie med det namnet, returnera värdet
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}
