import React from "react";
import { loadStripe } from "@stripe/stripe-js"
import { graphql, useStaticQuery } from "gatsby"

export default function Home() {

    const redirectToCheckout = async (event, pID) => {
        event.preventDefault()
        const stripe = await loadStripe("pk_test_51IFgsOEKmVUFQ1LBOrfG3gGLB0R824zGRnmece2ZXQEdXvXVDJPD826ICmpgLXhpGjMMEaqLy5Elpv7QmKtXDNKa00LK32hCBL")
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: [{ price: pID, quantity: 1 }],
            successUrl: `http://localhost:8000/payment-success`,
            cancelUrl: `http://localhost:8000/payment-error`,
        })
        if (error) {
            console.warn("Error:", error)
        }
    }

    const data = useStaticQuery(graphql`
    query MyQuery {
        allStripePrice {
          edges {
            node {
              product {
                images
                id
                name
                description
              }
              id
            }
          }
        }
      }
      
    `)
    console.log(data);

    return <div>
        <h1>My Products</h1>
        {
            data.allStripePrice.edges.map(({ node }) => {
                return <div key={node.id}>
                    <p><b>{node.product.name}</b></p>
                    <p><i>{node.product.description}</i></p>
                    <img src={node.product.images[0]} height="100" width="50" />
                    <br/>
                    <button onClick={(e) => redirectToCheckout(e, node.id)}>Buy {node.product.name}</button>
                    < hr /> 
                </div>
            })
        }
    </div>
}
