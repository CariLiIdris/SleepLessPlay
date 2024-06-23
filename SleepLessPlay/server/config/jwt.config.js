import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    const token = req.cookies.userToken;
    if (!token) {
        return res.status(401).json({ verified: false, msg: 'No token provided' })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            console.log('Token verification failed:', err);
            res.status(401).json({ verified: false, msg: 'Token is not valid' })
        } else {
            req.user = payload;
            next()
        }
    })
}