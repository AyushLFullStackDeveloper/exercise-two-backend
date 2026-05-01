const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post("/", async (req, res) => {
    try {
        const { name, code, logo } = req.body;

        const result = await pool.query(
            `INSERT INTO roles (name, code, logo)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, code, logo]
        );

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error("ROLE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Error creating role"
        });
    }
});

module.exports = router;