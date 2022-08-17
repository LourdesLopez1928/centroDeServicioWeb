
import verifyToken from './verifytoken'

export default function withJWT(handler){
    
    return function wrapper(...args) {
        const req = args[0]
        const res = args[1]
        let token = req?.headers?.authorization
        let payload = verifyToken(token)
         if (!payload) {
            return res.status(401).json({ status: 'error', message: 'Error jwt must be provided'})
        }
        args[0].session = payload.user

        return handler(...args)
    }

  
}