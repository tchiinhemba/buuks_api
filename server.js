import app from './app.js';
import { authorize } from './src/services/connection/gcpConnection.js';
import { listFolders } from './src/services/functions/listFolders.js';
import { listFiles } from './src/services/functions/listFiles.js';


const PORT = 3000;
let files = null;
let folders = null;

async function start() {
  try {
    files = await authorize().then(listFiles);
    folders = await authorize().then(listFolders);
  } catch (error) {
    console.log(error)
  }
}

start().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${3000}`);
  })
});


export {
  files,
  folders
}


