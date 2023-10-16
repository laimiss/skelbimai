import { createContext, useReducer } from "react";

export const AdContext = createContext()

export const adsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADS':
            return {
                ads: action.payload
            }

        case 'CREATE_AD':
            return {
                ads: [action.payload, ...state.ads]
            }

        case 'DELETE_AD':
            return {
                ads: state.ads.filter((ad) => ad._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const AdContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adsReducer, {
        ads: null
    })


    return (
        <AdContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdContext.Provider>
    )
}

