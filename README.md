Tyler and Ethans Template Library Training
==========================================
A templating library that is expected to bring the full power of a template system to nodejs

Components
----------
* l10n (translation support from the get go)
* basic replacement with full traversal of objects
* 

Basic replacement example:
--------------------------
```
<html>
<head>
  <title>Welcome!</title>
</head>
<body>
  <h1>Welcome ${user}!</h1>
  <p>Our latest product:
  <a href="${latestProduct.url}">${latestProduct.name}</a>!
</body>
</html>
```
becomes:
```
<html>
<head>
  <title>Welcome!</title>
</head>
<body>
  <h1>Welcome John Doe!</h1>
  <p>Our latest product:
  <a href="products/greenmouse.html">green mouse</a>!
</body>
</html>
```
