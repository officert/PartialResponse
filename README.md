This is a port of Anthoy Carl's Partial Response parser in C#:
https://github.com/AnthonyCarl/ServiceStack.PartialResponse/blob/master/src/ServiceModel/ServiceStack.PartialResponse.ServiceModel/FieldSelectorParser.cs

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

Default Person Object:

```javascript
{
  id: "123",
  firstName: 'Jack',
  lastName: 'Black',
  age: 45,
  address: {
    street: '45 Awesome Lane',
    city: 'Boston',
    state: 'MA',
    zip: 02143
  }
}
```

Selecting fields:

```
person/123?fields="firstName,lastName,address(street)"
```

```javascript
{
  id: "123",
  firstName: 'Jack',
  lastName: 'Black',
  address: {
    street: '45 Awesome Lane'
  }
}
```

Excluding fields:

```
person/123?fields="-id,-address"
```

```javascript
{
  firstName: 'Jack',
  lastName: 'Black',
  age: 45
}
```
***
