const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { uploadToDigitalOceanSpaces } = require('./doSpacesUpload');



const dbDumpOperation = async (mysqlHost, mysqlPort, mysqlUser, mysqlPassword, databaseName, storeFolder = 'amarpet') => {

        const backupFolderPath = path.join(__dirname, '..', 'backups', storeFolder);
        const dumpFileName = `${databaseName}.sql`;
        const dumpFilePath = path.join(backupFolderPath, dumpFileName);

        const dumpCommand = `mysqldump -u ${mysqlUser} -p${mysqlPassword} -h ${mysqlHost} -P ${mysqlPort} ${databaseName} > ${dumpFilePath}`;

        exec(dumpCommand, async(error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return 'Error dumping database';
            }
           
            console.log(`Database dumped successfully`);

             try {
                await uploadToDigitalOceanSpaces(dumpFilePath, dumpFileName);
            } catch (err) {
                console.error('Error uploading database dump to DigitalOcean Spaces:', err);
            }
       
        });
};

module.exports = { dbDumpOperation };
