import express from "express";
import bodyparser from "body-parser";
import router from "./routes/routes.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use("/", router);
