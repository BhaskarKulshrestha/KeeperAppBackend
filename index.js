import express from "express";
import cors from "cors";
import mongoose from "mongoose";




const app = express();
app.use(express.urlencoded());
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://admin-bhaskar:Pulkit04@cluster0.tj74paz.mongodb.net/mykeeperAppDB', { useNewUrlParser: true })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

const keeperSchema = mongoose.Schema({
  title: String,
  content: String
})

//mongoose model
const keeper = new mongoose.model("keeper", keeperSchema);

app.get("/api/getAll", (req, res) => {
  keeper.find({})
    .then(keeperList => {
      if (keeperList) {
        res.status(200).send(keeperList);
      } else {
        // Handle error
      }
    })
    .catch(err => {
      console.log(err);
    });
})

app.post("/api/addNew", (req, res) => {
  const { title, content } = req.body

  const keeperObj = new keeper({
    title: title,
    content: content
  })
  keeperObj.save().then(
    () => console.log("data send to DB succesfully")
  )
    .catch((err) => console.log(err));

  keeper.find({})
    .then(keeperList => {
      if (keeperList) {
        res.status(200).send(keeperList);
      } else {
        // Handle error
      }
    })
    .catch(err => {
      console.log(err);
    });
})

app.post("/delete", function (req, res) {

  const noteTitle = req.body.title;
  const noteContent = req.body.content;

  keeper.findOneAndDelete({ title: noteTitle, content: noteContent }).then(() =>
    console.log("note deleted succefully")
  ).catch(err => {
    console.log(err);
  })


  // keeper.findOneAndDelete({title: noteTitle, content: noteContent}, (err) => {
  //     if(err){
  //         console.log(err);
  //     } else{
  //         console.log("Note Deleted Successfully");
  //         // console.log(req.body);
  //     }
  // });
});


app.listen(3001, function () {
  console.log("Server started on port 3001");
});