import { RequestType } from "../types/requestType";

export function request(inputs: RequestType[]): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:9090/api/registration');

        const data = new FormData();
        for (const d of inputs) {
            data.append(d.inputName, d.inputValue);
        }
        console.log(data);

        xhr.onload = function () {
            console.log(xhr.status);
            console.log(xhr.response);
            const res = JSON.parse(xhr.response);
            resolve(res);
        };

        xhr.onerror = function () {
            reject(new Error('Request failed'));
        };

        xhr.send(data);
    });
}
