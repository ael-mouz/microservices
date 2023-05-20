# Project Name

This repository contains two microservices built with Node.js and Express: User Microservice and Message Microservice.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Microservices](#running-the-microservices)

## Project Description

The User Microservice is responsible for handling user-related functionality such as user authentication, registration, and profile management.

The Message Microservice handles messaging functionality, including sending and receiving messages between users.

## Features

- User Microservice:
  - User registration
  - User authentication (login)
  - User profile management

- Message Microservice:
  - Sending messages
  - Receiving messages
  - Message storage and retrieval

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/microservices.git
   ```
2. Install the dependencies for both microservices. In each microservice's folder (user-microservice and message-microservice), run:

    ```bash
   npm install
   ```
### Running the Microservices
1. Start the User Microservice:

    ```bash
    cd user-microservice
    npm start
  	```
The User Microservice will be running on http://localhost:3000.

2. Start the Message Microservice:

  	```bash
    cd message-microservice
    npm start
    ```
The Message Microservice will be running on http://localhost:4000.
