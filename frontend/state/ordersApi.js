import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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