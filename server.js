const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('./src/db.json');
server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/authorize', (req, res) => {
  if (req.body.userName === 'YIQIAN' && req.body.password === 'WLU5PEbDkYrvMqyIrcU1DRm7itk') {
    res.jsonp({
      code: 1,
      msg: '验证成功'
    });
  } else {
    res.jsonp({
      code: 0,
      msg: '验证失败'
    });
  }
});

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = Date.now();
  }
  next();
});

router.render = (req, res) => {
  res.jsonp({
    msg: '请求成功',
    code: 1,
    data: res.locals.data
  });
};

server.use('/api', (req, res, next) => {
  if (req.get('Authorization')) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use('/api', router);

server.listen(45550, () => {
  console.log('JSON Server is running');
});
