// main.js

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var winston = require('winston');
var Mitm = require("mitm");

console.log("works console");

// log errors
process.on('uncaughtException', function(err){
  winston.log("info", err);
});

// HTTP interceptor
var mitm = Mitm();
mitm.on("request", function(req, res) {
  winston.log("info", req);
  console.log("works");
});

app.use(express.static(__dirname));
app.use('/public',  express.static(__dirname + '/public'));

// GET "/"
app.get("/", function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// GET "/scrape"
app.get('/scrape', function(req, res){
  var url = "http://flavorwire.com";
  request(url, function(err, respose, html){
    if (!err){      
      html = html.replace(/\t/g, '');
      html = html.replace(/\n/g, '');
      
      var $ = cheerio.load(html);
      var json = {};

      $('#features').filter(function(){
        var data = $(this);
        json.title = data.find("h2 > a").text();
        json.content = data.find(".entry-content").text();        
      });
      
      $('title').filter(function(){
        var data = $(this);
        json.siteName = data.text();
      });
    }  
    
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      
      res.send(json);
    })
  });
});

// POST "/forchan"
app.post("/forchan", function(req, res){
  var url = "http://boards.4chan.org/b/";
  var currentPost;
  request(url, function(err, respose, html){
    if (!err){           
      var $ = cheerio.load(html);
      $('#delform > div:nth-child(1) > div:nth-child(1) > .postContainer:last-child').filter(function(){
        var data = $(this);
        currentPost = data.find(".postNum:last-child > a:last-child").text();       
      });        
      var len = currentPost.length;
      len = (len/2);

      res.send(currentPost.slice(len));

      
    }  
  });
});
  
var server = app.listen('80');
// io.listen(server);

exports = module.exports = app;