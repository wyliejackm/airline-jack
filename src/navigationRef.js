import { NavigationActions } from "react-navigation";

let navigator;

export const setNavgiator = (nav) => {
    navigator = nav
}

export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName: routeName,
            params: params
        })
    )
}