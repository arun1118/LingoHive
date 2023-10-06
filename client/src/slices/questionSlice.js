import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const QUESTIONS_FETCH_POST_URL="/question";

const initialState={
    questions:[],
    // 'idle': can fetch post | 'succeeded': fetched problems from backend | 'failed': failed to fetch data | loading: on the way to fetch
    status: 'idle', 
    error: null
}

export const fetchQuestions=createAsyncThunk('questions/fetchQuestions',async(language)=>{
    try {
        const resp=await axios.get(`${QUESTIONS_FETCH_POST_URL}/${language}`);
        return [...resp.data.data];
    } catch (error) {
        return error.message;
    }
})


export const questionsSlice=createSlice({
    name: 'questions',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchQuestions.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchQuestions.fulfilled,(state,action)=>{
            state.status='succeeded';
            const tempData=action.payload;
            state.questions=tempData;
        })
        .addCase(fetchQuestions.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message;
        })
    }
})

export const selectAllQuestions=(state)=>state.questions.questions;
export const getQuestionsStatus=(state)=>state.questions.status;
export const getQuestionsError=(state)=>state.questions.error;

export default questionsSlice.reducer;