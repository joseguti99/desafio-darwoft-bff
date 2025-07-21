import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES = process.env.JWT_EXPIRES!

export function generateToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: Number(JWT_EXPIRES) })
}

export function verify(token: string) {
    return jwt.verify(token, JWT_SECRET)
}