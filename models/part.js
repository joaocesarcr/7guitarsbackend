const part = require("../models/partSchema")

module.exports = class Part {
    static async registerPart(req, res) {
        console.log(req.body.name)
        const newPart = new part({
            name: req.body.name,
            quantity: req.body.quantity,
            section: req.body.section,
            price: req.body.price,
            description: req.body.description
        })
        await newPart.save()
        res.send(newPart)
    }
    static async getPartofType(req, res) {
        await part.find({ section: req.query.section }).then((parts) => {
            const body={
                Nome:req.query,
                Variacoes:[]
            }
            parts.forEach(part => {
                const variantions={
                    id:part._id,
                    text:part.name,
                    price:part.price,
                    quantity:part.quantity,
                    description:part.description
                }
                body.Variacoes.push(variantions)
            });
            res.json(body)
        }
        )
    }
    //espera name e section para deletar objeto
    static async deletePart(req, res) {
        await part.deleteOne({ section: req.body.section ,name:req.body.name}).then((part) => {
            res.status(204)
        }
        )
    }
    //espera name, section e quantity para atualizar o objeto
    static async updateQuantity(req,res){
        console.log(req.body)
        await part.updateOne({section:req.body.section,name:req.body.name},{$set: {quantity: req.body.quantity}})
        res.status(200)
    }
    static async getPricebyidList(id){
        await part.find(id).then((parts)=>{
            price=0;
            parts.forEach(part => {
                price+=part.price
            });
            return part.price;
        })
    }
    static async findPartsbyidList(req,res){
        await part.find(req.body.list).then((parts)=>{
            const body={
                Parts:[]
            }
            parts.forEach(part => {
                const currentpart={
                    id:currentpart._id,
                    text:currentpart.name,
                    price:currentpart.price,
                    quantity:currentpart.quantity,
                    description:currentpart.description
                }
                body.Parts.push(currentpart)
            });
            res.json(body)
        })
    }

}