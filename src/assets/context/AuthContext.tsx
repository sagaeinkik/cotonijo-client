import { LoginCredentials, SignupCredentials, LoginResponse, AuthContextType } from "../types/user.type";
import React, { createContext, useState, useEffect, ReactNode } from "react"; 
import { cookieCreator, deleteCookies, getCookie, checkUser } from "../static/utils/cookieHandler";

//Skapa context
export const AuthContext = createContext<AuthContextType>({
    username: null, 
    userId: null,
    isAuthenticated: false,
    authLoading: true, 
    authError: null, 
    login: async () => {},
    signup: async () => {},
    logout: async () => {}
})


//API-url
let apiUrl = "https://cotonijoapi.up.railway.app";

//Provider
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    //States
    const [username, setUsername] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [authError, setAuthError] = useState<string | string[] | null>(null);

    //Errorhantering
    const handleError = (errorResponse: LoginResponse) => {
        //Om array av felmeddelanden (t ex vid misslyckad validering av fält)
        if (errorResponse.messages) {
            setAuthError(errorResponse.messages); 
        } else if (errorResponse.message) {
            //Enskilt felmeddelande (t ex serverfel)
            setAuthError(errorResponse.message); 
        } else {
            setAuthError("An unknown error has occurred...");
        }
    };
    

    //Kolla om användare är inloggad
    const checkAuth = async () => {
        // Om den inte laddar och användaren redan är autentiserad, avbryt
        if (isAuthenticated || authLoading === false) return;
        
        setAuthLoading(true);


        const isLoggedIn = await checkUser(); 
        //Kolla om inloggad
        if(isLoggedIn) {
            setIsAuthenticated(true);

            //Hämta användarnamn och id från cookie
            const username = getCookie("username"); 
            const userId = getCookie("userId");

            //Sätt användarnamn om det finns
            if(username) {
                setUsername(username);
            }
            //Sätt id om det finns
            if(userId) {
                setUserId(parseInt(userId));
            }
        } else {
            setIsAuthenticated(false);
            setUsername(null);
            setUserId(null);
        }
        setAuthLoading(false);
    }

    //Logga in
    const login = async (credentials: LoginCredentials) => {
        //Nolla error
        setAuthError(null);

        try {
            //Starta loading
            setAuthLoading(true);

            const response = await fetch(`${apiUrl}/login`, {
                method: "POST", 
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(credentials)
            });

            const data: LoginResponse = await response.json();

            //om felmeddelande från API
            if(!response.ok) {
                handleError(data);
                return; 
            }

            //Om lyckad inloggning
            if(data.loggedInUser) {
                //Spara användarnamn, slå om autentisering till true
                setUsername(data.loggedInUser.username);
                setUserId(data.loggedInUser.id);
                setIsAuthenticated(true);
                //Lagra i cookie (ifall man refreshar) 
                if(data.loggedInUser.username) {
                    cookieCreator({ cookieName: "username", cookieValue: data.loggedInUser.username});
                    cookieCreator({ cookieName: "userId", cookieValue: data.loggedInUser.id.toString()});
                }
            }

        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Something went wrong when logging in...");
        } finally {
            //Slå om loading till false
            setAuthLoading(false);
        }
    }

    //Registrera
    const signup = async (credentials: SignupCredentials) => {
        //Nolla error
        setAuthError(null);

        try {
            setAuthLoading(true);

            const response = await fetch(`${apiUrl}/signup`, {
                method: "POST", 
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            }); 

            const data: LoginResponse = await response.json();

            if(!response.ok) {
                //Sätt error
                handleError(data);
                return; 
            }

            //Om lyckad registrering
            if(data.newUser) {
                //Sätt authenticated
                setIsAuthenticated(true);
                setUsername(data.newUser.username);
                setUserId(data.newUser.id);

                //Spara i kaka
                if(data.newUser.username) {
                    cookieCreator({ cookieName: "username", cookieValue: data.newUser.username});
                    cookieCreator({ cookieName: "userId", cookieValue: data.newUser.id.toString()});
                }
            }
        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Something went wrong when registering user...");
        } finally {
            setAuthLoading(false);
        }
    }

    //Logga ut
    const logout = async () => {
        setAuthError(null);
        try {
            setAuthLoading(true);

            const response = await fetch(`${apiUrl}/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data: LoginResponse = await response.json();

            //Kolla om det gick bra
            if(!response.ok) {
                handleError(data);
            }
            
            //Slå om autentisering
            setIsAuthenticated(false);
    
            //Rensa användarnamn
            setUsername(null);
            setUserId(null);
            deleteCookies({ cookieName: "username" });
            deleteCookies({ cookieName: "userId" });


        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Something went wrong when logging out...");
        } finally {
            setAuthLoading(false);
        }
    }

    //Kör vid mount
    useEffect(() => {
        checkAuth();
    }, [])

    //Return
    return (
        <AuthContext.Provider value={{username, userId, isAuthenticated, authLoading, authError, login, signup, logout}}>
            {children} 
        </AuthContext.Provider>
    )
}
