# Basic Express Project with Docker

This project is a simple Express application designed to help students understand the basics of Docker. It includes basic endpoints that return text responses.

## Project Structure

```
projeto-1
├── src
│   ├── app.js
│   └── routes
│       └── index.js
├── package.json
├── .gitignore
├── Dockerfile
└── README.md
```

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

- Node.js installed on your machine.
- Docker installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd projeto-1
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

You can run the application locally using Node.js:

```
node src/app.js
```

The application will be available at `http://localhost:3000`.

### Running with Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t projeto-1 .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 projeto-1
   ```

The application will be available at `http://localhost:3000`.

### Endpoints

- `GET /`: Returns a welcome message.
- `GET /docker`: Returns a brief explanation of Docker.
- `GET /express`: Returns a brief explanation of Express.

## License

This project is licensed under the MIT License.