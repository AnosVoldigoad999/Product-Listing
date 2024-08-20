import React, { useState, useEffect } from 'react'
import Products from './Products'
import PRODUCTS from './data.json'
import './App.css'
import Cart from './Cart'
import OrderConfirmed from './OrderConfirmed'
function App() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState(()=>{
    let newProducts = PRODUCTS.map(item=>{
        return {...item, added:false, numOfItem:0}//basically just adds the "added" key, sets it to false and adds the "numOfItem" and sets it to zero for every item
    })
    return newProducts
})
const [showModal, setShowModal] = useState(false)
  return <>
    <main>
      <Products cart={cart} setCart={setCart} total={total} setTotal={setTotal} products={products} setProducts={setProducts} />
      <Cart cart={cart} setCart={setCart} total={total} setTotal={setTotal} products={products} setProducts={setProducts} setShowModal={setShowModal}/>
      {showModal && <OrderConfirmed cart={cart} setCart={setCart} total={total} showModal={showModal} setShowModal={setShowModal} setProducts={setProducts} setTotal={setTotal} />}
    </main>
  </>
}

export default App