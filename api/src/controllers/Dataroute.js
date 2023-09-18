const protectedRoute = (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
};

export { protectedRoute };
