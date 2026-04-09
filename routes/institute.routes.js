const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post("/", async (req, res) => {
    try {
        const { tenant_id, name, code, type, location, logo } = req.body;

        const result = await pool.query(
            `INSERT INTO institutes 
            (tenant_id, name, code, type, location, logo)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [tenant_id, name, code, type, location, logo]
        );

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error("INSTITUTE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Error creating institute"
        });
    }
});

module.exports = router;