const googleAuth = require("google-auth-library");
const client = new googleAuth.OAuth2Client( process.env.GOOGLE_ID );
 
const googleVerify = async ( token ) => {
 
 
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
 
  console.log( payload );
  const { name, email, picture } = payload;
 
  return { name, email, picture }
}

module.exports = {
    googleVerify
}