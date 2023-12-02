const app = require("./src/app");
const {
    api: { port },
} = require("./src/configs");
// const swaggerDocs = require("./swagger");

const PORT = port;

const server = app.listen(PORT, () => {
    console.log(`Ecommerce start with adress http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log("Exit server express!"));
});