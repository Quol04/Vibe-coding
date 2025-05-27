const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

const isDoctor = (req, res, next) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. Doctors only.' });
    }
    next();
};

const isPatient = (req, res, next) => {
    if (req.user.role !== 'patient') {
        return res.status(403).json({ message: 'Access denied. Patients only.' });
    }
    next();
};

module.exports = {
    auth,
    isDoctor,
    isPatient
}; 