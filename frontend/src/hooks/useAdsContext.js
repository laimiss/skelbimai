import { AdContext } from "../context/AdContext"
import { useContext } from "react"


export const useAdsContext = () => {
    const context = useContext(AdContext)

    if (!context) {
        throw Error('AdContext turi buti AdContext Provideryje')
    }

    return context
}

