```
let domData = document.querySelectorAll('[data-language=json]')[0].innerText
console.log(JSON.parse(domData))
 ```

structured string returns
 `const values = JSON.stringify(dataValue, undefined, 4)`


 use `??` instead of `||`