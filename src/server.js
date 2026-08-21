import app from "./app.js"
import { configDotenv } from "dotenv";

configDotenv()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});

