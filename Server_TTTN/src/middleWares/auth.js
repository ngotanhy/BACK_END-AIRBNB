const jwt = require('jsonwebtoken')

//ma hoa du lieu token
const encodeToken = (data) => {
    return jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s', algorithm: 'HS256' });
}

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
        if (req.payload === decoded.payload) {
            next()
        } else {
            return res.status(403).json({ success: false, message: 'Invalid token' })
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}

const verifyTokenAdmin = async (req, res, next) => {
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
        if (req.payload === decoded.payload && decoded.data.role) {
            next()
        } else {
            return res.status(403).json({ success: false, message: 'Invalid token' })
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { verifyToken, encodeToken, verifyTokenAdmin }
