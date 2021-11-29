const express = require('express');
const router = express.Router();
const movieRouter = require('./movie');
const tvRouter = require('./tv');
const { getRating } = require('../services/service.js');
//API movie
router.use('/movie', movieRouter);

//API tv
router.use('/tv', tvRouter);

router.get('/rating', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.id) {
            const error = new Error('Missing id')
            error.code = '403';
            throw error;
        }
        const api = await getRating(req.query.id);
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        const data = api.body;
        if (!api.body.id) {
            const error = new Error('Not found');
            error.code = '404';
            throw error;
        }
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }     
    }
});

router.use('**', (req, res) => {
    res.status(404).json({error: 'Not found'});
});

module.exports = router;