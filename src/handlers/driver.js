import { dbConnectAndExecute } from "../db/index.js";
import { createErrorResponse, createResponse } from "../utils/index.js";
import Driver from "../db/models/Driver.js";
import errorConstants from "../errors/constants.js";
import MONGO_CONNECTION_STRING from "../env/index.js";

export default async function createDriver(body, quoteId) {
  const {
    currentIns,
    employmentStatus,
    gender,
    licensedDt,
    education,
    maritalStatus,
    name,
    licenseNum,
  } = body;

  if (
    !quoteId ||
    !currentIns ||
    !employmentStatus ||
    !gender ||
    !licensedDt ||
    !education ||
    !maritalStatus ||
    !name ||
    !licenseNum
  ) {
    return createErrorResponse(400, errorConstants.commons.badRequest);
  }

  const vehicle = new Driver({
    quoteId,
    currentIns,
    employmentStatus,
    gender,
    licensedDt,
    education,
    maritalStatus,
    name,
    licenseNum,
  });

  const result = await dbConnectAndExecute(MONGO_CONNECTION_STRING, () =>
    vehicle.save()
  );

  if (result) {
    return createResponse(200, {
      message: "Driver Created Successfully!!!",
      quoteId,
    });
  } else {
    throw new Error();
  }
}
