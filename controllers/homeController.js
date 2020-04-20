const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');
const tempSign = require('../config/tempSign');


module.exports.index = async function (req, res) {
  res.render('index', { title: 'API'});
};


const sendDataToController = async (token) => {
  try {
	  let mess = '';
      const jwtS = await jwt.verify(token, tempSign.secret, (err, decoded) => { 

		if(err){
		  mess = {data: false, payload: err.message};
		  //console.log(mess);
		}else{
		  mess = {data: true, payload: decoded};
		  //console.log(mess);
		}
		 
	   } );
	   return { message: mess };
      //return {data: false, message: 'Something went wrong in Controller' };
	  // const decoded = jwt.decode(token);
	  //console.log('token:', token);
	  /*if (!decoded) {
		  console.log(decoded);
	  } else {
		  console.log('token1:', token);
	  }*/
      /*console.log('token:', token);
      console.log('decoded:', decoded);
      console.log('exp:', new Date(decoded.exp * 1000));
      console.log('iat:', new Date(decoded.iat * 1000)); */
      //await getCookies(req, res, token);
      //return { auth: true, accessToken: token };
    //}
    //return { auth: false, message: 'There was a problem with credential data.' };
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendDataToController = sendDataToController;
