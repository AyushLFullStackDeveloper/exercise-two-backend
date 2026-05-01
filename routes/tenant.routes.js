const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // ✅ IMPORTANT

router.post("/", async (req, res) => {
    const { name, code, logo } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO tenants (name, code, logo)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, code, logo]
        );

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating tenant"
        });
    }
});

module.exports = router;