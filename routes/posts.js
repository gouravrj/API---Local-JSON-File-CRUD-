const { Router } = require('express');
const express = require('express')
const router  = express.Router()       //Middleware Access to both req and res
const fs = require('fs');


router.get('/',(req,res)=>{
    let postData;
    if(fs.existsSync('./posts.json')){
        const postsBuffer = fs.readFileSync('./posts.json')

        if(postsBuffer.length != 0 ){
            postData = JSON.parse(postsBuffer)
            res.status(200).json({
                message:"Data Fetched Successfully",
                posts:postData
            })
        }
        else
        {
            res.status(200).json({
                message:"NO Posts found"
            })
        }
    }
    else
    {
        res.status(200).json({
            message:"NO posts FOund !!"
        })
    }
})

router.post("/save",(req,res)=>{
    console.log(req.body)
    let postData;
    if(fs.existsSync('./posts.json')){
        const postsBuffer = fs.readFileSync('./posts.json')
        //if(postsBuffer.length != 0 ){
            postData = JSON.parse(postsBuffer)

            const post = {
                ID : req.body.id,
                postTitle : req.body.ptitle,
                postDesc : req.body.pdesc,
                postAuthor : req.body.pauthor
            }
    
            postData.push(post)
    
            fs.writeFileSync('./posts.json',JSON.stringify(postData))
    
            res.status(201).json({
                message:"Post Created Successfully"
            })
      //  }
    }
    else
    {
        const post = {
            ID : req.body.id,
            postTitle : req.body.ptitle,
            postDesc : req.body.pdesc,
            postAuthor : req.body.pauthor
        }

        postData.push(post)

        fs.writeFileSync('./posts.json',JSON.stringify(postData))
        
        res.status(201).json({
            message:"Post Created Successfully"
        })
    }
})

router.put("/update/:id",(req,res)=>{     //params :- Parameters  app.put("/update/:id/:name/:title",(req,res)=>{ 
    const id = req.params.id;
    const postObj = {
        ID : req.body.id,
        postTitle : req.body.ptitle,
        postDesc : req.body.pdesc,
        postAuthor : req.body.pauthor
    }

    if(fs.existsSync('./posts.json')){
        const postsBuffer = fs.readFileSync('./posts.json')
        if(postsBuffer.length!=0){
            const postsData = JSON.parse(postsBuffer)
            const filteredPostArray = postsData.filter((post)=>post.ID!=id)
            if(postsData.length === filteredPostArray.length){
                res.status(400).json({
                    message:"ID not Found"
                })
            }else{
                filteredPostArray.push(postObj)
                fs.writeFileSync('./posts.json',JSON.stringify(filteredPostArray))
                res.status(200).json({
                    message:"Post updated Successfully"
                })
            }
        }else{
            res.status(400).json({
                message:"Posts Not Found !!!"
            })
        }
    }else{
        res.status(404).json({                  /////////400  means Bad request 404 means Not found
            message:"File Not found !"
        })
        }
    
})

router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id

    const postsBuffer = fs.readFileSync('./posts.json')

    if(postsBuffer.length!=0){
        const postsData = JSON.parse(postsBuffer)
        const filteredArray = postsData.filter((post)=>post.ID!=id)
        if(filteredArray.length === postsData.length){
            res.status(400).json({
                message:"ID not Found"
            })
        }else{
            fs.writeFileSync('./posts.json',JSON.stringify(filteredArray))
            res.status(200).json({
                message:"Deleted Successfully"
            })
        }

    }else{
        res.status(400).json({
            message:"No Posts Found"
        })  
    }
})

module.exports = router;