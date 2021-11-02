//  api/register-account
import { MongoClient, ObjectID } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("updating user account status with " + db_credentials);
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db.collection("meta_data_users");
      const payload = {
        _id: req.body._id,
        userAccountStatus:req.body.userAccountStatus
      };
      console.log("Current status");
      console.log(payload.userAccountStatus)
      console.log(payload._id)
      const result = await meta_data_collection.updateOne(
        { _id: ObjectID(payload._id) },
        { $set: {userAccountStatus: payload.userAccountStatus } },
        (error, response) => {
          res.status(201).json({
            responseCode: 1,
            responseMessage: "Record Updated",
            responsePayload: response,
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(201).json({
        responseCode: 2,
        responseMessage: "Error",
        responsePayload: error,
      });
    }
  } else {
    res.status(500).json({
      responseCode: -1,
      responseMessage: "Fatal Error",
    });
    res.end();
  }
}

export default handler;
