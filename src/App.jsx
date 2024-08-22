import React, { useState, useEffect } from 'react'
import Products from './Products'
import PRODUCTS from './data.json'
import { FiShoppingCart } from "react-icons/fi";
import './App.css'
import Cart from './Cart'
import OrderConfirmed from './OrderConfirmed'
import {motion, AnimatePresence} from "framer-motion"
function App() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState(()=>{
    let newProducts = PRODUCTS.map(item=>{
        return {...item, added:false, numOfItem:0}//basically just adds the "added" key, sets it to false and adds the "numOfItem" and sets it to zero for every item
    })
    return newProducts
})
const [showCart, setShowCart] = useState(false)
const [showModal, setShowModal] = useState(false)
  return <>
  <nav className='nav' onClick={(e)=>{
           if(e.target.className.includes("nav")){
            setShowCart(false)
           }
        }}>
  <h1>Desserts</h1>
  <FiShoppingCart className='cartIcon' onClick={()=>{setShowCart(!showCart)}} />
  </nav>
    <main>
      <Products cart={cart} setCart={setCart} total={total} setTotal={setTotal} products={products} setProducts={setProducts} setShowCart={setShowCart} />
     <AnimatePresence
     mode="popLayout"
     >
     {showCart && <Cart
     cart={cart} setCart={setCart} total={total} setTotal={setTotal} products={products} setProducts={setProducts} setShowModal={setShowModal}/>}
     </AnimatePresence>
    </main>
    {showModal && <OrderConfirmed cart={cart} setCart={setCart} total={total} showModal={showModal} setShowModal={setShowModal} setProducts={setProducts} setTotal={setTotal} />}
  </>
}

export default App