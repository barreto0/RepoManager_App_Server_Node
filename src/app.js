const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// function updateInterceptor(req,res,next){
//   if(req.body.likes){
//     return res.status(400);
//   }

//   return next();
// }

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repo);
  return res.json(repo);
});

app.put("/repositories/:id" ,(req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;
 

  const repoIndex = repositories.findIndex(repos => repos.id === id);
  if(repoIndex < 0){
    //não achou repo correspondente
    return res.status(400).json({message: "repo not found"});
  }
  console.log(repositories[repoIndex].likes);

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }
  repositories[repoIndex] = repo;
  return res.json(repo);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex(repos => repos.id === id);
  if(repoIndex < 0){
    //não achou repo correspondente
    return res.status(400).json({message: "repo not found"});
  }

  repositories.splice(repoIndex,1);
  return res.status(204).json({message: "deleted successfuly"});
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repos => repos.id === id);
  if(repoIndex < 0){
    return res.status(400).json({message: "repo not found"});
  }

  let likes = repositories[repoIndex].likes + 1;
  const repo = {
    id, 
    title: repositories[repoIndex].title,
    url: repositories[repoIndex].url,
    techs: repositories[repoIndex].techs,
    likes
  }

  repositories[repoIndex] = repo;
  return res.json(repo);

});

module.exports = app;
