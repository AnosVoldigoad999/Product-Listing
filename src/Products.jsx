import React, {useState, useEffect} from 'react'
import {motion} from "framer-motion"
function Products({cart, setCart, total, setTotal, products, setProducts, setShowCart}) {
    const [screenSize, setScreenSize] = useState()
   window.addEventListener("resize", ()=>{
    if(window.innerWidth<=702){
        setScreenSize("mobile")
    }else if(window.innerWidth<=918 && window.innerWidth>702){
        setScreenSize("tablet")
    }else{
        setScreenSize("desktop")
    }
   })

    useEffect(()=>{
        let newCart = cart.filter(cartItem=>{//new cart
            return cartItem.numOfItem !=0 //return every cartItem that doesnt have a numOfItem of 0
        })
        setCart(newCart)
    }, [products])//runs everytime "products" changes, to remove any item with a numOfItem of 0

    
   const handleCart = (item) =>{//for adding items to the cart
    //start
    let isIn = false
    for(let i=0; i<cart.length; i++){
        if(cart[i].name===item.name){ //runs a loop that uses the i value as an index and checks if any of the items returned has a matching name with the passed "item"
             isIn = true //if it does, set the isIn variable to true(useful for avoiding duplication)
        }
    }

    if(!isIn){//if its not in the cart
        let newItem = {...item, numOfItem:1, total:item.price} //create a new object with the passed item's value and set numOfItem to 1
        setCart([...cart, newItem])//add said object to the cart array
        console.log(newItem, isIn)
    }else{//if it is in the cart
        let newCart = cart.map(cartItem=>{//new cart
            if(item.name===cartItem.name){//find the product that matches using names
                let nums = cartItem.numOfItem //new variable that holds the numOfItem value
                let price = cartItem.price//variable that holds the price value
                return {...cartItem, numOfItem:nums+1, total:price*(nums+1)} //return said item and change the numOfItem value to its previous value plus 1 and also change the "total value"
            }else{
                return cartItem//no match? do nothing
            }
        })
       setCart(newCart) //set cart to newCart
    }
let newTotal = total + item.price //totaaalllllll
setTotal(newTotal)
    
//end
   }

   const handleAdded = (item)=>{//function for removing the add to cart button and adding an incrementDecrement thing
    //start
    let newProducts = products.map(product=>{
        if(product.name===item.name && !item.added){
            return {...product, added:true, numOfItem:1}//if the product's name matches with the item's name(passed object) set the "added" value to true and set the numOfItem to 1
        }else{
            return product //if it does'nt, do nothing, just return the product
        }
    })
    setProducts(newProducts)
    //end
   }


   const handleAdd = (item) =>{ //function for increasing the numOfItem 
    /*start*/
    let newProducts = products.map(product=>{
        if(product.name===item.name){
            return{...item, numOfItem:product.numOfItem+1}//if the product's name and the item's name match, change the numOfItem of that product to the products numOfItem plus 1
        }else{
            return product //if they dont match just return the product
        }
    }) 
    setProducts(newProducts) 
    let newCart = cart.map(cartItem=>{
        if(cartItem.name===item.name){
            return {...cartItem, numOfItem:cartItem.numOfItem+1, total: cartItem.price*(cartItem.numOfItem+1) } //looks for a product in the cart thats matches with the item and also adds to its numOfItem value, also changes the total
        }else{
            return cartItem
        }
    })
    let newTotal = total+item.price //new variable that holds the value of the "total" state plus the items price 
    setTotal(newTotal) //sets the "total" state to new total
    setCart(newCart)
    /*end*/
   }


   const handleSubtract = (item) =>{//function for decreasing the numOfItem 
    /*start*/
    let newProducts = products.map(product=>{
        if(product.name===item.name){//if the product's name and item's name match
            if(product.numOfItem!=1){//and also if the numOfItem value is not equal to one (so it'd be able to know when to remove the incrementDecrement thing)
                return {...product, numOfItem:product.numOfItem-1}//minus 1
            }else{
                return {...product, numOfItem:0, added:false} //if the numOfItem is equal to 1, change the value of "added" to false, removing the incrementDecrement thing and also set numOfItem to 0
            }
        }else{
            return product
            
        }
    })
    setProducts(newProducts)

    let newCart = cart.map(cartItem=>{
        if(cartItem.name===item.name){
            return {...cartItem, numOfItem:cartItem.numOfItem-1} //looks for a product in the cart thats matches with the item and also subtracts from its numOfItem value, also changes the total
        }else{
            return cartItem
        }
    })
    setCart(newCart)
    let newTotal = total-item.price //new variable that holds the value of the "total" state minus the items price 
    setTotal(newTotal)
/*end*/
   }
  



  return <>
        <div className="grid" onClick={()=>{
            setShowCart(false)
        }}>
            {products.map((product, index)=>{
                return <motion.div
                initial={{scale:0}}
                whileInView={{
                    scale:1}}
                    transition={{
                        ease:"backInOut",
                        duration:0.1
                    }}
                    viewport={{
                        once:true
                    }}
                key={index} className="product" >
                    <img src={screenSize==="mobile"?product.image.mobile:screenSize==="tablet"?product.image.tablet:product.image.desktop} alt="productImg" className='productImg' style={{border:`${product.added ? "2px solid hsl(14, 86%, 42%)":""}`}}/>
                {/*if product.added is false show the add to cart button, else show the incrementDecrement thing */}    {!product.added?<button onClick={()=>{handleCart(product);handleAdded(product)}}><img src='/assets/images/icon-add-to-cart.svg' />Add to cart</button>:<div className='incrementDecrement'>
                        <img src="/assets/images/icon-decrement-quantity.svg" alt="minus" onClick={()=>{handleSubtract(product)}}/>{/*minus button */}
                        {product.numOfItem}
                        <img src="/assets/images/icon-increment-quantity.svg" alt="plus" onClick={()=>{handleAdd(product)}} />{/*plus button */}
                        </div>}
                    <p className='category'>{product.category}</p>
                    <p className='name'>{product.name}</p>
                    <p className='price'>${(product.price).toString().includes(".") ? (product.price).toString()+"0":(product.price).toString()+".00"}</p>{/*if the product price converted to a string has a dot, add a zero to it, if not add  a .00  to it....6.5 become 6.50 and 7 becomes 7.00*/}
                </motion.div>
            })}
        </div>
  </>
}

export default Products