import axios from "axios"; // import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  // const session = await getSession({ req });

  if (req.method == "POST") {
    try {
      const userId = req.body;
      const {token}  = req.body;

      console.log(userId, "userId ih");

      var config = {
        method: "post",
        url: "http://3.109.75.65:4001/api/v1/admin/getstakingdata",
        // headers: {
        //   Authorization: `Bearer ${token} `,
        // },
        data:userId,
      };

      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err, "error for misund");
      res.status(500).json({ Error: err });
    }
  }
}
