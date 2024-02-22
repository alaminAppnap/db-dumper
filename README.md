# DB Backup

This project backup db.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- Docker installed on your machine

## Instructions to Run the Project

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:Appnap-Technologies-Ltd/db-backup.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd db-backup
   ```

3. **Create Environment File:**

   ```bash
   cp .env.example .env
   ```

4. **Fill in Environment Variables:**

   After creating the environment file `.env` from the provided `.env.example`, fill in the following information:

   ```plaintext
   ROBODOC_MYSQL_HOST: The hostname of your MySQL database.
   ROBODOC_MYSQL_PORT: The port of your MySQL database.
   ROBODOC_MYSQL_USER: The username for connecting to your MySQL database.
   ROBODOC_MYSQL_PASSWORD: The password for connecting to your MySQL database.
   ROBODOC_MYSQL_DB_NAME: The name of your MySQL database.


    DIGITALOCEAN_ACCESS_KEY_ID: Your DigitalOcean Spaces access key ID.
    DIGITALOCEAN_SECRET_ACCESS_KEY: Your DigitalOcean Spaces secret access key.
    DIGITALOCEAN_DEFAULT_REGION: The default region for your DigitalOcean Spaces.
    DIGITALOCEAN_BUCKET: The name of your DigitalOcean Spaces bucket.
    DIGITALOCEAN_FOLDER: (Optional) The folder in your DigitalOcean Spaces where backups will be stored.
    DIGITALOCEAN_CDN: (Optional) The CDN endpoint of your DigitalOcean Spaces, if enabled.
    DIGITALOCEAN_VISIBILITY: (Optional) The visibility setting for uploaded files (e.g., 'public' or 'private').
   ```

5. **Install Dependencies:**

   ```bash
   npm install
   ```

6. **Build Docker Image:**

   ```bash
   docker build -t <image-name> .
   ```

7. **Run Docker Container:**
   ```bash
   docker run -p 3001:3000 -d <image-name>
   ```

These instructions will clone the project, set up the environment file, fill in the necessary information, install dependencies, build the Docker image, and run a Docker container based on that image.
