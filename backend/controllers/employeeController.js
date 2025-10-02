import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";


const createSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    position: z.string().min(2),
})

const loginSchema = z.string().email();
const paramsId = z.string();

export async function adminLogin(req, res, next){

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

        if(isExit.role !== "admin"){
            return res.json({success:false, status:403, message:"U are Not allowed to access this"})
        }

        return res.json({success:true, status:200, data:isExit, message:'Login Successfully'});

    }
    catch(error){
       next(error);
    }
   
}

export async function employeeLogin(req, res, next){

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

        return res.json({success:true, status:200, data: isExit, message:'Login Successfully'});

    }
    catch(error){
         next(error);
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

        await prisma.User.create({
               data:{
                name:data.data.name,
                email:data.data.email,
                position:data.data.position,
                role:data.data.role || 'employee'
               }
        })

        return res.json({success:true, status:200, message:'Employee Added Successfully'});

     }
    catch(error){
         next(error);
    }

}

export async function getAllEmployee(req, res, next){

    try{

        const allEmployee = await prisma.User.findMany({
        where:{
            NOT:{
                role:"admin"
            }
        }
        });

        return res.json({success:true, status:200, data:allEmployee});

    }
    catch(error){
        next(error);
    }

 
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
                id:parseInt(req.params.id)
            },
            data:{
                name:data.data.name,
                email:data.data.email,
                position:data.data.position,
            }
        })

        return res.json({success:true, status:200, message:'Updated Successfully'});
    }
    catch(error){
        next(error);
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

        await prisma.User.delete({
            where:{
                id: parseInt(empId.data)
            }
        })

        return res.json({success:true, status:200, message:'Deleted Successfully'});


    }
    catch(error){
         next(error);
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
                id: parseInt(req.params.id)
            }
        })

        if(!isExit){
            return res.json({success:false, status:400, message:'Employee Not Exit' })
        }
        return res.json({success:true, status:200, data:isExit})
        
    }
    catch(error){
         next(error);
    }


}