import { v4 as uuidv4 } from "uuid";
import { calculatePoints } from "../services/calculate-points.js";

const receiptsStore = new Map();

export const processReceipt = (req, res) => {
  const receipt = req.body;
  const id = uuidv4();
  const points = calculatePoints(receipt);

  try {
    receiptsStore.set(id, points);

    res.status(200).json({ id });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPonts = (req, res) => {
  const { id } = req.params;
  const points = receiptsStore.get(id);
  try {
    if (points === undefined) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.status(200).json({ points });
  } catch (error) {
    throw new Error(error.message)
  }
};
