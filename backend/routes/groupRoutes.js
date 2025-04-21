const express= require('express');
const Group = require('../models/GroupModel');
const {protect , isAdmin} = require('../middleware/authMiddleware');

const groupRouter = express.Router();

groupRouter.post("/", protect, isAdmin, async (req,res) =>{
    try{
        const{ name, description } = req.body;
        const group = await Group.create({
            name,
            description,
            admin: req.user._id,
            members:[req.user._id],
        });
        const populatedGroup = await Group.findById(group._id).populate("admin", "username email").populate("members", "username email");
      
        return res.status(201).json({populatedGroup});  
          
    }catch(error){
        console.log(error);
        return res.status(400).json({ message: 'error.message' });
    }
});

//getting all the groups
groupRouter.get('/', protect, async (req,res) =>{
    try{
        const groups = await Group.find().populate('admin', 'username email').populate('members', 'username email');
        res.json(groups);
    }catch(error){
        console.log(error);
        return res.status(400).json({ message: 'error.message' });
    }
})

//Joining of groups
groupRouter.post('/:groupId/join',protect,async(req,res)=>{
    try{
    const group = await Group.findById(req.params.groupId);
    console.log(group);
    if(!group){
        return res.status(404).json({message: 'Group not found'});
    }
    if(group.members.includes(req.user._id)){
        return res.status(400).json({message: 'Already a member of the group'});
    }
    group.members.push(req.user._id);
    await group.save();
    res.json({message: 'Joined the group successfully'});
}catch(error){
        
        return res.status(400).json({ message: 'error.message' });
    }

    

    
})

// Leave a group
groupRouter.post('/:groupId/leave', protect, async (req, res) => {
    try {
      const group = await Group.findById(req.params.groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Check if user is already a member
      if (!group.members.includes(req.user._id)) {
        return res.status(400).json({ message: 'You are not a member of this group' });
      }
  
      // Prevent admin from leaving their own group (optional check)
      if (group.admin.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'Admin cannot leave their own group' });
      }
  
      // Remove user from members
      group.members = group.members.filter(
        (memberId) => memberId.toString() !== req.user._id.toString()
      );
  
      await group.save();
  
      const updatedGroup = await Group.findById(group._id)
        .populate('admin', 'username email')
        .populate('members', 'username email');
  
      return res.status(200).json(updatedGroup);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  

groupRouter.get('/:groupId/members', protect, async (req, res) => {
    try {
      const group = await Group.findById(req.params.groupId)
        .populate("members", "username email");
      
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      res.json({ members: group.members });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  



module.exports = groupRouter;