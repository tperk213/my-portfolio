const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
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
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        req.body.img_to_upload = file.originalname;
        cb(null, req.body.title + '_' + file.originalname);
    }
});
const upload = multer({ storage:storage });




//const dbhandler = require("./myApp");

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/api/photo/:photo_name', (req,res)=>{
    res.sendFile(__dirname + '/uploads/' + req.params.photo_name);
});

app.post('/api/add-project', upload.single('img_to_upload'), (req, res, next)=>{
    //validation
    next();
},
(req,res)=>{
    // name:{type:String, required:true, unique:true, dropDups:true},
    // description:{type:String},
    // cover_photo:{type:String},
    // code_link:{type:String},
    // display_link:{type:String},
    // date_created:{type:Date, default:Date().now()},
    // date_last_modified:{type:Date, default:Date().now()}
    
//     name="title" placeholder="
// name="description" placeholder="
// name="code-link" placeholder
// name="page-link" placeholder
// name="date-created" placholder
// name="date-last-modified"
// name="img">
//         <input type
    
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
app.get("/api/project/:project_name", (req, res)=>{
    //call get project function with :project_name as param
    console.log(req.params.project_name);
    dbhandler.getProject(req.params.project_name, (err, project, status)=>{
        if(project === null){
            console.log(status);
            res.json({project_status: 'missing'});
        }
        res.json(project);
    });
   
});


const listener = app.listen(process.env.PORT || 3001, ()=>{
    console.log('Your app is listening on port ' + listener.address().port);
});

