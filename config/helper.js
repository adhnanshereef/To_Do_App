var db = require("../config/connection");
var collections = require("../config/collections");
// const bcrypt = require("bcrypt");
var objId = require("mongodb").ObjectId;
const async = require("hbs/lib/async");


module.exports = {
    addProgram:(programs)=>{
        return new Promise(async(resolve,reject)=>{
            let program=await db.get().collection(collections.PROGRAM_COLLECTION).findOne()
            if(program){
                let text={text:programs.text}
               db.get().collection(collections.PROGRAM_COLLECTION).updateOne({_id:objId(program._id)},{$push:{program:text}}).then(()=>{
                   resolve({success:true})
               })
            }else{
                let programDetails={
                    program:[
                        {text:programs.text}
                    ],
                    date:programs.dd+'/'+programs.mm+'/'+programs.yyyy
                }
                db.get().collection(collections.PROGRAM_COLLECTION).insertOne(programDetails).then(()=>{
                    resolve({success:true})
                })
            }
        })
    },
    getProgram:()=>{
        return new Promise(async(resolve,reject)=>{
            let program=await db.get().collection(collections.PROGRAM_COLLECTION).findOne()
            resolve(program)
        })
    }
};