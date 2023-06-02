import { useState } from "react";

function Testing(){
let a = [{name:"mani"},{name:"jani"},{name:"pani"},{name:"suni"},{name:"tani"},{name:"vini"}];
const [getData,setData] = useState([]);
let onpushHandler = ()=>{
//     for(let i = 0; i<a.length; i++){
//         setData([a[i].name]);
        
//     }
//     console.log(getData);
// }
// a.map((a)=>{
//     setData([...getData, {a.name} ]);
// })
// console.log(getData);
setData(a);
console.log(getData);

}
return(<>
<button onClick={onpushHandler}>button</button>
</>)
}
export default Testing;