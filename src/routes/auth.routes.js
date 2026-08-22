import express from "express";

const router=express.Router();

router.post('/signup',(req,res)=>{
    res.send('POST /api/auth/sign-up response');
})

router.post('/signin',(req,res)=>{
    res.send('POST /api/auth/sign-in response');
})

router.post('/signout',(req,res)=>{
    res.send('POST /api/auth/sign-out response');
})

export default router;
