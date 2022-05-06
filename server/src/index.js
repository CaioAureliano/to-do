import "dotenv/config";
import express from "express";
import HandleResponseToJson from "./middleware/HandleResponseToJson";
import { handleHttpError, logError } from "./middleware/handle_errors";
import { logHttpRequest } from "./middleware/log_request_middleware";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(logHttpRequest);
app.use(HandleResponseToJson);

app.use(routes);

app.use(logError);
app.use(handleHttpError);

export default app;