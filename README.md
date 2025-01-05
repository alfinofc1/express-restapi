# 🚀 Express REST API

A simple and fast REST API built with Node.js and Express created by [gopalasu].

## ✨ Features

- **Dynamic Routes**: Add new routes in the `rute.json` file, and they will automatically appear in the API.

### ⚙️ `rute.json`

To add a new route to the API, simply add an entry in the `rute.json` file. For example, to add a route for a new item, modify `rute.json` like this:

```json
{
    "nama": "Nama Route",
    "method": "GET",
    "url": "/route/etc",
    "iconname": "fa-solid fa-images", // icon dari font awesome
    "category": "Kategori nya"
  }
```

## 📎 Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/VarrelKun/express-restapi.git
    cd express-restapi
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

## Running the App

To run the API server locally, use:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
