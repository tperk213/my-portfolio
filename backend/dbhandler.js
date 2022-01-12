var mongoose = require("mongoose");
var ObjectId = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
    // "mongodb+srv://tom:sandwich213@cluster0.5xdo4.mongodb.net/portfolio?retryWrites=true&w=majority",
    "mongodb://127.0.0.1:27017/portfolio",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//setup the project schema

const projectSchema = new Schema({
    name:{type:String, required:true, unique:true, dropDups:true},
    description:{type:String},
    cover_photo:{type:String},
    code_link:{type:String},
    display_link:{type:String},
    date_created:{type:Date, default:new Date(Date.now())},
    date_last_modified:{type:Date, default:new Date(Date.now())},
    showcase: {type:Boolean, default:false},
});


// create project object
let Project = mongoose.model("Project", projectSchema);

//create funciton
const createProject = async (projectData, done) =>{
    //try to find duplicates of project and if there isnt one create project
    try{
        const found_project = await Project.findOne({name:projectData.name}).exec();
        if(!found_project){
            const newProject = await Project.create(projectData);
            done(null, newProject, "created new project");
        }else{
            done(null, foundProject, "project already exists");
        }
    }catch(err){
        return console.log('Error occured' + err);
    }

}

const getProject = async (projectName, done) => {
    try{
        const found_project = await Project.findOne({name:projectName}).exec();
        if(!found_project){
            done(null, null, "couldnt find project");
        }
        done(null, found_project, "found project");

    }catch(err){
        return console.log("Error getting project from database in getProject" + err);
    }
}

//get showcase projects
const getShowcase = async (done) => {
    try{
        // returns all projects with the showcase field = true
        const showcase = await Project.find({showcase:true}).exec();
        done(null, showcase, "found showcase");
    }catch(err){
        return console.log("Error getting showcase projects from database");
    }
}

const getShowcaseLength = async (done) => {
    try{
        const length = await Project.find({showcase:true}).count().exec();
        done(length);
    }catch(err){
        return console.log("Error getting the showcase length");
    }
}

const getShowcaseRange = async (startIndex, endIndex, done) => {
    try{
        const showcase = await Project.find({showcase:true}).sort('_id');
        done(showcase.slice(parseInt(startIndex), parseInt(endIndex) + 1));
    }catch(err){
        return console.log(`Error getting showcase between ranges ${startIndex} and ${endIndex}`)
    }
}



module.exports = {
    createProject: createProject,
    getProject,
    getShowcase,
    getShowcaseLength,
    getShowcaseRange,
}