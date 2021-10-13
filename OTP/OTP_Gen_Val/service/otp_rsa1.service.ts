import NodeRSA from 'node-rsa'
import * as fs from 'fs'

let generateKeyPairs = ()=>{

    //Generating public private key pairs
    const key:any = new NodeRSA({b: 2048});

    //exporting public key
    const publicKey = key.exportKey('pkcs8-public-pem');
    fs.writeFileSync("./key1.pem",publicKey,'utf-8')   //stroring public key

    //exporting Private Key
    const privateKey = key.exportKey('pkcs1-pem');
    fs.writeFileSync("./key.pem",privateKey,'utf-8')   //storing private key(pem string format)  in .pem file
}

let encryptData = (data:any):any=>{
    let key = new NodeRSA()
    let publicKey = fs.readFileSync("./key1.pem").toString()  //reading public key 
    key.importKey(publicKey,"pkcs8-public")   //importing publickey
    let encryptedData:any = key.encrypt(data, 'base64') //encrypting data

    return encryptedData  
}


let decryptData = (cipherData:any):any=>{
    let key = new NodeRSA()
    let privateKey = fs.readFileSync("./key.pem").toString()  //reading private key in string format
    key.importKey(privateKey, "pkcs1");    //Importing private key using above retrieved string format key
    let decryptedData =  key.decrypt(cipherData, 'utf8') //decrypting data
    
    return decryptedData
}


export let encryption = (data:any):any=>{

    if(fs.existsSync('./key1.pem')){  //checks whether file exists or not if exists do following
        let encryptedData:any = encryptData(data)
        return encryptedData
    }else{   //if not exists then 
        generateKeyPairs();
        encryption(data)
    }
}


export let decryption = (cipherData:any):any=>{
    if(fs.existsSync('./key.pem')){     //checks whether file exists or not if exists do following
        let decryptedData = decryptData(cipherData)
        return decryptedData
    }else{       //if not exists then 
        return 
    }
}



export let setExpiryTime = (currentDate:any, minutes:any):any=>{
    let expiryTime = new Date(currentDate.getTime() + minutes*60000)
    return expiryTime
}

export let validateExpiryTime = (expiryTime:Date):boolean=>{
    let currentTime = new Date()
    if(currentTime>expiryTime){
        return false
    }else return true;
}


