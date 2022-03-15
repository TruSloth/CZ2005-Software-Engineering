import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin'

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

export const googleIsSignedIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn
    } catch (e) {
        console.log(e)
    }
}

export const googleSignOut = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
    } catch (e) {
        console.log(e)
    }
}