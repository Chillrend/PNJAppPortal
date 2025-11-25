const express = require('express');
const router = express.Router();
const App = require('../models/App');
const { Op } = require('sequelize');

// Middleware to check if user is authenticated (optional for public directory, required for admin)
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
};

// Get all apps (with search and filter)
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        const where = {};

        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        if (category && category !== 'All') {
            where.category = category;
        }

        const apps = await App.findAll({ where });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new app (Admin only - for now just authenticated)
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const app = await App.create(req.body);
        res.status(201).json(app);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update app
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const app = await App.findByPk(req.params.id);
        if (!app) return res.status(404).json({ error: 'App not found' });

        await app.update(req.body);
        res.json(app);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete app
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const app = await App.findByPk(req.params.id);
        if (!app) return res.status(404).json({ error: 'App not found' });

        await app.destroy();
        res.json({ message: 'App deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
