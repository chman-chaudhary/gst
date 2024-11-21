import nextConnect from "next-connect";
import multer from "multer";
import XLSX from "xlsx";
import dbConnect from "@/lib/dbConnect";
import InwardPayment from "@/lib/models/InwardPayment";

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: "Method not allowed" });
  },
});

// Handle multipart/form-data
apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
    await dbConnect();

    const fileBuffer = req.file.buffer;

    // Parse the Excel file
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Insert data into MongoDB
    await InwardPayment.insertMany(sheetData);

    res.status(200).json({ message: "Data imported successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for multer
  },
};
