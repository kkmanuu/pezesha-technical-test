# pezesha-technical-test

This project demonstrates integration with the Marvel API and a CSV invoice upload system. It showcases API integration, caching for performance optimization, and efficient data handling.

## Features

- 🔒 **Marvel Characters Display**
    - Fetches and displays Marvel Universe characters with caching for performance optimization
  
- **Invoice Upload**

   - CSV file upload system that stores data efficiently in a database

- **Responsive Design**

   -  Mobile-friendly interface using Bootstrap

- **Performance Optimization**

   - Implements caching strategy to reduce API calls
   - Register and login functionality
   - Protected routes


## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Bootstrap 5 for styling
- LocalStorage for client-side caching

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- Marvel API integration


## Getting Started

### Prerequisites


- Node.js (v14 or higher)
- npm or yarn
- MongoDB installed and running
- Marvel API keys (Public and Private keys from https://developer.marvel.com/)

### Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd pezesha-technical-test
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pezesha-technical-test

MARVEL_PUBLIC_KEY=your_marvel_public_key
MARVEL_PRIVATE_KEY=your_marvel_private_key
```

Make sure MongoDB is running:
```bash
# Start MongoDB service
mongod
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend application:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
pezesha-technical-test/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CharacterList.jsx
│   │   │   └── InvoiceUpload.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── public/
└── README.md
```

## Features Implementation

### Caching Strategy
The application implements a two-level caching approach:

1. **Client-side caching**: Uses localStorage to cache Marvel character data for 1 hour
2. **Backend caching**: Implements in-memory caching to reduce Marvel API calls

This ensures optimal performance and reduces unnecessary API requests.

### File Upload Process
The CSV upload feature:
1. Validates file format (accepts only .csv files)
2. Parses CSV data using appropriate parser
3. Stores invoice data in MongoDB using batch insertion for efficiency
4. Provides real-time feedback on upload status

## API Endpoints

### Marvel Characters
- `GET /api/marvel/characters` - Fetches Marvel characters with caching

### Invoice Management
- `POST /api/invoices/upload` - Uploads and processes CSV files

## Usage

1. **View Marvel Characters**: Navigate to "Marvel Characters" to see a grid of characters from the Marvel Universe
2. **Upload Invoices**: Go to "Invoice Upload" and select a CSV file to upload invoice data

## Performance Optimization

- Implemented caching mechanism that stores API responses
- Cache expiration set to 1 hour to balance freshness and performance
- Lazy loading for images
- Responsive grid layout for optimal viewing on all devices

## Known Issues

- None at the moment

## 🔮 Future Improvements  

- Add search and filter functionality for Marvel characters  
- Implement pagination for large datasets  
- Add export functionality for processed invoices  


##  Authors <a name="authors"></a>
- *Emmanuel Kipngeno*

- GitHub: [@githubhandle](https://github.com/kkmanuu)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/emmanuel-kipngeno/)

## 📄 License

This project was created solely for technical assessment purposes and is not intended for production use.
