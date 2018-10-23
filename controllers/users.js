var logger = require('../services/logger.js');
var userDao = require('../persistence/UserInMemoryDao.js');

module.exports = function(app){

  app.get('/test', function(req, res){
    console.log('Test request done.')
    res.send('OK.');
  });

  app.get('/users/:id', function(req, res){
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    logger.info('Retrieving user: ' + id);

    // RDBMS 
    /*let connection = app.persistence.connectionFactory();
    let userDao = new app.persistence.UserDao(connection);

    userDao.findById(id, function(err, result){
          if(err){
            console.log('Database error: ' + err);
            res.status(500).send(err);
            return;
          }
          console.log('User found: ' + JSON.stringify(result));
          res.json(result);
          return;
        });*/
    
    // IN MEMORY
    const user = userDao.findById(id);
    console.log('User found: ' + JSON.stringify(user));

    console.log('Current array: ' + JSON.stringify(userDao.findAll()));
    
    res.json(user);
    
  });

  app.get('/users/', function(req, res){
    
    // IN MEMORY
    const users = userDao.findAll();
    console.log('Users found: ' + JSON.stringify(users));
    console.log('Current array: ' + JSON.stringify(userDao.findAll()));
    
    res.json(users);
    
  });

  app.delete('/users/:id', function(req, res){
    let user = {};
    let id = req.params.id;

    user.id = id;
    
    userDao.delete(id);
    res.json(user);
    res.status(204).send(user);

  });

  app.put('/users/:id', function(req, res){
    let user = {};
    let id = req.params.id;

    user.id = id;
    user.status = 'UPDATED';

    // RDBMS
    /*let connection = app.persistence.connectionFactory();
    let userDao = new app.persistence.UserDao(connection);

    userDao.update(user, function(err){
        if (err){
          res.status(500).send(erro);
          return;
        }
        console.log('User updated');
        res.send(user);
    });*/

    const updatedUser = userDao.update(user);
    res.json(updatedUser);

  });

  app.post('/users/', function(req, res){

    // validation
    //req.assert("user.id", "User id required").notEmpty();
    req.assert("user.name", "User name required").notEmpty();
    var errors = req.validationErrors();
    if (errors){
      console.log('Validation errors found!');
      res.status(400).send(errors);
      return;
    }

    // getting object from request
    var user = req.body["user"];
    console.log('Creating new user...' + JSON.stringify(user));

    user.status = 'CREATED';
    user.date = new Date;
    user.id = 100;
  
    //RDBMS
    /*var connection = app.persistence.connectionFactory();
    var userDao = new app.persistence.UserDao(connection);

    userDao.save(user, function(err, result){
      if(err){
        console.log('Database Error:' + erro);
        res.status(500).send(err);
      } else {
      user.id = result.insertId;
      console.log('User created');
      }
    });*/

    const insertedUser = userDao.insert(user);

    res.location('/users/' + insertedUser.id);

    let response = {
      user_data: insertedUser,
      links: [
        {
          href:"http://localhost:3000/users/" + insertedUser.id,
          rel:"update",
          method:"PUT"
        },
        {
          href:"http://localhost:3000/users/" + insertedUser.id,
          rel:"delete",
          method:"DELETE"
        }
      ]
    };

    res.status(201).json(response);
    
  });

}
