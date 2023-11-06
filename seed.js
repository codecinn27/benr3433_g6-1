const mongoose = require('mongoose');
const Visitor = require('./model/visitor');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const url = 'mongodb+srv://codecinnpro:gIZ6Fhy6WplkFJfE@cluster0.egrjwh1.mongodb.net/vms_1';

async function encryptPassword(password){
    const hash = await bcrypt.hash(password, saltRounds);
    return hash
}

async function decryptPassword(password, compare){
    const match = await bcrypt.compare(password, compare);
    return match
}

async function hashedPasswords(visitors){
    for(const visitor of visitors){
        const hashedPassword = await bcrypt.hash(visitor.password,saltRounds);
        visitor.password = hashedPassword;
    }
}



mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log("Connection OPEN!!!");
    })
    .catch(err=>{
        console.log("Oh No Error!!!");
        console.log(err);
    });

// const p = new Visitor({
//         username: 'admin',
//         email: 'kobe@gmail.com',
//         phoneNumber: 30123456789,
//         password: '12345678',
//         category: 'admin'
//     });
// p.save()
//     .then(p=>{
//         console.log(p)
//     })
//     .catch(e=>{
//         console.log(e);
//     })


// insert many visitors into the database
// const visitors_list = [
//     {
//         username:'v1',
//         email:'243ds@gmail.com',
//         phoneNumber: 601294332435,
//         password:'12345',
//         category: 'visitor'
//     },
//     {
//         username:'v2',
//         email:'sdf3ds@gmail.com',
//         phoneNumber: 601294643435,
//         password:'12345',
//         category: 'visitor'
//     },
//     {
//         username:'v3',
//         email:'sdsgds@gmail.com',
//         phoneNumber: 6012943422435,
//         password:'password',
//         category: 'visitor'
//     },
//     {
//         username:'v4',
//         email:'vzds@gmail.com',
//         phoneNumber: 6014394332435,
//         password:'password',
//         category: 'visitor'
//     },
//     {
//         username:'v5',
//         email:'bdds@gmail.com',
//         phoneNumber: 601359932435,
//         password:'password',
//         category: 'visitor'
//     }
// ]

hashedPasswords(visitors_list)
    .then(async()=>{
        try{
            const result = await Visitor.insertMany(visitors_list);
            console.log(result);
        }catch(e){
            console.error(e);
        }
    })
    .catch(e=>{
        console.error(e);
    });








