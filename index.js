const express = require('express');
const _       = require('lodash');
const faker   = require('faker');
const app     = express();


faker.locale = "fr";

const freelances = [];

for(let i = 0; i < 20; i++) {
  freelances.push({
    username : faker.internet.userName(),
    firstname : faker.name.firstName(),
    lastname : faker.name.lastName(),
    position : faker.name.jobTitle(),
    email : faker.internet.email(),
    dob : faker.date.past(),
    passion : faker.lorem.words().split(' '),

  });
  console.log(i);
}



app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(freelances));
});

app.get('/:username', function(req, res) {
  const username = req.params['username'];

  const timeoutRand = Math.floor(Math.random() * 5000);
  setTimeout(() => oneFreelance(res, username), timeoutRand);
});

app.listen(3000);

function oneFreelance (res, username) {
  const one = _.find(freelances, function(obj) {
    return obj.username === username;
  });

  const alea = Math.floor(Math.random() * 1000);
  console.log(alea);

  if(alea > 500) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(one));
  } else {
    res.status(500);
    res.send();
  }
}