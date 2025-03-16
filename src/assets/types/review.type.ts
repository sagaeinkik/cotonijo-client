// Allt som lagras om reviews i databasen
export interface Review {
    id: number;
    content: string;
    rating: number;
    ccn3: string;
    userId: number;
    posted: string;
}

//Review som skickas som svar från API
export interface ReviewInfo {
    id: number;
    content: string;
    rating: number;
    ccn3: string;
    posted: string;
    userId?: number;
    author: {
        id: number;
        fullName: string;
        username: string;
    };
}

//Vad som skickas till databasen för att skapa ny review
export interface NewReview {
    content: string;
    rating: number;
    ccn3: string;
    userId: number;
}

//Vid uppdatering skickar man bara in de fält som ska uppdateras
export type UpdateReview = Partial<NewReview>;

//Svar från API vid create, update eller delete
export interface ReviewResponse {
    message: string;
    review?: ReviewInfo;

    //Egna error från API
    https_response?: {
        message: string;
        code: number;
    };

    //Error från server/validering osv
    messages?: string[];
    statusCode?: number;
    code?: string;
    error?: number;
}

export interface ReviewContextType {
    reviews: ReviewInfo[];
    reviewLoading: boolean;
    reviewError: string | string[] | null;
    getReviews: () => Promise<void>;
    createReview: (review: NewReview) => Promise<void>;
    updateReview: (id: number, review: UpdateReview) => Promise<void>;
    deleteReview: (id: number) => Promise<void>;
}
