import React from 'react'
import {motion} from "framer-motion"
function Cart({cart, setCart, total, setTotal, products, setProducts, setShowModal}) {
    const handleDelete = (item)=>{ //delete
        //start
        let newCart = cart.filter(product=>{
            return product !=item
        })//return every product that doesn't match with the passed item
        setCart(newCart)//then set Cart to newCart
        let newTotal = total //totaaaalllllllll
        let totalPriceOfItem = item.price * item.numOfItem //new variable that stores the "totalPriceOfItem"(price times numOfItem)
        newTotal = newTotal - totalPriceOfItem 
        setTotal(newTotal)


        let newProducts = products.map(product=>{//new products(this basically works to remove the incrementDecrement thing)
            if(product.name===item.name){ //product name and item name match?
                return {...product, added:false} // return the matched product, but first! set the "added" value to false, replacing the incrementDecrement thing with the add to cart button on the product page
            }else{
                return product //no match? do nothing
            }
        })

        setProducts(newProducts)

        //end
    }
  return <>
    <motion.div 
     initial={{
        scale:0
       }}
       animate={{
        scale:1
       }}
       style={{
        transformOrigin:"100% 0"
       }}
       transition={{
        ease:"easeInOut",
       duration:0.1
       }}
       exit={{
        x:500
       }}
     
    className='cart'>
        <h3>Your Cart ({cart.length})</h3>
        {cart.length===0 ? 
       <div style={{display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"70%"
       }}>
        <img src="/assets\images/illustration-empty-cart.svg" alt="" />
        <p>Your added items will appear here</p>
       </div>: <div className='cartItems'>
        {cart.map((item, index)=>{
        return <div key={index} className="item">
            <div className="section1">
                <p className='name'>{item.name}</p>
                <div className="section1-2">
                    <p className='nums'>{item.numOfItem}x</p>
                    <p>@ ${(item.price).toString().includes(".") ? (item.price).toString()+"0":(item.price).toString()+".00"}</p>
                    <p className='itemTotal'>${(item.total).toString().includes(".") ? (item.total).toString()+"0":(item.total).toString()+".00"}</p>{/*if the product price converted to a string has a dot, add a zero to it, if not add  a .00  to it....6.5 become 6.50 and 7 becomes 7.00*/}
                </div>
            </div>
            <div className="section2">
                <img src="/assets/images/icon-remove-item.svg" alt="remove" onClick={()=>{handleDelete(item)}} />
            </div>
        </div>
       })}
        </div>
        }
        {cart.length!=0 && <div className="footer">
            <div className="footerSection1">
                <p>Order Total</p>
                <h3>${(total).toString().includes(".") ? (total).toString()+"0":(total).toString()+".00"}</h3>{/*same thing with the product price stuff but for the total */}
            </div>
            <div className="footerSection2">
                <img src="/assets/images/icon-carbon-neutral.svg" alt="tree?" />
                <p>This is a <b>carbon-neutral</b> delivery </p>
            </div>
            <button onClick={()=>{setShowModal(true)}}>Confirm Order</button> {/*show modaaaaaalllll */}
        </div>}
    </motion.div>
  </>
}

export default Cart