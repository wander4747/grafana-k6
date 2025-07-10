import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 2000 }, // fast ramp-up to a high point
        // No plateau
        { duration: '1m', target: 0 }, // quick ramp-down to 0 users
    ],
};

export default () => {
    const res = http.get('http://localhost:1234');
};