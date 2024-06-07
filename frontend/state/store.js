import { configureStore } from '@reduxjs/toolkit'
//import { ordersApi } from './OrdersApi'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const exampleReducer = (state = { count: 0 }) => {
  return state
}


export const ordersApi = createApi({
    reducerPath : 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:9009/api/pizza/' }),
    tagTypes: ['Orders'],
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => 'history',
            providesTags: ['Orders']
        }),
        createOrder: builder.mutation({
            query: payload => ({
                url: 'order',
                method: 'POST',
                body: { fullName: payload.customer, size: payload.size, toppings: payload.toppings }
            }),
            invalidatesTags: ['Orders']
        }),

    })
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
} = ordersApi

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    // add your reducer(s) here
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: getDefault => getDefault().concat(ordersApi.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
