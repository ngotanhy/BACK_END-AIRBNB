const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(400).json({
            status: 'error',
            elements: 'Missisng Token',
            code: 400
        })
    }
    let authorization = authHeader.split(' ');
    if (authorization[0] !== 'Bearer') {
        return res.status(400).json({
            status: 'error',
            elements: 'Invalit Token split authorization',
            code: 400
        })
    }
    const token = authHeader && authHeader.split(' ')[1]
    if (!token)
        return res.status(401).json({ success: false, message: 'Access token not found' })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { verifyToken }
