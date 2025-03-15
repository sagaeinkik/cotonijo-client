//Allt om användare i databas
export interface User {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
    registered: string;
}

//Skickas med i POST-anrop för inloggning
export interface LoginCredentials {
    username: string;
    password: string;
}

//Skickas med i POST-anrop för registrering
export interface SignupCredentials {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

//Respons från API
export interface LoginResponse {
    message: string;
    //Om lyckad inloggning
    loggedInUser?: {
        id: number;
        fullName: string;
        email: string;
        username: string;
        registered: Date;
    };

    //Om lyckad registrering
    newUser?: {
        id: number;
        fullName: string;
        email: string;
        username: string;
        registered: Date;
    };

    //Om egna error från API:et
    https_response?: {
        message: string;
        code: number;
    };

    //Server-error eller andra fel från Fastify
    statusCode?: number;
    code?: string;
    error?: number;
    messages?: string[];
}

//Context type
export interface AuthContextType {
    username: string | null;
    userId: number | null;
    isAuthenticated: boolean;
    authLoading: boolean;
    authError: string | string[] | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => Promise<void>;
}
