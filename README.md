[1]:https://cdn2.iconfinder.com/static/b8f60f4d8c7eba9114a36481bae51c41/assets/img/checkmark-green.png
# UI Library for React

## [live demo](http://5doe.com/custom/react-component/example/)

## todolist

* Input & Textarea ![Done][1]
* Validate
* Pagination ![Done][1]
* Table ![Done][1]
* Checkbox ![Done][1]
* CheckboxGroup ![Done][1]
* Radio ![Done][1]
* RadioGroup ![Done][1]
* Select ![Done][1]
* Tree ![Done][1]
* Datepicker ![Done][1]
* Message
* Form ![Done][1]
* Dialog ![Done][1]
* Upload ![Done][1]
* Tab
* Accordion
* AutoComplete
* Progress ![Done][1]
* Tooltip ![Done][1]
* Slider ![Done][1]
* Button ![Done][1]
* Spinner ![Done][1]

# usage

First, ```npm install react-component-lib```

Then:
```
var RUI = require('react-component-lib');

// or

import RUI, {Button, Input} from 'react-component-lib';
```

whatever ```require``` or ```import```, RUI will patch a global variable named: RUI, such as ```window.RUI```

Note:
Make sure you import ```React``` and ```ReactDOM``` before ```RUI```

In my case, I use ```<script src="react+reactdom.js"></script>``` to import React before RUI,
React is so big, I expect to split it into a common file, and Browser will cache it

# how to develop

```
npm install
// Mac & Linux
npm run example
// Windows
npm run example-win

browser example/index.html
```