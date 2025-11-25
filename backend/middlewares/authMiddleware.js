const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};
//adding a small comment here to test git changes.....
module.exports = authMiddleware;
