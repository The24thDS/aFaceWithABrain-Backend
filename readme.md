# Endpoints

1. `/`
    - returns `readme.html`

2. `/clarify`
    - takes in a POST request with an `image` link in JSON format (eg: `{"image": "link-of-the-image"}`)
    - returns `status 200` and an object containing the regions with faces if the image in valid
    - returns `status 400` and a `statusText` of `The image doesn't contain any faces` if there are no faces detected

