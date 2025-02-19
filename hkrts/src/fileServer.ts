import express, { Request, Response } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { readFile, readdirSync } from 'fs'

const app = express();
const PORT = 3400;
app.use(bodyParser.json());

var filesArr: string[] = readdirSync(path.join(__dirname, "files"));


app.get('/files', (req: Request, res: Response): void => {

  if (filesArr.length === 0) {
    res.status(411).send("No files found");
  }
  else {
    res.status(200).json({ files: filesArr });
  }
})

app.get('/', (req: Request, res: Response): void => {
  res.send("filesServer Homepage");
})

app.get('/files/:fileName', (req: Request, res: Response) => {
  const { fileName } = req.params;
  console.log(fileName)
  console.log("file name is : ")
  let filePresent = isFilePresent(fileName);

  if (filePresent) {
    readFile(path.join(__dirname, "/files", `/${fileName}`), 'utf-8', (err, data) => {
      if (err) {
        res.status(505).send("Error while reading File");
        return;
      }

      res.status(200).json({ fileContent: data });
    })
  }

  else {
    res.status(404).send("file not found");
  }
})


app.listen(PORT, () => {
  console.log(`server is live on PORT ${PORT}`);
})

function isFilePresent(fileName: string): boolean {
  let fp = false;

  for (const i of filesArr) {
    if (fileName === i) {
      fp = true;
    }
  }

  return fp;
}
