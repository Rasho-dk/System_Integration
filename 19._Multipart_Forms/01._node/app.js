import express from 'express';

const app = express();
// extended: true means that we can send nested objects and parse it
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies når vi sende FORM data

// vi bruger multer
import multer from 'multer';
// const upload = multer({dest: 'uploads/'});

// multer s3 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cd(undefined, './uploads');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        // denne løsning vi overskriver filnavnet
        // cb(undefined, file.originalname);
        
        //undgår timing issues
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueFilename = `${uniquePrefix}_${file.originalname}`;

        cb(undefined, uniqueFilename);
    }

});

function fileFilter(req, filem, cb){
    const validateTypes = ['image/png', 'image/jpeg', 'image/svg'];
    if (!validateTypes.includes(filem.mimetype)) {
        cb(new Error('Invalid file type' + file.mimetype), false);
    } else{
        cb(null, true);
    }

}

// here we filter the file types before getting diskStorage
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 20 // 20 MB
    },
    fileFilter

});

app.post("/form", (req, res) => {
    console.log(req.body);
    delete req.body.password;
    res.send(req.body); // JOSN data type 
});

//using multer
// using file from form from index.html
// single er for at sikre at vi kun sender en fil elles kan vi bruge array
app.post("/fileform", upload.single('file'), (req, res) => {

});
const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});