import { createErrorResponse } from "./utils/index.js";
import errorConstants from "./errors/constants.js";
import createDriver from "./handlers/driver.js";

export async function handler(event) {
  try {
    const { path, method } = event.requestContext.http;

    if (path.startsWith("/api/drivers/driverInfo")) {
      if (method.toLowerCase() === "post") {
        return await createDriver(
          JSON.parse(event.body),
          event?.pathParameters?.quoteId
        );
      }
    }
  } catch (err) {
    return createErrorResponse(500, errorConstants.commons.internalServerError);
  }
}
