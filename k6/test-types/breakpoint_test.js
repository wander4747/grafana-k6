import http from 'k6/http';

export const options = {
    executor: 'ramping-arrival-rate', //Assure load increase if the system slows
    stages: [
        { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
    ],
};

export default () => {
    const res = http.get('http://localhost:1234');
};