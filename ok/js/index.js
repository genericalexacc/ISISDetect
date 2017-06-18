var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var port = process.env.PORT || 3000
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
var cors = require('cors')
app.use(cors())
var child;

// respond with "hello world" when a GET request is made to the homepage
app.post('/', function (req, res) {
  console.log(req.body)
  save(req.body, function(words){
  if(!res.headersSent){
    res.send(words)
   }
  })
})

app.listen(port, function () {
  console.log('Started at: ', port)
})

save = function(string, callback){
    texto = ""
    varo = ""
    if(typeof string.tweets == "string"){
      varo = JSON.parse(string.tweets);
       varo.forEach(function(key, index){
        texto = texto + key + '\n'
        if(index == varo.length - 1){
            fs.writeFile("../tmp.txt", texto, function(err) {
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec('python ../cnn-text-classification-tf/eval.py --eval_train --checkpoint_dir="../cnn-text-classification-tf/runs/1497725393/checkpoints/"', puts);
    fs.watch('../prediction.csv', function (event, filename) {
    var text = fs.readFileSync('../prediction.csv','utf8')
    callback(text)
    });
    });    
        }
        })
    }else{
        string.tweets.forEach(function(key, index){
            texto = texto + key + '\n'
            if(index == string.tweets.length - 1){
                fs.writeFile("../tmp.txt", texto, function(err) {
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec('python ../cnn-text-classification-tf/eval.py --eval_train --checkpoint_dir="../cnn-text-classification-tf/runs/1497725393/checkpoints/"', puts);
    fs.watch('../prediction.csv', function (event, filename) {
    var text = fs.readFileSync('../prediction.csv','utf8')
    callback(text)
    });
    });
            }
        })
    }
}

