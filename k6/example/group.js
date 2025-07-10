import { check, group } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 4,
    duration: '5s',
}

export default function(){
    group('request get', function(){
        const response1 = http.get('http://localhost:1234');
        check(response1, {
            'status code 200': (r) => r.status === 200
        });
    });

    group('request post', function(){
        const payload = JSON.stringify({
            email: 'test@test.com',
            password: 'admin',
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = http.post('http://localhost:1234', payload, params);
        check(response, {
            'status code 200': (r) => r.status === 200
        });
    });
}