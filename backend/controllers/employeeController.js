import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";
import {generateToken} from '../middlewares/jwt.js'

const createSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    position: z.string().min(2),
})

const loginSchema = z.string().email();
const paramsId = z.string();

export async function adminLogin(req, res){
    console.log(req.body);
  try{
        const data = loginSchema.safeParse(req.body.email);

        console.log(req.body);

        if(!data.success){
            return res.json({success:false, status:400, message:"Email must be string and valid"})
        }

        const isExit = await prisma.User.findUnique({
             where: { email: req.body.email  },
        })

        if(!isExit){
            return res.json({success:false, status:404, message:'Employee Not Exit'})
        }

        if(isExit.role !== "admin"){
            return res.json({success:false, status:403, message:"U are Not allowed to access this"})
        }

        // generate token
        const token = generateToken({email:req.body.email});


        return res.cookie('admintoken', token, {
            httpOnly: true,
            // maxAge: 3600*1000,
            sameSite: 'lax',
            secure: false
        }).json({success:true, status:200, data: isExit});

    }
    catch(error){
        console.log(error);
    }
   
}

export async function employeeLogin(req, res){

     try{
        const data = loginSchema.safeParse(req.body.email);

        if(!data.success){
            return res.json({success:false, status:400, message:"Email must be string and valid"})
        }

        const isExit = await prisma.User.findUnique({
             where: { email: req.body.email  },
        })

        if(!isExit){
            return res.json({success:false, status:404, message:'Employee Not Exit'})
        }

        if(isExit.role !== "employee"){
            return res.json({success:false, status:403, message:"U are Not allowed to access this"})
        }

        // generate token
        const token = generateToken({email:req.body.email});

        return res.cookie('employeetoken', token, {
            httpOnly: true,
            // maxAge: 3600*1000,
            sameSite: 'lax',
            secure: false
        }).json({success:true, status:200, data: isExit});

    }
    catch(error){
        console.log(error);
    }

}

// access to only admin

export async function createEmployee(req, res, next){

    try{

        const data = createSchema.safeParse(req.body);

        if(!data.success){
            return res.json({status:400, error: JSON.parse(data.error)});
        }

        // check if email is already register

        const isExit = await prisma.User.findUnique({
            where:{
                email:req.body.email
            }
        })

        if(isExit){
            return res.json({success:false, status:400, message:'Email is already present'})
        }

        const newEmployee = await prisma.User.create({
               data:{
                name:data.data.name,
                email:data.data.email,
                position:data.data.position,
                role:data.data.role || 'employee'
               }
        })

        return res.json({success:false, status:200, data:newEmployee});

     }
    catch(error){
        console.log(error.message);
    }

}

export async function getAllEmployee(req, res, next){

    const allEmployee = await prisma.User.findMany({
        where:{
            NOT:{
                role:"admin"
            }
        }
    });

    return res.json({data:allEmployee});
}

export async function updateEmployee(req, res, next){

    try{
        const empId = paramsId.safeParse(req.params.id);
        
        if(!empId.success){
            return res.json({success:false, status:400, message:"Id must be string"});
        }

        // first check if the Employee present with the id provided

        const isExit = await prisma.User.findUnique({
            where:{
                id: parseInt(empId.data)
            }
        })

        if(!isExit){
            return res.json({success:false, status:400, message:'Employee Not Exit' })
        }
        
        const data = createSchema.safeParse(req.body);

        const newData = await prisma.User.update({
            where:{
                id:parseInt(empId.data)
            },
            data:{
                name:data.data.name,
                email:data.data.email,
                position:data.data.position,
            }
        })

        return res.json({success:true, status:200, data:newData});
    }
    catch(error){
        console.log(error);
    }

}

export async function deleteEmployee(req, res, next){

    try{

        const empId = paramsId.safeParse(req.params.id);
        
        if(!empId.success){
            return res.json({success:false, status:400, message:"Id must be string"});
        }

        // first check if the Employee present with the id provided

        const isExit = await prisma.User.findUnique({
            where:{
                id: parseInt(empId.data)
            }
        })

        if(!isExit){
            return res.json({success:false, status:400, message:'Employee Not Exit' })
        }

        const deletedEmp = await prisma.User.delete({
            where:{
                id: parseInt(empId.data)
            }
        })

        return res.json({success:true, status:200, data:deletedEmp});


    }
    catch(error){
        console.log(error);
    }
}

export async function employeeProfile(req, res, next){

    try{
        const empId = paramsId.safeParse(req.params.id);
        
        if(!empId.success){
            return res.json({success:false, status:400, message:"Id must be string"});
        }

        // first check if the Employee present with the id provided

        const isExit = await prisma.User.findUnique({
            where:{
                id: parseInt(empId.data)
            }
        })

        if(!isExit){
            return res.json({success:false, status:400, message:'Employee Not Exit' })
        }

        return res.json({success:true, status:200, data:isExit})
        
    }
    catch(error){
        console.log(error);
    }


}