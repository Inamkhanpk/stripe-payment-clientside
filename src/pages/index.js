import React from "react"
import { loadStripe } from "@stripe/stripe-js"

export default function Home() {
  

  const redirectToCheckout = async event => {
    event.preventDefault()
    
    const stripe = await loadStripe("pk_test_51IFgsOEKmVUFQ1LBOrfG3gGLB0R824zGRnmece2ZXQEdXvXVDJPD826ICmpgLXhpGjMMEaqLy5Elpv7QmKtXDNKa00LK32hCBL")
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1IFh5dEKmVUFQ1LBocwznK9T", quantity: 1 }],
      successUrl: `http://localhost:8000/payment-success`,
      cancelUrl: `http://localhost:8000/payment-error`,
    })
    if (error) {
      console.warn("Error:", error)
    
    }
  }

  return   (
    <button
    
      onClick={redirectToCheckout}
    >
      BUY MY BOOK
    </button>
  )
}
