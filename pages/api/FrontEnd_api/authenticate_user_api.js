import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(db_credentials);
    const db = client.db();
    let records = [];
    const meta_data_collection = db
      .collection("meta_data_users")
      .find({ email: req.body.email })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log("-------------")
        console.log(result)
        if (result.length == 0) {
          res.status(201).json({
            responseCode: 2,
            responseMessage: "User Not Found",
            responsePayload: records,
          });
        } else if (result.length == 1) {
          console.log(req.body.password);
          console.log(result[0].password);
          if (result[0].password == req.body.password) {
            res.status(201).json({
              responseCode: 1,
              responseMessage: "user is authenticared",
              responsePayload: result[0],
            });
          } else {
            res.status(201).json({
              responseCode: 1,
              responseMessage: "Incorrect Password",
              responsePayload: null,
            });
          }
        } else {
          console.log("duplicate user");
          res.end();
        }
      });
  } else {
    res.status(500).json({
      responseCode: -1,
      responseMessage: "Fatal Error",
    });
    res.end();
  }
}
export default handler;
