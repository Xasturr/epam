module.exports = {
    ServerPort: process.env["PORT"] || 5000,
    DatabaseUrl: process.env["MONGODB_URI"] || "mongodb://localhost:27017/CoronaDB",
    cloud_name: '',
    api_key: '',
    api_secret: ''
}