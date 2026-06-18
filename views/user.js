import express from 'express';

// create the express router
const router = express.Router();

router.use((req, res, next) => {
    console.log('User Middleware')
    next()
})

router.get('/all', (req, res) => {
    res.send('All User Data.')
})

router.get('/:id', (req, res) => {
    res.send('User Data for User with id: ' + req.params.id)
})

// export the router
export default router;