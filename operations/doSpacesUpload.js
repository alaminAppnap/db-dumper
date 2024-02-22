const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const uploadToDigitalOceanSpaces = async (dumpFilePath, databaseName) => {
    const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.DIGITALOCEAN_ACCESS_KEY_ID,
        secretAccessKey: process.env.DIGITALOCEAN_SECRET_ACCESS_KEY
    });

    const uploadParams = {
        Bucket: process.env.DIGITALOCEAN_BUCKET,
        Key: path.join(process.env.DIGITALOCEAN_FOLDER, getDBName(databaseName)),
        Body: fs.createReadStream(dumpFilePath)
    };

    try {
        await s3.upload(uploadParams).promise();
        console.log('Database dump uploaded to DigitalOcean Spaces successfully');
    } catch (err) {
        console.error('Error uploading database dump to DigitalOcean Spaces:', err);
        throw err;
    }
};


function getDBName(databaseName){
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}_${formattedMonth}_${year}_${databaseName}`;

}
module.exports = { uploadToDigitalOceanSpaces };
