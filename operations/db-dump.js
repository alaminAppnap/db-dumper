const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const dbDumpOperation = async (mysqlHost, mysqlPort, mysqlUser, mysqlPassword, databaseName, storeFolder = 'amarpet') => {

    const backupFolderPath = path.join(__dirname, '..', 'backups', storeFolder);

        const dumpFilePath = path.join(backupFolderPath, `${databaseName}.sql`);

        const dumpCommand = `mysqldump -u ${mysqlUser} -p${mysqlPassword} -h ${mysqlHost} -P ${mysqlPort} ${databaseName} > ${dumpFilePath}`;

        exec(dumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return 'Error dumping database';
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return 'Error dumping database';
            }
            console.log(`Database dumped successfully`);
        });
};

module.exports = { dbDumpOperation };
