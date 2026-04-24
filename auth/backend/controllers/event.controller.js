export const fetchEvents = async (req, res) => {
  try {
    return res.status(200).json({ data: "data fetched" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong on fetchEvents",
      error: process.env.NODE_ENV === "development" ? error.message : "",
    });
  }
};
