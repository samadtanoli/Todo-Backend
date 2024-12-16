const express = require("express");
const ProductModel = require("../models/productschema");
const Route= express.Router();
const bcrypt = require("bcryptjs");

Route.get("/", async (req,res)=>{
    try {
        const result= await ProductModel.find({});
        res.status(200).json({
          isSuccessful:true,
          data:result,
        })
      } catch (error) {
        console.log(error); 
        res.status(400).json({
          isSuccessful:false,
          error:error.message,
          
        })

      }
})

Route.get("/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const result= await ProductModel.findById(id);
        res.status(200).json({
          isSuccessful:true,
          data:result,
        })
      } catch (error) {
        console.log(error); 
        res.status(400).json({
          isSuccessful:false,
          error:error.message,
          
        })
      }
})

Route.post("/",(req,res)=>{
    try {
        const body=req.body;
        const obj={
          title:body.title,
          author:body.author,
          description:body.description,
          noofpages:Number(body.noofpages),
        }
        const modelObj =new BookModel(obj);
        modelObj.save()
        .then((result)=>{
        res.status(201).json({
          isSuccessful:true,
          message:"book added successfully"
        });
        }).catch((err)=>{
          throw err;
        });
      } catch (error) {
        console.log(error); 
        res.status(400).json({
          isSuccessful:false,
          error:error.message,
          
        });
      }
})

Route.put("/", async (req,res)=>{
    try {
        const body=req.body;
        const obj={
          title:body.title,
          author:body.author,
          description:body.description,
          noofpages:Number(body.noofpages),
        }
        const modelObj =new BookModel(obj);
        modelObj.save()
        .then((result)=>{
        res.status(201).json({
          isSuccessful:true,
          message:"book added successfully"
        });
        }).catch((err)=>{
          throw err;
        });
      } catch (error) {
        console.log(error); 
        res.status(400).json({
          isSuccessful:false,
          error:error.message,
          
        });
    }
})
module.export=Route;