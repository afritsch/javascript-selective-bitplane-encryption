+++++++++++++++++++++++++++++++++++++++++++++++
+                                             +
+  Fachhochschule Salzburg                    +
+  University of Applied Sciences             +
+                                             +
+  Major: MultiMedia Technology               +
+  Specialization: Web & Communities          +
+                                             +
+  Summersemester 2012                        +
+  Subject: Multimedia Security               +
+                                             +
+  Project: Selective Bitplane Encrytion      +
+  (C) Fritsch Andreas, Wanko Lukas           +
+                                             +
+++++++++++++++++++++++++++++++++++++++++++++++

This project is licensed under the MIT License.

Content:
1. About
2. How it works
3. Still to do


1. About
--------

This project is a lightweight implementation of selective bitplane encryption
of images implemented in html5 and javascript.

2. How it works
---------------

The main implementation is located in logic.js.

We are using the canvas tag to extract the image data and manipulte it. The
single color-channels are extracted and the values are converted to binary,
manipulated, converted back to decimal and written back to the image. The
manipulated image will be rerendered.

3. Still to do
--------------

- Use of jsaes
- Get fronted to work
- [...]