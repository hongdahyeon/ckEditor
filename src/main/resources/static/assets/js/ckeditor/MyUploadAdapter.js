class MyUploadAdapter {

    constructor(loader) {
        this.loader = loader;

        // URL
        this.url = "/api/uploadCKImageFile";
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    this._initListeners(resolve, reject, file);
                    this._sendRequest(file);
                })
        );
    }

    abort() {
        if (this.controller) {
            this.controller.abort();
        }
    }

    _initListeners(resolve, reject, file) {
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${loader.file.name}.`;

        const controller = new AbortController();
        this.controller = controller;

        const signal = controller.signal;

        signal.addEventListener("abort", () => {
            reject();
        });

        const options = {
            method: "POST",
            body: new FormData(),
            signal,
        };

        options.body.append("file", file);

        const headers = new Headers();
        headers.append("Accept", "application/json");

        options.headers = headers;

        const responseHandler = (response) => {
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then((json) => {
                    if (!json || json.error) {
                        return reject(
                            json && json.error ? json.error.message : genericErrorText
                        );
                    }
                    resolve({
                        default: json.url,
                    });
                    console.log("json : ", json)
                });
            } else {
                return reject(genericErrorText);
            }
        };

        fetch(this.url, options)
            .then(responseHandler)
            .catch((error) => {
                if (error.name === "AbortError") {
                    return;
                }
                reject(genericErrorText);
            });
    }

    _sendRequest(file) {
    }
}