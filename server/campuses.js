const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Campus = models.Campus;

module.exports = router;

router.get('/', function (req, res, next) {
  Campus.findAll({ where: req.query })
    .then(campuses => res.json(campuses))
    .catch(next);
});

router.post('/', function (req, res, next) {
  Campus.create(req.body)
    .then(campus => res.status(201).json(campus))
    .catch(next);
});

router.get('/:campusId', function (req, res, next) {
    Campus.findById(req.params.campusId)
    .then(campus => res.json(campus))
    .catch(next);
});

router.put('/:campusId', function (req, res, next) {
 Campus.findById(req.params.campusId)
        .then(function(found) {
            if (!found) {
                let err = new Error('Not found');
                err.status = 404;
                throw err;
            }
            return found.update(req.body);
        })
        .then(function(updateCampus) {
            res.json({
                Campus: updateCampus
            });
        })
        .catch(next);
});

router.delete('/:campusId', function(req, res, next){
  Campus.findById(req.params.campusId)
        .then(function(found) {
            if (!found) {
                let err = new Error('Not found');
                err.status = 404;
                throw err;
            }
            return found.destroy();
        })
        .catch(next);
});
