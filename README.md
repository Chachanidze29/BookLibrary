# Book Library

**Book Library** is a management tool designed to help library owners efficiently manage their book inventory, lending records, and members. With this tool, users can organize their collections, track loans, and maintain a member database.

## Features

- Add, edit, and delete books
- Track book loans and returns
- Maintain member records
- Generate reports on book availability and borrowing history
- Easy-to-use interface for library management

## Demo

http://bibliotekage.me

## Questions or demands

If you have any questions or demands, please contact me on my email: chachanidze29m@gmail.com

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/book-library.git
    ```

2. Navigate to the project directory:

    ```bash
    cd book-library
    ```
   
3. Install docker:

    ```bash
    install docker
    ```

4. Create a new `.env` file by copying the example:

    ```bash
    cp .env.example .env
    ```
   
5. Run application:

    ```bash
    docker-compose up -d
    ```

6. Install composer dependencies:

    ```bash
    docker exec -it library-app bash && composer install
    ```

7. Install npm dependencies:

    ```bash
    npm install
    ```

8. Run the application frontend:

    ```bash
    npm run dev
    ```

## Issues

If mysql user isn't created run docker-compose down -v and then docker-compose up -d

## Usage

Once installed and running, you can access the system via your local web browser to start managing your library's inventory and lending records.

## Contributing

This project is proprietary and not open for public contribution at this time.

## License

This project is licensed under a Proprietary License. See the `LICENSE` file for more information.

---

© 2024 Book Library. All rights reserved.
