const express = require('express');

const homeRouter = express.Router();

const multer = require('multer');

const upload = multer({ dest: 'public/upload' });

const homeController = require('../controllers/homeController');

homeRouter.get('/', homeController.index);

homeRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 								// с какого хоста разрешены запросы
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");		
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH, PUT');						// разрешенные методы запросов. OPTIONS - предварительный запрос
  next();
});

/* API */
homeRouter.post('/sendData', upload.none(), async (req, res, next) => {
  try {
	const data = ({ token: req.body.token });
	const token = data.token;
	if (token != null) {
		const dataToController = await homeController.sendDataToController(token);
		const verify = dataToController;
		console.log(verify.message.payload);
		if(verify.message.data) {
			return res.json({ response: { auth: true, message: verify.message.payload } });
		} else {
			return res.json({ response: { auth: false, message: verify.message.payload } });
		}
	} else {
	  return res.json({ response: { auth: false, message: 'Token is NULL' } });
	}
  } catch (error) {
      return res.json({ response: { auth: false, message: 'Something went wrong in Router' } });
  }
});


module.exports = homeRouter;
