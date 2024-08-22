import React from 'react'
import PRODUCTS from './data.json'
import {motion} from "framer-motion"
function OrderConfirmed({cart, setCart, total, showModal, setShowModal, setProducts, setTotal}) {
    const handleOrder =()=>{//ordersssssssss
        setShowModal(false)//removes the modal
        setTotal(0)//total=0
                setCart([])//empties the cart
                let newProducts = PRODUCTS.map(item=>{
                    return {...item, added:false, numOfItem:0}//basically just adds the "added" key, sets it to false and adds the "numOfItem" and sets it to zero for every item
                })
               setProducts(newProducts)
    }
  return <>
    <div className='confirmedModal' onClick={(e)=>{
        if(e.target.className.includes("confirmedModal")){//basically says "if whatever calls me has the word confirmedModal in its className? call handleOrder()"
            handleOrder()
        }
    }}>
        <motion.div
        initial={{
            rotate:"0deg",
            scale:0
        }}
        animate={{
            rotate:"360deg",
            scale:1
        }}
        transition={{
            duration:0.1
        }}
        className="modalContent">
            <img src="/assets/images/icon-order-confirmed.svg" alt="confirmed" />
            <div className="top">
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
            </div>
           <div className="chosenItemsContainer">
           <div className='chosenItems'>
        {cart.map((item, index)=>{
        return <div key={index} className="item">
            <img src={item.image.thumbnail}  />
            <div className="section1">

                <p className='name'>{item.name}</p>
                <div className="section1-2">
                    <p className='nums'>{item.numOfItem}x</p>
                    <p className='at'>@ ${(item.price).toString().includes(".") ? (item.price).toString()+"0":(item.price).toString()+".00"}</p>{/*if the product price converted to a string has a dot, add a zero to it, if not add  a .00  to it....6.5 become 6.50 and 7 becomes 7.00*/}
                </div>
            </div>
            <div className="section2">
            <p className='itemTotal'>${(item.total).toString().includes(".") ? (item.total).toString()+"0":(item.total).toString()+".00"}</p>
            </div>
        </div>
       })}
        </div>
        <div className="footerSection1">
                <p>Order Total</p>
                <h3>${(total).toString().includes(".") ? (total).toString()+"0":(total).toString()+".00"}</h3>{/*same thing with the product price stuff but for the total */}
            </div>
           </div>
            <button onClick={()=>{handleOrder()}}>Start New Order</button>
        </motion.div>
    </div>
  </>
}

export default OrderConfirmed