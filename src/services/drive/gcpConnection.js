import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (error) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;

  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();

  if (client) {
    return client;
  }

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function listFolders(authClient) {
  const dataset = [];

  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize: 100,
    fields: 'nextPageToken, files(id, name, kind)',
    q: "mimeType = 'application/vnd.google-apps.folder'",
    orderBy: 'name'
  });

  const { files } = res.data;

  if (files.length === 0) {
    console.log('No files found');
  }

  files.forEach(file => {
    dataset.push({
      category_id: file.id,
      category_name: file.name,
    })
  })

  return dataset;
}


async function listFiles(authClient) {
  const dataset = [];

  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    fields: 'nextPageToken, files(id, name, webContentLink)',
    q: "mimeType != 'application/vnd.google-apps.folder'",
    orderBy: 'name'
  });

  const { files } = res.data;

  if (files.length === 0) {
    console.log('No files found');
  }

  files.forEach(file => {
    dataset.push({
      file_id: file.id,
      file_name: file.name,
      file_download_link: file.webContentLink,
    })
  })

  return dataset;
}

export {
  authorize,
  listFolders,
  listFiles
};
