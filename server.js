// const express = require('express');
const connection = require('./config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');

// Database connection
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employees database.');
});

