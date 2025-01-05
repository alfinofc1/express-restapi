# Express REST API

A simple and fast REST API built with Node.js and Express. This API serves data from a JSON file and includes basic CRUD operations.

## Features

- **Dynamic Routes**: Add new routes in the `rute.json` file, and they will automatically appear in the API.

### Example: Adding a Route to `rute.json`

To add a new route to the API, simply add an entry in the `rute.json` file. For example, to add a route for a new item, modify `rute.json` like this:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Item One",
      "description": "Description of Item One"
    },
    {
      "id": 2,
      "name": "Item Two",
      "description": "Description of Item Two"
    }
  ]
}
```

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/VarrelKun/express-restapi.git
    ```
2. Navigate into the project directory:
    ```bash
    cd express-restapi
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Running the App

To run the API server locally, use:
```bash
npm start
```
