# ProMan

Welcome to ProMan README. This web app is designed to provide a straightforward solution for managing projects wit the use of boards and cards in an intuitive and user-friendly manner.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Overview

This web app is a 'one-pager' that simplifies the management of boards and cards. It offers an uncomplicated yet effective solution for organizing tasks, projects, or any other form of structured information.

With a clean and easy-to-navigate interface, users can quickly access and view all their boards. When a board is opened, the associated cards are displayed for seamless task management. The goal is to provide a user-friendly application that is intuitive at first glance, making it easy for both new and experienced users.

## Features

- **Board Management**: Easily create, view, and organize boards to group related cards or tasks.

- **Card Management**: Add, edit, and delete cards within boards for detailed task tracking.

- **Intuitive Interface**: A simple and user-friendly interface that minimizes learning curves.

- **Effortless Navigation**: Quick access to all boards with a single-page design.

## Getting Started

To get started with the web app, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
   
2. **Environment Setup**:
   - Create a virtual environment to manage dependencies:
     ```
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows: `venv\Scripts\activate`
     - On macOS and Linux: `source venv/bin/activate`

3. **Install Dependencies**:

```shell
pip install -r requirements.txt
```

4. **Database Configuration**:
- Set up a database to store application data.
- Update the database connection settings in the configuration files.

5. **Run the Application**:

```shell
python main.py
```

6. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:<PORT>` where `<PORT>` is the port number specified in your environmental variables or configuration files.

7. **Start Managing**: Create boards, add cards, and effortlessly manage your tasks and projects.

## Usage

- **Creating Boards**: Click the "Create Board" button to set up new boards for organizing your tasks.

- **Managing Cards**: Inside each board, use the "Add Card" button to create cards. Edit or delete cards as needed.

- **Navigating**: Use the navigation menu to switch between different boards with ease.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code in accordance with the terms of the license.
