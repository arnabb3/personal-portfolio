var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.170.109.31',
                user: 'root',
                password: '',
                database: 'DummyGameFeat'
});

function generatePlayerId() {
  var min = 10000000;
  var max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

connection.connect;

var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  var sql = `SELECT g.gameName, SUM(p.playersTotal) AS totalPlayers
  FROM GamesSpecificInfo g
  NATURAL JOIN PlayerData p
  NATURAL JOIN GameCategories c
  WHERE p.metaCritic > 75 AND p.playersTotal >= 4400
  GROUP BY g.gameName
  ORDER BY totalPlayers DESC
  LIMIT 15`;
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    } 
    res.render('home', { games: result });
  });
});

app.get('/register', function(req, res) {
  res.render('register', { title: 'Register Page' });
});

app.get('/search', function(req, res) {
  res.render('search', { title: 'Search Page' });
});

app.get('/friend-finder', function(req, res) {
  res.render('friend-finder', { friends: [] });
});
 
// this code is executed when a user clicks the form submit button
app.post('/mark1', function(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;

  let exists = 0;
  var playerId = '';
  do {
    playerId = generatePlayerId();
    var check = `SELECT COUNT(*) FROM UserData WHERE playerId = '${playerId}'`;
    connection.query(check, function(err, result) {exists = result});
  } while (exists > 0);
   
  var sql = `INSERT INTO UserData (playerId, password, userName) VALUES ('${playerId}','${password}','${userName}')`;
  
    connection.query(sql, function(err, result) {
      if (err) {
        res.send(err);
        return;
      }
    });
  res.send("success");
});

app.get('/mark2', function(req, res) {
  var userName = req.query.userName;
  var password = req.query.password;

  var sql = `DELETE FROM UserData WHERE userName = '${userName}' AND password = '${password}'`;
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.send('User deleted');
  });
});
  
app.get('/mark3', function(req, res) {
  var userName = req.query.userName;
  var password = req.query.old_password;
  var new_password = req.query.new_password;
  
  var check = `SELECT * FROM UserData WHERE userName = '${userName}'`;
  connection.query(check, function(err, result) {
    if (result[0].password != password || result[0].userName != userName) {
      res.send('user nonexistent or password does not match');
      return;
    }
    var sql = `UPDATE UserData SET password = '${new_password}' WHERE userName = '${userName}'`;
    connection.query(sql, function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.send('Password updated!');
    });
  });
});

app.get('/mark4', function(req, res) {
  var userName = req.query.userName;
   
  var sql = `SELECT password FROM UserData WHERE userName = '${userName}'`;
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    var password = result[0].password;
    res.send(password);
  });
});

app.get('/search-games', function(req, res) {
  var sql = `SELECT * FROM GameCategories NATURAL JOIN GamesSpecificInfo NATURAL JOIN PlayerData NATURAL JOIN UserLimitations WHERE `;
  
  if (req.query.minAge != '') sql = sql + `requiredAge >= ${req.query.minAge} AND `;
  for (category in req.query.Categories) { 
    sql = sql + `${req.query.Categories[category]} = 1 AND `;
  }
  if (req.query.minRecs != '') sql = sql + `recommendations >= ${req.query.minRecs} AND `;
  if (req.query.minMeta != '') sql = sql + `metaCritic >= ${req.query.minMeta} AND `;
  if (req.query.maxPrice != '') sql = sql + `priceFinal <= ${req.query.maxPrice} AND `;
  for (limitation in req.query.Limitations) {
    sql = sql + `${req.query.Limitations[limitation]} = 1 AND `;
  }

  if (sql.slice(-6) === "WHERE ") sql = sql.slice(0, -6);
  if (sql.slice(-4) === "AND ") sql = sql.slice(0, -4);

  sql = sql + `ORDER BY ${req.query.orderBy} `;
  if (req.query.descOrAsc != undefined) sql = sql + `DESC `;
  sql = sql + "LIMIT 5000";

  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render('search-results', {games: result});
  });
});

app.get('/login', function(req, res) {
  var userName = req.query.username;
  var password = req.query.password;
  var sql = `SELECT * FROM UserData WHERE userName = '${userName}' AND password = '${password}'`;
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    if (result.length == 0) {
      res.send("invalid login");
      return;
    }
    var getGames = `SELECT gameName, hoursPlayed FROM GamesOwned WHERE playerId = ${result[0].playerId}`;
    connection.query(getGames, function(err, result1) {
      if (err) {
        res.send(err);
        return;
      }
      res.render('logged-in', {account: result, games: result1});
    });
  });
});

app.post('/insert-game', function(req, res) {
  var playerId = req.body.playerId;
  var gameName = req.body.gameName;
  var hours = req.body.hoursPlayed;
  var played = 1;
  if (hours == '' || hours == '0') {
    played = 0;
    hours = 1;
  }
  var getSize = `SELECT COUNT(*) FROM GamesOwned`;
  connection.query(getSize, function(err, result1) {
    if (err) {
      res.send(err);
      return;
    }
    var check = `SELECT COUNT(*) FROM GamesOwned WHERE gameName = '${gameName}'`;
    connection.query(check, function(err, result2){
      if (err) {
        res.send(err);
        return;
      }
      var sql = `INSERT INTO GamesOwned (index_, gameName, played, hoursPlayed, playerId) VALUES (${result1[0]['COUNT(*)']},'${gameName}',${played},${hours}, ${playerId})`;
      if (result2[0]['COUNT(*)'] == 0) sql = `CALL addNewGame(${result1[0]['COUNT(*)']},'${gameName}',${played},${hours}, ${playerId})`;
      connection.query(sql, function(err, result) {
        if (err) {
          res.send(err);
          return;
        }
        res.send("success");
      });
    });
  });
});

app.get('/advanced-query2', function(req, res) {
  var gameName = req.query.gameName;
  var sql = `SELECT ud.userName, SUM(go.hoursPlayed) AS totalHoursPlayed
  FROM UserData AS ud
  INNER JOIN GamesOwned AS go ON ud.playerId = go.playerId
  WHERE go.playerId IN (
    SELECT uda.playerId
    FROM UserData AS uda
    INNER JOIN GamesOwned AS goa ON uda.playerId = goa.playerId
    WHERE goa.gameName LIKE '${gameName}'
  ) 
  GROUP BY ud.userName
  ORDER BY totalHoursPlayed DESC`;
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.render('friend-finder', { friends: result});
  });
});

app.listen(80, function () {
  console.log('Node app is running on port 80');
});