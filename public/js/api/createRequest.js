/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType='json';

    let url = options.url;
    const formData = new FormData();

    if (options.data) {
        if (options.method === 'GET') {
            url += '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
        }
    }




    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let err = null;
            let resp = null;

            if (xhr.status === 200) {
                const r = xhr.response;
                if (r && r.success) {
                    resp = r;
                } else {
                    err = r;
                }
            } else {
                err = new Error('Беда');
            }
            options.callback(err, resp);
        }
    }

    xhr.open(options.method, url)
    xhr.send(formData)
};
