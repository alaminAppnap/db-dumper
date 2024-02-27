const AWS = require('aws-sdk');
const path = require('path');

const removeFilesFromFolder = async (folderName) => {
    const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.DIGITALOCEAN_ACCESS_KEY_ID,
        secretAccessKey: process.env.DIGITALOCEAN_SECRET_ACCESS_KEY
    });

    const listParams = {
        Bucket: process.env.DIGITALOCEAN_BUCKET,
        Prefix: folderName
    };

    try {
        const data = await s3.listObjectsV2(listParams).promise();
        const files = data.Contents;

        if (files.length > process.env.BUCKET_MAX_FILE_STORE) {
            files.sort((a, b) => b.LastModified - a.LastModified);

            // Delete all files except the latest 5
            const filesToDelete = files.slice(process.env.BUCKET_MAX_FILE_STORE);
            const deletePromises = filesToDelete.map(file => {
                const deleteParams = {
                    Bucket: process.env.DIGITALOCEAN_BUCKET,
                    Key: file.Key
                };
                return s3.deleteObject(deleteParams).promise();
            });
            await Promise.all(deletePromises);

            console.log('Old files removed from DigitalOcean Spaces successfully');
        } else {
            console.log('Number of files is less than the threshold. No files deleted.');
        }
    } catch (err) {
        console.error('Error removing old files from DigitalOcean Spaces:', err);
        throw err;
    }
};

module.exports = { removeFilesFromFolder };
