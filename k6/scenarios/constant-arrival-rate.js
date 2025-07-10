import http from 'k6/http';

export const options = {
    scenarios: {
        index: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            rate: 30,
            timeUnit: '1s',
            preAllocatedVUs: 50,
        },
    },
};

export default function () {
    http.get('http://localhost:1234');
}