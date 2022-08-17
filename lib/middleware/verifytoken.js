import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

function verifyToken(jwtToken = '') {
    try {
      let regex = jwtToken.replace('Bearer ','');
      const validation = jwt.verify(regex.toString(), KEY);

      return validation;
    } catch (e) {
      console.log('Error ' + e.message);

      return null;
    }
  }


export default verifyToken