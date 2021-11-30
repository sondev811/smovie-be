const express = require('express')
const router = express.Router()
const { getURL } = require('../../services/service.js');
const urlConstant = require("../../constants/constant.js");

router.get('/detail', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.id) {
            const error = new Error('Missing id');
            error.code = '403';
            throw error;
        }
        const api = await getURL(urlConstant.TV.DETAILS(req.query.id));
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        const data = api.body;
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
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

router.get('/list', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.page || !req.query.type) {
            const error = new Error('Missing page or type');
            error.code = '403';
            throw error;
        }
        const type = urlConstant.TV[req.query.type.toUpperCase()];
        const url = type ? type : urlConstant.TV.POPULAR;
        const api = await getURL(url, { page: req.query.page});
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }        
    }
});

router.get('/videos', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.id) {
            const error = new Error('Missing id');
            error.code = '403';
            throw error;
        }
        const api = await getURL(urlConstant.TV.VIDEOS(req.query.id));
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }        
    }
});

router.get('/discover', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.genresID || !req.query.page) {
            const error = new Error('Missing genres id or page');
            error.code = '403';
            throw error;
        }
        const params = {
            with_genres: req.query.genresID, 
            page: req.query.page
        };
        const api = await getURL(urlConstant.TV.DISCOVER, params);
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }        
    }
});

router.get('/genres', async (req, res) => {
    try {
        const api = await getURL(`${urlConstant.TV.GENRES}`);
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }        
    }
});

router.get('/search', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.key || !req.query.page) {
            const error = new Error('Missing key search or page');
            error.code = '403';
            throw error;
        }
        const params = {
            query: req.query.key,
            page: req.query.page
        };
        const api = await getURL(urlConstant.TV.SEARCH, params);
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }        
    }
});

router.get('/credits', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.id) {
            const error = new Error('Missing id');
            error.code = '403';
            throw error;
        }
        const api = await getURL(urlConstant.TV.CREDITS(req.query.id));
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
        res.status(200).json(data);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({error: err.message});           
        } else {
            res.status(500).json({error: err.message});         
        }         
    }
});

router.get('/similar', async (req, res) => {
    try {
        if (!req || !req.query || !req.query.id) {
            const error = new Error('Missing id');
            error.code = '403';
            throw error;
        }
        const api = await getURL(urlConstant.TV.SIMILAR(req.query.id));
        if (!api || !api.body) {
            const error = new Error('Server error');
            error.code = '500';
            throw error;
        }
        if (api.body.success === false) {
            const error = new Error(api.body.status_message);
            error.code = '404';
            throw error;
        }
        const data = api.body;
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