/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyCollection {
    	    nodes {
    	      handle
    	    }
    	  }
      allShopifyPage {
          nodes {
            handle
          }
        }
       allShopifyProduct {
        nodes {
          handle
        }
      }
    }
  `).then(result => {
    result.data.allShopifyCollection.nodes.forEach(({ handle }) => {
      createPage({
        path: `/collections/${handle}/`,
        component: path.resolve(`./src/templates/collectionsPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: handle,
        },
      })
    })

     result.data.allShopifyPage.nodes.forEach(({ handle }) => {
      createPage({
        path: `/page/${handle}/`,
        component: path.resolve(`./src/templates/InnerPages/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: handle,
        },
      })
    })

     result.data.allShopifyProduct.nodes.forEach(({ handle }) => {
      createPage({
        path: `/products/${handle}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: handle,
        },
      })
    })
    
   
  })
}
