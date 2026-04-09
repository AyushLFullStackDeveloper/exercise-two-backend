const dashboardController = {
  getStats: async (req, res) => {
    try {
      const { role_id } = req.query;
      
      // Dummy data based on standard roles
      const dummyStats = {
        institutes_active: "08",
        institutes_inactive: "03",
        total_modules: "15+",
        total_users: "50+",
        attendance_rate: "94%",
        pending_assignments: "05",
        upcoming_events: "02"
      };

      return res.status(200).json({
        success: true,
        data: dummyStats,
        message: 'Dummy stats fetched successfully'
      });
    } catch (err) {
      console.error('Dashboard Stats Error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = dashboardController;
