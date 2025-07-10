import http from 'k6/http';
import { Counter} from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const calls = new Counter('metrics_number_of_calls');
const myGauge = new Gauge('metrics_blocked_time');
const myRate = new Rate('metrics_request_fee_200');
const myTrend = new Trend('metrics_waiting_fee');

export default function () {
    const req = http.get('http://localhost:1234');

    calls.add(1);
    myGauge.add(req.timings.blocked);
    myRate.add(req.status === 200);
    myTrend.add(req.timings.waiting);
}