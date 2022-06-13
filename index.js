// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

app.get('/api/:date', (req, res) => {
  // 如果是纯数字，把字符串转成整形。纯数字的字符串 new Date() 无法转换时间。
  if (!isNaN(req.params.date)) req.params.date = parseInt(req.params.date)
  // 格式化时间。nodejs的默认格式化时间的格式和浏览器js的不同，要和浏览器上的格式化时间一样后面调用toUTCString()方法
  let formatedDate = new Date(req.params.date).toUTCString()
  if (formatedDate === 'Invalid Date') {
    res.json({
      error: formatedDate
    })
  } else {
    // 格式化时间转时间戳
    let timeStamp = new Date(formatedDate).getTime()

    res.json({
      unix: parseInt(timeStamp),
      utc: formatedDate
    })
  }
})
app.get('/api', (req, res) => {
  // 如果没有时间参数就是访问了/api，直接返回一个当前时间
  res.json({
    unix: parseInt(new Date().getTime()),
    utc: new Date().toUTCString()
  })
})
