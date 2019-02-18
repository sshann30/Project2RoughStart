var axios = require ("axios")
var db = require("../models");

module.exports = function(app) {
  app.get("/api/authors", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Author.findAll({
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/authors", function(req, res) {
    var uri = 'https://api.fortnitetracker.com/v1/profile/';
    axios
      .get(uri + 'psn' + '/' + req.body.name, {
        headers: {
          'TRN-Api-Key': '80f005a2-53d2-48e2-99a1-cac872ef77bf'
        }
      })
      .then (function(response){
        db.Author.create({
          name: req.body.name, 
          wins: response.data.lifeTimeStats[8].value,
          winPercentage: response.data.lifeTimeStats[9].value.replace(/%/g, ''),
          kills: response.data.lifeTimeStats[10].value,
          kD: response.data.lifeTimeStats[11].value
        }).then(function(dbAuthor) {
          res.json(dbAuthor);
        }).catch(function(error){
          console.log(error)
        });
        
      })

  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
