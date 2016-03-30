# UI Library for React

## [live demo](http://5doe.com/custom/react-component/example/)

## todolist

* Pagination Done ![Done](https://cdn2.iconfinder.com/static/b8f60f4d8c7eba9114a36481bae51c41/assets/img/checkmark-green.png)
* Table Done
* List
* QRCode
* Checkbox Done
* CheckboxGroup Done
* Radio Done
* RadioGroup Done
* Select Done
* Tree Done
* Datepicker Done
* Message
* Form
* DataSource
* Dialog Done
* Upload
* Tab
* Accordion
* AutoComplete
* Progress
* Tooltip Done
* Slider
* Button Done

# how to develop

```
npm install
npm run lib
npm run example

browser example/index.html
```

# Release logs

## 0.3.14

* Table support object render

## 0.3.12

* add Form Control : Textarea

## 0.3.11

* implement table allcheck
* refactor TitleRender,  ItemRender and Column

## 0.3.10

* fixed Pagination default state error
* fixed Table css float error, add clearfix

## 0.3.9

* fixed some bugs
* !!! The implement of Table is dirty , refactor in next version : 0.4.0

## 0.3.6

* add Component Slider

## 0.3.3

* add Component Tree

## 0.3.0

* add examples
* fixed data error bug

## 0.2.6

* add Mixin to export
* Tooltip half to complete
* fixed DatePicker range error

## 0.2.5

* Support IE8!!!

## 0.1.17

* DatePicker add getValue() and onChange
* fixed issue #7

## 0.1.16

* Input dynamic value
* reduce so many times to call render

## 0.1.15

* Pagination complete
* Datepicker default empty (no text in Input)
* Checkbox bug
* use webpack normal mode to pack all(I dont know why ```-p``` mode would remove all ```-webkit```-style code)

## 0.1.14

* fixed radio and checkbox render twice
* fixed Dialog and Loading battle for ToggleMixin
* add Select component min-height

## 0.1.13

* add Loading Component
* add DatePicker Component
* add RadioGroup Component, so had to destory and rebuild Radio Component
* Select component ```search mode``` support regexp to input
* fixed some bug

