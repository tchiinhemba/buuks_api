
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const dataset = [];

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

async function listFiles(authClient) {
    const drive = google.drive({ version: 'v3', auth: authClient })
    const res = await drive.files.list({
        pageSize: 100,
        fields: 'nextPageToken, files(id, name, webContentLink)',
    });

    const files = res.data.files;

    if (files.length === 0) {
        console.log('No files found');

    }

    console.log('Files:');

    files.map((file) => {
        dataset.push({
            file_id: file.id,
            file_name: file.name,
            file_link: file.webContentLink
        });
    })

    console.log(dataset)
}



authorize().then(listFiles).catch(console.error);