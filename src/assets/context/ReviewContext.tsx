import { ReviewInfo, NewReview, UpdateReview, ReviewResponse, ReviewContextType } from "../types/review.type";
import React, { createContext, useState, useEffect, ReactNode } from "react";
//API
let apiUrl: string = "https://cotonijoapi.up.railway.app";

//Skapa context
export const ReviewContext = createContext<ReviewContextType>({
    reviews: [], 
    reviewLoading: false, 
    reviewError: null, 
    setReviews: () => {},
    getReviews: async () => {},
    createReview: async () => {},
    updateReview: async () => {},
    deleteReview: async () => {}
});


//Provider
export const ReviewProvider: React.FC<{children: ReactNode}> = ({children}) => {
    //States
    const [reviews, setReviews] = useState<ReviewInfo[]>([]);
    const [reviewLoading, setReviewLoading] = useState<boolean>(false);
    const [reviewError, setReviewError] = useState<string | string[] | null>(null);

    //Fetchanrop för alla inlägg
    const getReviews = async () => {
        setReviewError(null);

        try {
            //Sätt loading
            setReviewLoading(true);

            //Anrop
            const response = await fetch(`${apiUrl}/reviews`);
            const data = await response.json();

            //Sätt error
            if (!response.ok) {
                setReviewError(data.https_response?.message || data.message || "Couldn't fetch reviews...");
                return;
            }

            //Lagra reviews i local state
            setReviews(data);
        } catch (error) {
            setReviewError(error instanceof Error ? error.message : "An unknown error has occurred...");
        } finally {
            setReviewLoading(false);
        }
    }

    //Skapa inlägg
    const createReview = async (review: NewReview) => {
        
        try {
            //Sätt loading
            setReviewLoading(true); 

            //anrop
            const response = await fetch(`${apiUrl}/reviews`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(review)
            });

            const data: ReviewResponse = await response.json();

            //Sätt error
            if(!response.ok) {
                setReviewError(data.https_response?.message || data.message || "Couldn't create review...");
                return;
            }

            //Om svaret är bra
            if(data.review) {
                const addedReview: ReviewInfo = data.review;

                //Lägg till nya recensionen i local state
                setReviews(currentReviews => [addedReview, ...currentReviews]);
            }
            
        } catch (error) {
            setReviewError(error instanceof Error ? error.message : "An unknown error has occurred...");
        } finally {
            setReviewLoading(false);
        }
    }

    //Uppdatera inlägg
    const updateReview = async (id: number, review: UpdateReview) => {
        setReviewError(null);
        
        try {
            setReviewLoading(true);

            //Anrop
            const response = await fetch(`${apiUrl}/reviews/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(review)
            });

            const data: ReviewResponse = await response.json();

            if(!response.ok) {
                setReviewError(data.https_response?.message || data.message || "Couldn't update review...");
                return;
            }

            //Uppdatering lyckades
            if(data.review) {
                const updatedReview: ReviewInfo = data.review;

                //Uppdatera local state med den uppdaterade recensionen
                setReviews(currentReviews => currentReviews.map(review => review.id === id ? {...review, ...updatedReview} : review));
            }
            
        } catch (error) {
            setReviewError(error instanceof Error ? error.message : "An unknown error has occurred...");
        } finally {
            setReviewLoading(false);
        }
    }

    //Ta bort recension
    const deleteReview = async (id: number) => {
        setReviewError(null);
        
        try {
            setReviewLoading(true);

            //Anrop
            const response = await fetch(`${apiUrl}/reviews/${id}`, {
                method: "DELETE", 
                credentials: "include"
            }); 

            const data: ReviewResponse = await response.json();

            if(!response.ok) {
                setReviewError(data.https_response?.message || data.message || "Couldn't delete review...");
                return;
            }

            //Radering lyckades
            if(data.review) {
                //Filtrera bort den raderade recensionen från local state
                setReviews(currentReviews => currentReviews.filter(review => review.id !== id));
            }


        } catch (error) {
            setReviewError(error instanceof Error ? error.message : "An unknown error has occurred...");
        } finally {
            setReviewLoading(false);
        }
    }

    //Hämta recensioner vid mount
    useEffect(() => {
        //Filtreringsfunktion för att ta bort recensioner från användare
        const handleUserDeleted = (e: any) => {
            const { userId } = e.detail;
            setReviews(currentReviews => currentReviews.filter(review => review.author.id !== userId));
        }; 
    
        //Lägg på händelselyssnare för att lyssna efter userDeleted från AuthContext 
        window.addEventListener("userDeleted", handleUserDeleted);
    
        getReviews();
        
        //Ta bort händelselyssnare
        return () => {
            window.removeEventListener("userDeleted", handleUserDeleted);
        };
    }, []);

    //Returnera
    return (
        <ReviewContext.Provider value={{reviews, setReviews, reviewLoading, reviewError, getReviews, createReview, updateReview, deleteReview}}>
            {children}
        </ReviewContext.Provider>
    )
};