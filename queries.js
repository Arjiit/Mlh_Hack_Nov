var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/locations';
var db = pgp(connectionString);

// add query functions


function getAlllocation(req, res, next) {
    db.any('select * from loc')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL locations'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }


  function getSinglelocation(req, res, next) {
    var locID = parseInt(req.params.id);
    db.one('select * from loc where id = $1', locID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE location'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }


  function createlocation(req, res, next) {
    db.none('insert into loc(name, latitude, longitude)' +
        'values(${name}, ${latitude}, ${longitude})')
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one location'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function updatelocation(req, res, next) {
    db.none('update loc set name=$1, latitude=$2, longitude=$3 where id=$5',
      [req.body.name, req.body.latitude, req.body.longitude])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated location'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function removelocation(req, res, next) {
    var locID = parseInt(req.params.id);
    db.result('delete from loc where id = $1', locID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} location`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }
module.exports = {
  getAlllocation: getAlllocation,
  getSinglelocation: getSinglelocation,
  createlocation: createlocation,
  updatelocation: updatelocation,
  removelocation: removelocation
};