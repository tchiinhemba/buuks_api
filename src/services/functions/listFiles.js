import { google } from 'googleapis';

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

export { listFiles }
