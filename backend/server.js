const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const sharp = require('sharp');
require('dotenv').config()

const dbhandler = require('./dbhandler');

let mongoose;
try{
    mongoose = require("mongoose");
} catch(e){cd
    console.log("error getting mongoose" + e);
}

app.use(cors())


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//multer setup

const diskStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        req.body.img_to_upload = file.originalname;
        cb(null, req.body.title + '_' + file.originalname);
    }
});

const multerFilter = (req, file, next) => {
    if(file.mimetype.startsWith("image")){
        next(null, true);
    }else{
        next("Only images excepted to upload", false);
    }
}

const multerStorage = multer.memoryStorage();
const upload = multer({ 
    storage:multerStorage, 
    fileFilter: multerFilter,
});




//const dbhandler = require("./myApp");

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/api/photo/:photo_name', (req,res)=>{
    res.sendFile(__dirname + '/uploads/' + req.params.photo_name);
});

app.post('/api/add-project', (req, res, next)=>{
    //validation
    next();
},
upload.single('img_to_upload'),
async (req,res,next) =>{
    
    if(!req.file) return next();

    const newFile = await sharp(req.file.buffer).resize(600,750).toFormat('jpeg').jpeg({quality: 90}).toFile(`uploads/${req.body.title + '_' + req.file.originalname}`);
    //##########################################################Here resizing images
    //https://www.bezkoder.com/node-js-upload-resize-multiple-images/
    next();
},
(req,res)=>{

    
//linking the form and database creat object here
    let project_data = {
        name: req.body.title,
        description: req.body.description,
        cover_photo: req.body.title + '_' + req.body.img_to_upload,
        code_link: req.body.code_link,
        display_link: req.body.page_link,
        date_created:req.body.date_created,
        date_last_modified:req.body.date_last_modified,
        showcase: req.body.showcase === 'on'? true: false,         
    }
//call the database create function with object
    dbhandler.createProject(project_data,(err, project, status)=>{
        console.log(status);
        if(err){
            return(err);
        }
        console.log(project); 
        res.json(project);
    });
});

app.post("/api/update/:proj_name", 
    (req,res,next)=>{
    //validation
        next();
    },
    upload.single('img_to_upload'),
    async (req,res,next) =>{
    
        if(!req.file) return next();
        const photo_name = req.params.proj_name + '_' + req.file.originalname;
        const newFile = await sharp(req.file.buffer).resize(600,750).toFormat('jpeg').jpeg({quality: 90}).toFile(`uploads/${photo_name}`);
        req.body['cover_photo'] = photo_name;
        //##########################################################Here resizing images
        //https://www.bezkoder.com/node-js-upload-resize-multiple-images/
        next();
    },
    async (req,res)=>{
        //linking the form and database creat object here
        projectUpdateFields = {...req.body}
        projectUpdateFields.date_last_modified = Date.now();

        const updated = await dbhandler.updateProject(req.params.proj_name, projectUpdateFields);
        res.json(updated);
    }
);

app.get("/api/showcase", (req, res)=>{
    dbhandler.getShowcase((err, showcase, status)=>{
        if(showcase === null){
            console.log(status);
            res.json({showcase_status: 'couldnt get showcase'});
        }
        res.json(showcase);
    })
});

app.get("/api/showcase/:startIndex/:endIndex", (req, res)=>{
    dbhandler.getShowcaseRange(req.params.startIndex, req.params.endIndex, (showcase)=>{
        if(showcase === null){
            console.log(status);
            res.json({showcase_status: 'couldnt get showcase'});
        }
        res.json(showcase);
    })
});

app.get("/api/showcase/length", (req, res)=>{
    dbhandler.getShowcaseLength((length)=>{
        res.json({'length':length});
    });
});

//get project
app.get("/api/project/:project_name", async (req, res)=>{
    //call get project function with :project_name as param
    console.log(req.params.project_name);
    const project = await dbhandler.getProject(req.params.project_name);
    if(project === {}){
        res.json({project_status: 'missing'});
        return;
    }
    res.json(project);
   
});

app.get("/api/projects/:startIndex/:ammountToFetch", (req, res)=>{
    dbhandler.getProjects(parseInt(req.params.startIndex), parseInt(req.params.ammountToFetch), (projects) => {
        if(projects === null){
            console.log('Error retrieving projects from database');
        }
        res.json(projects);
    });

});


const listener = app.listen(process.env.PORT || 3001, ()=>{
    console.log('Your app is listening on port ' + listener.address().port);
});

