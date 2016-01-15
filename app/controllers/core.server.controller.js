'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

var mysql      = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'ec2-54-84-46-213.compute-1.amazonaws.com',
  user     : 'mysqluser',
  password : '123456y',
  database : 'utgadm'
});
connection.connect();

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

/**
 * Test MySQL functionality
 */
exports.mysqltest = function (req, res){
  var rows;

 	connection.query('SELECT * from testadm.players LIMIT 10', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Select from players table');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });

 };

 exports.mysqltestpost = function (req, res){
   var rows;
 	console.log ('POST Request recieved')
 	console.log(req.body);
	console.log(req.body.name);
	var sQuery = "SELECT * from testadm.players where name = '" + req.body.name + "'";
	console.log(sQuery);

  	connection.query(sQuery, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Select from players table');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });

  };

exports.utilization = function (req, res){
  var rows;

 	connection.query('SELECT PRACTICE,TITLE,STAFF_MEMBER,BILLABLE_UTILIZATION,PRD_DEV_UTILIZATION,TOTAL_UTILIZATION FROM V_WEEKLY_UTILIZATION WHERE STAFF_MEMBER is not null LIMIT 10', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Select from Utilization table');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });

 };
