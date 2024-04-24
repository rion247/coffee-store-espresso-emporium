import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { auth } from './../FireBase/FireBase.Config';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, SetUser] = useState(null);
    const [loader, SetLoader] = useState(true);
    const [reload, SetReload] = useState(false);

    const createUserManually = (email, password) => {
        SetLoader(true);
        createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUserManually = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = new GoogleAuthProvider();
    const googleLogIn = () => {
        signInWithPopup(auth, googleProvider)
    }

    const gitHubProvider = new GithubAuthProvider();
    const gitHubLogIn = () => {
        signInWithPopup(auth, gitHubProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log('User is Signed In!!!');
                SetUser(currentUser);
                SetLoader(false);
            } else {
                console.log('User is Signed Out!!!');
                SetUser(null);
                SetLoader(false);
            }
        });

        return () => {
            unSubscribe();
        }
    }, [reload])




    const authInfo = {
        createUserManually,
        user,
        signInUserManually,
        googleLogIn,
        gitHubLogIn,
        loader,
        SetReload,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node,
}



export default AuthProvider;