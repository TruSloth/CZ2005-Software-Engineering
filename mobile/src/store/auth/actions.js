import { TOGGLE_LOGGED_IN } from "./constants"

export const toggleLogIn = (loggedIn) => {
    return (
        {
            type: TOGGLE_LOGGED_IN,
            payload: loggedIn
        }
    )
}
