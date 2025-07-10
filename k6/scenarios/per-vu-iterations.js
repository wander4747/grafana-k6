import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        index: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 20,
            maxDuration: '30s',
        },
    },
};

export default function () {
    http.get('http://localhost:1234');
    sleep(0.5);
}