import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin'

/** 
 * Signs the user into their google account via Google Signin.
 * 
 * @memberof auth
 * @function googleSignIn
 * @async
 * @returns {userInfo}
 */

export const googleSignIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo
    } catch (e) {
        if (e.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('Sign In Cancelled')
        } else if (e.code === statusCodes.IN_PROGRESS) {
            console.log('Operation already in progress')
        } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services not available or outdated')
        } else {
            console.log(e)
        }
    }
}

/** 
 * Checks if the user is currently signed into google.
 * 
 * @memberof auth
 * @function googleIsSignedIn
 * @async
 * @returns {Boolean}
 */

export const googleIsSignedIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn
    } catch (e) {
        console.log(e)
    }
}

/** 
 * Signs the user out of their google account.
 * 
 * @memberof auth
 * @function googleSignOut
 * @async
 * @returns {response}
 */

export const googleSignOut = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
    } catch (e) {
        console.log(e)
    }
}