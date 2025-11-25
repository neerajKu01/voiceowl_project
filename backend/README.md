# 🎧 VoiceOwl Backend API

A simple and scalable Node.js + MongoDB-based transcription backend with import syntax.

## 🚀 Features
✔ Import-based clean structure  
✔ Mock transcription API  
✔ MongoDB connection using Mongoose  
✔ RESTful API endpoints  
✔ Organized folder structure for production

## 📁 Folder Structure
voiceowl_project/  
│  
├── backend/  
│   ├── src/  
│   │   ├── config/  
│   │   ├── controllers/  
│   │   ├── routes/  
│   │   ├── models/  
│   │   ├── utils/  
│   │   └── app.js  
│   └── server.js  

## Install and Run
cd backend
npm install
npm run dev
# server runs at http://localhost:9001


APIs end points (main ones)

POST /api/transcriptions — body { audioUrl: "..." }
mocks download, returns id of saved record
POST /api/transcriptions/upload-audio — multipart form-data audioFile
uploads via Cloudinary (or local fallback), mocks transcription, returns details
GET /api/transcriptions — fetch transcriptions created in last 30 days
GET /api/transcriptions/:id — fetch single record by id
GET /api/transcriptions/audio/:id — get audio URL (streamable)
DELETE /api/transcriptions/:id — delete record and uploaded file
POST /api/azure-transcription — call Azure (or mock) with body { audioUrl }


Assumptions made

For the assignment, audio download and transcription are mocked (unless Azure keys are provided).
Cloudinary is used for file uploads; local disk fallback is available during development.
The API will return JSON responses consistently.
createdAt field is used for “last 30 days” queries.


###########What index you would add for this query if the dataset had 100M+ records.

To optimize performance for fetching records from the last 30 days (especially when data grows to millions of documents), I would add an index on the createdAt field:
db.transcriptions.createIndex({ createdAt: 1 });
This helps MongoDB quickly locate records using range queries like
{ createdAt: { $gte: <date> } }
instead of scanning all documents.
This improves query speed from seconds to milliseconds, reduces CPU load, and improves scalability, especially when dealing with 100M+ records.\
Scalability: How to Handle 10k+ Concurrent Requests
To scale this API from basic usage to 10,000+ concurrent requests, these key improvements would be applied:

1️⃣ Horizontal Scaling & Containerization

Containerize the app with Docker.
Deploy on Kubernetes (K8s) or AWS ECS/EKS, enabling multiple replicas of the API to run behind a load balancer.
This distributes the incoming requests across many instances → better concurrency.

2️⃣ Use Message Queues for Heavy Tasks
Instead of doing transcription processing in the API request (CPU heavy),
send tasks to a message queue like RabbitMQ, AWS SQS, or Kafka.
API receives the request → instantly returns 202 (Accepted) → background worker completes the transcription.
Prevents blocking the server and improves responsiveness.

3️⃣ Caching & Preventing Duplicate Work
Use Redis or Memcached to store frequently requested transcriptions.
Avoid fetching or regenerating the same transcription multiple times.
Improves speed and reduces database load.

4️⃣ Database Optimization
Use Indexes on createdAt and (optionally) audioUrl for fast queries.
Apply connection pooling.
Use MongoDB Atlas auto-scaling to support high workloads.

5️⃣ Auto-Scaling & Load Balancing
Deploy behind AWS ALB, Nginx, or API Gateway.
Enable auto-scaling based on CPU/RAM/requests per second.

6️⃣ File Upload Handling
Use Cloudinary / AWS S3 / Azure Blob for file uploads.
Avoid handling heavy file uploads directly on the API server.
Reduces memory load and speeds up operation.
