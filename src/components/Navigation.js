import { Nav, Navbar, NavLink, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {userSession, authenticate, login, verifyToken} from '../auth';
import {useCookies} from "react-cookie";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import '../App.css';

const Navigation = () => {

    const [cookies, removeCookie] = useCookies(['auth']);
    const [isUserVerified, setIsUserVerified] = useState(false);
    function aaa() {
        console.log("A.a.a")
    }

    const handleSignOut = () => {
        signOut();

        window.location.href = '/';
    };
    function signOut() {
        removeCookie('auth');
    }
    useEffect(() => {
        const checkUserVerification = async () => {
            if (cookies.auth) {
                let length = cookies.auth.length;

                if (length > 20) {
                    const info = await verifyToken(cookies.auth);

                    if (info.isValid) {
                        console.log("Token is Valid");
                        setIsUserVerified(true);
                        return true
                    } else {
                        console.log("Error in validation");
                        setIsUserVerified(false);
                        return false
                    }
                } else {
                    console.log('Token length is not greater than 20');
                    setIsUserVerified(false);
                    return false
                }
            } else {
                console.log("token cookie is missing");
                setIsUserVerified(false);
                return false
            }
        };

        checkUserVerification().then(result => {
            console.log('Result from checkUserVerification:', result);
        });
    }, [cookies.auth]);

    return (
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav>
                            <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                            <NavLink eventKey="2" as={Link} to="/movies">Movies</NavLink>
                            <NavLink eventKey="3" as={Link} to="/users">Users</NavLink>
                            <NavLink eventKey="4" as={Link} to="/map">Map</NavLink>

                            {!isUserVerified && (
                                <NavLink eventKey="5" as={Link} to="/login" className="login-link">
                                    Login
                                </NavLink>
                            )}

                            {isUserVerified && (
                                <>
                                    <NavLink eventKey="6" as={Link} to="/profile">
                                        Profile
                                    </NavLink>

                                    <Button onClick={handleSignOut} variant="outline-light">
                                        Sign Out
                                    </Button>
                                </>
                            )}
                        </Nav>

                    </Navbar.Collapse>

                    {!userSession.isUserSignedIn() ?
                        <a className="nav-link" href="#"
                           onClick={() => authenticate()}>Digital Wallet Login</a> :
                        <a className="nav-link" href="#"
                           onClick={ () => {
                               userSession.signUserOut();
                               window.location = '/';
                           }} >Signout Wallet
                        </a>

                    }
                </div>
            </Navbar>
    );
}
 
export default Navigation;