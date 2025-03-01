'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";

const VerifyMail = () => {
    const [verified, setVerified] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            const verifyEmail = async () => {
                try {
                    const { data } = await axios.post("/api/users/verifymail", {
                        token,
                    });
                    console.log(data);
                    setVerified(true);
                } catch (error) {
                    console.log(error);
                    setVerified(false);
                }
            };
            verifyEmail();
        }
    }, [token]);

    return (
        <div>
            {verified ? (
                <h2>email verified successfully</h2>
            ) : (
                <h2>email verification failed</h2>
            )}
        </div>
    );
};

export default VerifyMail;