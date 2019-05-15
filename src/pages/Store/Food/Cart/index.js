

export const AddToCart = async (userid, item) => {
  let cartItem = []

  let previewsCart = localStorage.getItem('cart')
  let checkPreviews = new Promise((resolve, reject) => {
    if(previewsCart) {
      cartItem = JSON.parse(previewsCart).cart
    
      cartItem.map(data => {
        if(data.itemid == item.itemid) {
           reject(400)
        }
      })
        cartItem.push(item)
        resolve(cartItem)
     
    } else {
      cartItem.push(item)
      resolve(cartItem)
    }
  })


  
 await checkPreviews.then((cart, err) => {
    if(err) {
      alert('already in cart')
    } else {
      let cartObj = {
        userid: userid,
        cart: cart
      }
      localStorage.setItem('cart', JSON.stringify(cartObj))
      return true
    }
  })  
}


export const updateCart = async (item) => {
  let cartItem = []

  let previewsCart = localStorage.getItem('cart')
  let checkPreviews = new Promise((resolve, reject) => {
      cartItem = JSON.parse(previewsCart).cart
      cartItem.map((data, i )=> {
        if(data.itemid == item.itemid) {
           data.count = item.count
           resolve(cartItem)
        }
      })
  })

  checkPreviews.then(resolve => {
    localStorage.setItem('cart', JSON.stringify({cart: resolve}))
  })
}



export const removeItem = (itemid) => {
  let cart = JSON.parse(localStorage.getItem('cart')).cart
  let updatedCart = []
    cart.map((data, i) => {
      if(data.itemid == itemid) {
        cart.splice(i, 1)
      }
    })
    localStorage.setItem('cart', JSON.stringify({cart: cart}))
}

export const clearCart = () => {
  let empty = {
    cart: []
  }
  localStorage.setItem('cart', JSON.stringify(empty))
}