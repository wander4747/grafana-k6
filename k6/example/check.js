import http from 'k6/http';
import { check }  from 'k6';

export const options = {
    vus: 1,
    duration: '3s'
}

export default function () {
    const res = http.get('http://localhost:1234')

    check(res, {
        'status code 200': (r) => r.status === 200
    });
}