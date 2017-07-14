const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Student = models.Student;
module.exports = router;

router.get('/', function (req, res, next) {
  Student.findAll({ where: req.query })
  .then(students => res.json(students))
  .catch(next);
});

router.post('/', function (req, res, next) {
  Student.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(next);
});

router.get('/:studentId', function(req, res, next){
  Student.findById(req.params.studentId)
    .then(student => res.json(student))
    .catch(next);
});

router.put('/:studentId', function (req, res, next) {
 Student.findById(req.params.studentId)
        .then(function(found) {
            if (!found) {
                let err = new Error('Not found');
                err.status = 404;
                throw err;
            }
            return found.update(req.body);
        })
        .then(function(updateStudent) {
            res.json({
                Student: updateStudent
            });
        })
        .catch(next);
});

router.delete('/:studentId', function(req, res, next){
  Student.findById(req.params.studentId)
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
