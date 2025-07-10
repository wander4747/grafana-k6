import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        index: {
            executor: 'constant-vus',
            vus: 10,
            duration: '30s',
        },
    },
};

export default function () {
    http.get('http://localhost:1234');
    sleep(0.5);
}