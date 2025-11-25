const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login route
router.get('/login', passport.authenticate('oidc'));

// Callback route
router.get('/callback',
    passport.authenticate('oidc', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:5173/'); // Redirect to frontend
    }
);

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Get current user
router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

module.exports = router;
