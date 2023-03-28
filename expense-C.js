const Expanse = require('../models/expense.js')
exports.getExpanses=async(req,res,next)=>{
let expanses= await Expanse.findAll();
console.log('<gettingAllExpenses>',expanses);
res.send({expanses:expanses});
}
exports.addExpanse= async(req,res,next)=>{
    console.log('<>###<>',req.body);
    console.log("we are in ");
  await  Expanse.create({
        quantity:req.body.quantity,
        description: req.body.description,
        category:req.body.category,
        candy_name:req.body.candy_name
    }).then(result=>{res.status(200).json({result:result})}).catch(err=>{console.log(err);console.log("code wasnt executed");});
}
exports.getExpanse= async (req,res,next)=>{
    const id = req.params.expanseId;
 Expanse.findByPk(id).then(expanse=>{res.json({expanse:expanse})}).catch(err=>{console.log(err);})
}
exports.updateExpanse=(req,res,next)=>{
    const id= req.params.expanseId;
    if(id){
    Expanse.findByPk(id).then(expanse=>{
        let a=expanse.quantity;
        if (a>=req.body.category){
        expanse.quantity=a-req.body.category
        return expanse.save()
        }
        else{
            res.send("out of stock")
        }}).then(result=>{console.log("expanse updated");res.json({expanse:result})}).catch(err=>{console.log(err);})
    }else{
            res.send("expanse not found")
        }

}



exports.deleteExpanse= async (req,res,next)=>{
    const id = req.params.expanseId;
 Expanse.findByPk(id).then(expanse=>{ return expanse.destroy()}).then(result=>{console.log("object deleted"); console.log(result);res.json({expanses:result})}).catch(err=>{console.log(err);})
}
