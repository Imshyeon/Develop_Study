const customers = ["Max", "Zoe", "Taemin"];
const activeCustomers = ["Max", "Zoe"];

const inactiveCustomers = _.difference(customers, activeCustomers);;
console.log(inactiveCustomers)