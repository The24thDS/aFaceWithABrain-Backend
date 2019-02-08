# Server Endpoints

1. `/`
    - returns `readme.html`

2. `/clarify`
    - takes in a POST request with an `image` link is JSON format
    ```json
    {
        "image": "link-of-the-image"
    }
    ```
    - returns `status 200` and an object containing the regions with faces if the image in valid
    - returns `status 400` and a `statusText` of `The image doesn't contain any faces` if there are no faces detected

3. `/register`
    - takes in a POST request with the `username`, `email` and the `password` in JSON format 
    ```json
    {
        "username": "actual-username",
        "email": "user-email",
        "password": "user-password"
    }
    ```
    - returns a `status 200` and a response in JSON format if the registration has succeeded
    ```json
    {
        "status": "Success",
        "message": "You have successfully registered 👍"
    }
    ```
    - returns a `status 400` and a response in JSON format if the registration has failed because:
        - the email is already registered
        - the email is not valid
        - the password is not valid
    ```json
    {
        "status": "Error",
        "message": "Different message depending on the failure reason"
    }
    ```