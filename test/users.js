//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Users = require('../models/users');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', function(){
    // beforeEach(function (done){ //Before each test we empty the database
    //     Users.remove({}, function(err){ 
    //        done();         
    //     });     
    // });
  /*
  * Test the /GET route
  */
  describe('/GET users', function(){
    it('it should GET all the users', function(done){
      chai.request(server)
        .get('/api/users')
        .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIwIjp7Il9pZCI6IjU4ODdiYzcwNjBlZmM1NmNlMTI4Mjg5MiIsInBhc3N3b3JkIjoiJDJhJDA0JFhFa2xGdzFJRk0yc0lpdjZyYlViSGUxVlVGcnZQclpwc0ZmTFNxYTRVSFZrWG5Ec2dRaFB5IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwibGFzdG5hbWUiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsIl9fdiI6MiwicHJvZmlsZVBpY3R1cmUiOiJhc3NldHMvaW1nL3BlcmZpbF9vZmYuc3ZnIiwidXNlZFRpY2tldHMiOltdLCJ0aWNrZXRzIjpbIjU4YWRmNjM3NmI4MGUyMDRhYzNlZTIwNiJdLCJwcml2YXRlUm9vbUludml0ZXMiOltdLCJmb2xsb3dpbmciOltdLCJmb2xsb3dlcnMiOltdLCJwb2ludHMiOjUwLCJjcmVkaXRzIjoyMC41LCJhY3RpdmUiOnRydWUsImFkbWluIjp0cnVlfSwiaWF0IjoxNDg5NzgzMTIzLCJleHAiOjE0OTIzNzUxMjN9.UoxA1jePHy34u5b_RmMnr-Hir3LivUUO7GIKoegaeZg')
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.an('object');
          done();
        });
    });
  });
});