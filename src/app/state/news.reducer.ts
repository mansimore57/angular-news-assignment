import { createReducer, on } from "@ngrx/store"
import { fetchAllNews } from "./news.action"

const initialState = {
    allArticle: []
}

export const newsReducer = createReducer(
    initialState,
    on(fetchAllNews, (state, action) => {
        console.log(action.allArticle)
        return {
            ...state,
            allArticle: action.allArticle
        }; 
    })
)