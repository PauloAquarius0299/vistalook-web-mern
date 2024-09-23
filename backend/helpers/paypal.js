const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'Af4Ua8wVTUEoSlPeIDfYRtW0GcNhDU2PjaQUtzLnasv5tuWVwbUeq22rSLTmkhcbO3Syr72vQD9mtkeI',
    client_secret: 'EPxpcLcx5k6rdezBVdCwRi51iZZk8S0-oHHCOgU9J0s1LAQlvZcQJpaZlyoso-BJJ9-q-mV6FHyfugnM',
});

module.exports = paypal;