import React, { useEffect, useState } from 'react';
import { verifyToken } from '../auth';
import {useCookies} from "react-cookie"; // Assuming the path is correct

const App = () => {
    const [userData, setUserData] = useState(null);
    const [cookies, removeCookie] = useCookies(['auth']);
    useEffect(() => {
        const fetchData = async () => {
            // Retrieve authentication token from the cookie
            const authToken = cookies.auth;

            // Check if the token exists
            if (authToken) {
                try {
                    // Use verifyToken function to validate the token and get user data
                    const { isValid, user } = await verifyToken(authToken);
                    console.log(isValid);
                    console.log(user);
                    if (isValid) {
                        setUserData(user);
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAASADSASDSASADASD", user);
                    } else {
                        // Handle invalid token (optional)
                        console.error('Invalid token');
                    }
                } catch (error) {
                    // Handle errors from the verifyToken function
                    console.error('Error verifying token:', error);
                }
            } else {
                // Handle the case where the token doesn't exist (optional)
                console.error('Token not found');
            }
        };

        fetchData(); // Invoke the function immediately

        // Empty dependency array to run the effect only once
    }, [cookies.auth]);
    // Empty dependency array to run the effect only once

    return (
        <div className="container pt-5 pb-5">
            <h2>Cinemas Map</h2>
            {userData && (
                <div>
                    <h3>User Profile</h3>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    {/* Add more user data fields as needed */}
                </div>
            )}
        </div>
    );
};

export default App;
