import { User, LoginCredentials, SignupCredentials, LoginResponse, AuthContextType } from "../types/user.type";
import React, { createContext, useState, useEffect, ReactNode } from "react"; 
import { cookieCreator, deleteCookies, getCookie, checkUser } from "../static/utils/cookieHandler";

//Skapa context
export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    authLoading: true, 
    authError: null, 
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
    deleteAccount: async () => {}
})


//API-url
let apiUrl = "https://cotonijoapi.up.railway.app";

//Provider
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    //States
    const [user, setUser] = useState<User | null>(null);
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

            const storedUser: User = {
                id: parseInt(getCookie("userId") || "0"),
                username: getCookie("username") || "",
                fullName: getCookie("fullName") || "",
                email: getCookie("email") || "", 
                registered: new Date(getCookie("registered") || "")
            };

            //Lagra user i state
            setUser(storedUser);
            //Sätt autentiserad
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);

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
                const loggedInUser: User = data.loggedInUser;

                //Spara användare, slå om autentisering till true
                setUser(loggedInUser);
                setIsAuthenticated(true);
                
                //Lagra allt i cookie (ifall man refreshar) 
                cookieCreator({ cookieName: "userId", cookieValue: data.loggedInUser.id.toString()});
                cookieCreator({ cookieName: "fullName", cookieValue: data.loggedInUser.fullName});
                cookieCreator({ cookieName: "username", cookieValue: data.loggedInUser.username});
                cookieCreator({ cookieName: "email", cookieValue: data.loggedInUser.email});
                cookieCreator({ cookieName: "registered", cookieValue: data.loggedInUser.registered.toString()});
                
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
                const newUser: User = data.newUser;
                //Sätt authenticated
                setIsAuthenticated(true);
                setUser(newUser);

                //Spara i kaka
                cookieCreator({ cookieName: "userId", cookieValue: data.newUser.id.toString()});
                cookieCreator({ cookieName: "fullName", cookieValue: data.newUser.fullName});
                cookieCreator({ cookieName: "username", cookieValue: data.newUser.username});
                cookieCreator({ cookieName: "email", cookieValue: data.newUser.email});
                cookieCreator({ cookieName: "registered", cookieValue: data.newUser.registered.toString()});
                
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
            setUser(null);

            //Ta bort cookies
            deleteCookies({ cookieName: "userId" });
            deleteCookies({ cookieName: "username" });
            deleteCookies({ cookieName: "fullName" });
            deleteCookies({ cookieName: "email" });
            deleteCookies({ cookieName: "registered" });

        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Something went wrong when logging out...");
        } finally {
            setAuthLoading(false);
        }
    }

    //Radera användare
    const deleteAccount = async (id: number) => {
        setAuthError(null);
        try {

            setAuthLoading(true);

            const response = await fetch(`${apiUrl}/users/${id}`, {
                method: "DELETE",
                credentials: "include"
            }
            );

            const data: LoginResponse = await response.json();

            if(!response.ok) {
                handleError(data);
            }

            //Radering lyckades
            if (data.deletedUser) {
                setUser(null);
                setIsAuthenticated(false);

                //Radera cookies
                deleteCookies({ cookieName: "userId" });
                deleteCookies({ cookieName: "username" });
                deleteCookies({ cookieName: "fullName" });
                deleteCookies({ cookieName: "email" });
                deleteCookies({ cookieName: "registered" });

                //Global event så komponenter kan lyssna efter och omrendera
                window.dispatchEvent(new CustomEvent('userDeleted', { detail: { userId: id } }));
            }
            
        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Something went wrong when deleting user...");
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
        <AuthContext.Provider value={{user, isAuthenticated, authLoading, authError, login, signup, logout, deleteAccount}}>
            {children} 
        </AuthContext.Provider>
    )
}
