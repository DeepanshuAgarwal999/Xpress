"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/verifyemail', { token });
            setVerified(true);
        } catch (error:any) {
            setError(true);
            if (error.response) {
                // Handle the case where the server responds with a message
                setErrorMessage(error.response.data.error || "An error occurred during verification.");
            } else {
                // Handle other types of errors (e.g., network error)
                setErrorMessage("The verification service is currently unavailable. Please try again later.");
            }
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                        <p className="text-black mx-2">Now Login</p>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error: {errorMessage}</h2>
                </div>
            )}
        </div>
    );
}
