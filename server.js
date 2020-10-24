const http = require("http")

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController")

const server = http.createServer((req, res) => {
  /*res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.write("<h1>Hello world</h1>")
  res.end() */
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res)
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3]
    getProduct(req, res, id)
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res)
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3]
    updateProduct(req, res, id)
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    console.log(";...")
    const id = req.url.split("/")[3]
    deleteProduct(req, res, id)
  } else {
    res.writeHead(404, { "Content-type": "application/json" })
    res.end(
      JSON.stringify({
        message: "Sorry the route you're looking for is not found ",
      })
    )
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, console.log(`Server running on port ${PORT}`))
