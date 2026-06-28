/**
 * Controller function to retrieve team details
 */
export const getAbout = async (req, res) => {
  try {
    // Static team members data
    const team = [
      { first_name: "Shir", last_name: "Oziel" },
      { first_name: "Yarden", last_name: "Kahlon Avital" }
    ];
    
    res.json(team); // Send response with team details
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle server error
  }
};