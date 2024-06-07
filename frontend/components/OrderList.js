import React, {useState} from 'react'
import { useGetOrdersQuery } from '../state/OrdersApi'



export default function OrderList() {
  // const orders = [
  //   { fullName: "Jane Doe", size: "L", toppings: ["1","2","3","4","5"] },
  //   {fullName: "John Doe", size: "S", toppings: ["1"]},
  //   {fullName: "Wan Doe", size: "M", toppings: []}
  // ]

  const {
    data : orders,
  } = useGetOrdersQuery()

  const sFilter = orders?.filter( order => order.size == 'S')
  const mFilter = orders?.filter( order => order.size == 'M')
  const lFilter = orders?.filter( order => order.size == 'L')
  //console.log(sFilter,mFilter,lFilter)
  
  const sizeFilter = ['All', 'S', 'M', 'L']
  

  const [active, setActive] = useState('All')

  //console.log(orders)
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {( active == 'All' ? orders 
        : active == 'S' ? sFilter
        : active == 'M' ? mFilter
        :  lFilter)
           ?.map((order, idx) => {
            return (
              <li key={idx}>
                <div>
                  {`${order.customer} ordered a size ${order.size}
                   with ${
                    !order.toppings 
                  ? 'no toppings' 
                  : order.toppings.length == 1 
                  ? `${order.toppings.length} topping` 
                  : `${order.toppings.length} toppings` }`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          sizeFilter.map(size => {
            const className = `button-filter${size == active ? ' active' : ''}`
            return <button
            onClick={() => setActive(size)}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
