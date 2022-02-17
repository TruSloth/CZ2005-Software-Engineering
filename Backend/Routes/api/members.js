const express = require("express");
const router = express.Router();
const members = require("../../Members")
const uuid = require("uuid");
const e = require("express");


router.use(express.json());

//Gets All Members
router.get('/', (req,res)=>{
    res.json(members);
});

//Gets Single Member
router.get('/:id', (req, res)=>{
    const found =members.some(member=>member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member=>member.id === parseInt(req.params.id)));
        console.log("Log in Success")
    }else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`}) 
    }
});

router.post('/', (req, res)=>{

    console.log("Post");
    const output = members.find((output) => ((output.email === req.body.email) && (output.password === req.body.password)));
    if(output == null){
        console.log("User does not exist");
    }else{
        console.log("User does exist");
    }
    // members.push(newMember)
    // res.json(members)
    // console.log(members)
})

//Update Member
router.put('/:id', (req, res)=>{
    const found =members.some(member=>member.id === parseInt(req.params.id));

    if(found){
       const updMember = req.body;
       members.forEach(member=>{
           member.name = updMember.name ? updMember.name : member.name;
           member.email = updMember.email ? updMember.email : member.email; 

           res.json({msg: 'Member updated', member})
       })
    }else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`}) 
    }
});
module.exports = router