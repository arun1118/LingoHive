import { apiSlice } from "./apiSlice.js";
const USER_URL='/user';


// injectEndpoints allows us to make our own endpoints and helps injecting it inside the apiSlice.js (endpoints -> builder)
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: ()=>({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),
        updateUser: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});


export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation} = userApiSlice;