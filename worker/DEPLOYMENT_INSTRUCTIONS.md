# Cloudflare Worker Deployment Instructions

You are almost there! The backend code for your API is complete, but you need to deploy it to Cloudflare and connect it to your database (D1) and image storage (R2).

Follow these steps carefully.

### Prerequisites

1.  **Cloudflare Account**: You need a Cloudflare account. If you don't have one, sign up at [dash.cloudflare.com](https://dash.cloudflare.com).
2.  **Node.js**: Ensure you have Node.js and npm installed.
3.  **Wrangler CLI**: This is Cloudflare's command-line tool for managing workers. Install it globally by running:
    ```bash
    npm install -g wrangler
    ```
4.  **Login to Wrangler**: Authenticate wrangler with your Cloudflare account:
    ```bash
    wrangler login
    ```

### Step 1: Create Your D1 Database

Your worker needs a database to store text data (leaders, news, etc.).

1.  Navigate to your Cloudflare Dashboard.
2.  Go to **Workers & Pages** -> **D1**.
3.  Click **Create database**.
4.  Enter a name for your database (e.g., `iyc-portfolio-db`) and choose a location.
5.  Click **Create**.
6.  After creation, you will see the **Database ID**. Copy this ID.

### Step 2: Create Your R2 Bucket

Your worker needs a storage bucket for images.

1.  Navigate to your Cloudflare Dashboard.
2.  Go to **R2**.
3.  Click **Create bucket**.
4.  Enter a name for your bucket (e.g., `iyc-portfolio-images`).
5.  Click **Create bucket**.
6.  Once created, go to the bucket's **Settings** tab and find the **Public URL**. You can either allow public access (for easy image display) or keep it private. For now, you can copy the public URL if you enabled it.

### Step 3: Configure Your Worker (`wrangler.toml`)

Now, you need to tell your worker about the D1 database and R2 bucket you just created.

1.  Open the `worker/wrangler.toml` file.
2.  Uncomment the `[[d1_databases]]` section and fill in the placeholders:

    - `database_name`: The name you chose for your D1 database.
    - `database_id`: The ID you copied in Step 1.

    ```toml
    [[d1_databases]]
    binding = "DB" # Do not change this
    database_name = "iyc-portfolio-db" # Replace with your D1 DB name
    database_id = "<YOUR_D1_DATABASE_ID>" # Replace with the ID you copied
    ```

3.  Uncomment the `[[r2_buckets]]` section and fill in the placeholder:

    - `bucket_name`: The name you chose for your R2 bucket.

    ```toml
    [[r2_buckets]]
    binding = "BUCKET" # Do not change this
    bucket_name = "iyc-portfolio-images" # Replace with your R2 bucket name
    ```

### Step 4: Create Database Tables

Your D1 database is empty. You need to create the tables that your API expects.

1.  From your `worker` directory, run the following commands one by one to create each table. **Make sure to replace `<YOUR_DB_NAME>` with the name of your D1 database (`iyc-portfolio-db`).**

    ```bash
    # Create the 'leaders' table
    wrangler d1 execute iyc-portfolio-db --command "CREATE TABLE leaders (id TEXT PRIMARY KEY, name TEXT NOT NULL, designation TEXT, state TEXT, district TEXT, block TEXT, imageUrl TEXT, age INTEGER, education TEXT, startYear INTEGER, bio TEXT, email TEXT, phone TEXT, social TEXT, protests TEXT, achievements TEXT);"

    # Create the 'news' table
    wrangler d1 execute iyc-portfolio-db --command "CREATE TABLE news (id TEXT PRIMARY KEY, title TEXT NOT NULL, date TEXT, description TEXT, content TEXT, imageUrl TEXT, source TEXT, author TEXT);"

    # Create the 'activities' table
    wrangler d1 execute iyc-portfolio-db --command "CREATE TABLE activities (id TEXT PRIMARY KEY, title TEXT NOT NULL, type TEXT, date TEXT, description TEXT, imageUrl TEXT, location TEXT, fullDescription TEXT, stats TEXT);"

    # Create the 'videos' table
    wrangler d1 execute iyc-portfolio-db --command "CREATE TABLE videos (id TEXT PRIMARY KEY, title TEXT NOT NULL, videoId TEXT NOT NULL, date TEXT);"

    # Create the 'gallery_items' table
    wrangler d1 execute <YOUR_DB_NAME> --command "CREATE TABLE gallery_items (id TEXT PRIMARY KEY, imageUrl TEXT NOT NULL, thumbnailUrl TEXT, alt TEXT, tag TEXT);"

    # Create the 'users' table for authentication
    wrangler d1 execute <YOUR_DB_NAME> --command "CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, hashedPassword TEXT NOT NULL, salt TEXT NOT NULL);"

    # Insert the default admin user
    wrangler d1 execute <YOUR_DB_NAME> --command "INSERT INTO users (id, username, hashedPassword, salt) VALUES ('admin-user-01', 'admin', '01a7689913982f1441a7951b1812844a991b001a1d1326466ab75939b4b0e50a', 'a7b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6');"
    ```

### Step 5: Deploy the Worker

Now you are ready to deploy!

1.  In your terminal, make sure you are in the `worker` directory.
2.  Run the deploy command:
    ```bash
    npm run deploy
    ```
3.  Wrangler will build and deploy your worker. After it finishes, it will output your worker's URL (e.g., `https://iyc-portfolio-api.your-username.workers.dev`).

### Step 6: Configure the Frontend

The final step is to tell your React frontend where to find the API.

1.  Open the `services/api.ts` file in the root of your project.
2.  Update the `API_BASE_URL` constant with the URL of your deployed worker from Step 5.
3.  Update the `R2_PUBLIC_URL` with the public URL of your R2 bucket from Step 2. If you did not enable a public URL, you will need a more advanced setup (like a custom domain or a worker to proxy requests), but for now a public URL is the simplest approach.

    ```typescript
    // services/api.ts

    const API_BASE_URL = 'https://<YOUR_WORKER_URL>'; // Replace this
    const R2_PUBLIC_URL = 'https://<YOUR_R2_PUBLIC_URL>'; // Replace this
    ```

### You're Done!

Your application is now fully wired up to use Cloudflare D1 and R2. When you run your React app, it will fetch and save data using your live cloud backend.
