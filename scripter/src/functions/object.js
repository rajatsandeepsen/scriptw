export const deepCheck = (a, b) => {
    if (a === b) return true;
   
    if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) return false;
   
    let keysA = Object.keys(a), keysB = Object.keys(b);
   
    if (keysA.length != keysB.length) return false;
   
    for (let key of keysA) {
      if (!keysB.includes(key)) return false;
   
      if (typeof a[key] === 'function' || typeof b[key] === 'function') {
        if (a[key].toString() != b[key].toString()) return false;
      } else {
        if (!deepCheck(a[key], b[key])) return false;
      }
    }
   
    return true;
    
   }
   

export const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }


export function createDate(){
  let date;
  date = new Date();
  date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' + 
      ('00' + date.getUTCHours()).slice(-2) + ':' + 
      ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + date.getUTCSeconds()).slice(-2) + '.' +
      date.getUTCMilliseconds()
      
  return date
}