import { check, group } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 4,
    duration: '5s',
}

export default function(){
    group('request get', function(){
        const response1 = http.get('http://localhost:1234', {
            tags: {
                type: "simple request"
            },
        });
        check(response1, {
            'status code 200': (r) => r.status === 200
        });
    });
}