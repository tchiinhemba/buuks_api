import { google } from 'googleapis';

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

export { listFolders }
