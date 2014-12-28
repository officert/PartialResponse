_By default, the server sends back the full representation of a resource after processing requests. For better performance, you can ask the server to send only the fields you really need and get a partial response instead._


Follow Google's syntax for their Google+ API:
[https://developers.google.com/+/api/#partial-responses](https://developers.google.com/+/api/#partial-responses)


***

**Syntax:**

| Character | Meaning |
| --------- | ------- |
| ,         | Separates multiple field selectors |
| (         | Begin subselection expression |
| )         | End subselection expression |

***

**Examples:**

Default Booking Object:

```
url=booking/{id}
```

```javascript
{
_id: "1cf3e17c1a0a1d8b",
additionalSpend: 0,
arrivalTime: 1418760900000,
calendarDate: 1418760900000,
canSplit: false,
checkedIn: false,
city: "301072f4d252999a",
client: "web",
created: 1418758578981,
credit: 0,
creditCardFee: 0,
credits: [],
cut: 0.16,
date: 1418709600000,
event: null,
feeTotal: 0,
fees: [],
guests: 10,
id: "1cf3e17c1a0a1d8b",
inventory: "255d849c99566528",
inventoryType: "TABLE",
items: [],
location: "VIP table",
minimum: 520,
modified: 1418792716078,
payment: "VENUE",
price: 520,
primaryUser: {imageUrl: "https://images.tablelist.com/_assets/icon-512.png"},
processed: false,
profit: 83.2,
promoter: false,
prospect: null,
reservation: true,
rewards: [],
splitCode: "7596",
status: "PROCESS_PENDING",
tablelistCut: 83.2,
tax: 36.4,
taxAndTip: 140.4,
ticket: false,
tip: 104,
tipPercent: 0.2,
total: 660.4,
totalWithCredit: 660.4,
totalWithoutCredit: 660.4,
type: "USER",
user: {_id: "88d30abbbe8892b7", firstName: "Tim", lastName: "Officer", email: "timothyofficer@gmail.com",…},
users: [{_id: "64884dfcdb37c784", amount: 660.4, paymentProfile: "fe79dea357663ef7",…}],
venue: {_id: "657cee870ac2cacb", name: "Minibar", type: "lounge",…},
venuePayout: 577.2,
voided: false,
}
```

Selecting fields:

```
url=booking/{id}?fields="date,location,tax,taxandtip,tip,total,user,users,venue"
```

```javascript
{
_id: "1cf3e17c1a0a1d8b",
date: 1418709600000,
location: "VIP table",
tax: 36.4
taxAndTip: 140.4,
tip: 104,
total: 660.4,
user: {
    _id: "88d30abbbe8892b7",
    firstName: "Tim",
    lastName: "Officer",
    email: "timothyofficer@gmail.com" },
users: [{_id: "64884dfcdb37c784", amount: 660.4, paymentProfile: "fe79dea357663ef7"}],
venue: {_id: "657cee870ac2cacb", name: "Minibar", type: "lounge"}
}
```

***


**Additional Resources:**

1. Service Stack is a REST API library for C#, they have implemented the Google+ API partial response syntax - maybe we can copy their implementation and port to javascript.
[https://github.com/AnthonyCarl/ServiceStack.PartialResponse](https://github.com/AnthonyCarl/ServiceStack.PartialResponse)
