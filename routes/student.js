const express = require("express");
const router = express.Router();
router.get('/', (req,res) => {
res.send("Hello from student get all resources API");
});

router.get('/:id', (req,res) => {
    res.send("Hello from student "+ req.params.id+" get all resources API");
});
  
router.post('/', (req,res) => {
        res.sendStatus(204);
});    

router.put('/:id', (req,res) => {
    res.send("Hello from student update "+ req.params.id+"  resources API");
});    

router.delete('/:id', (req,res) => {
    res.send("Hello from student delete "+ req.params.id+"  resources API");
});    

module.exports = router;