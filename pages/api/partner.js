import connectDB from "../../utils/connectDB";
import partnerModel from "../../models/partnerModel";
import errorResponse from "../../utils/errorResponse";
import parseRequest from "../../middlewares/parseRequest";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
  }
};

const register = async (req, res) => {
  try {
    const response = await parseRequest(req);
    if (!response.success) throw { message: response.message };
    const { Name, Phone, Location } = response.body;
    let data = {
      Name,
      Phone,
      Location,
    };
    await partnerModel.create(data);
    res.status(201).json({
      success: true,
      message: "Registration Completed Successfully",
    });
  } catch (error) {
    const response = errorResponse(error);
    console.log("Partner Register Error", error);
    res
      .status(response.code)
      .json({ success: false, message: response.message });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
