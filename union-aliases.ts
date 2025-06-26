
type Combinable = number | string;
type CombinableConversionType = 'as_number' | 'as_text';

function combine 
(
    // input1: number | string,
    // input2: number | string,
    // resultConversion: 'as_number' | 'as_text'

    input1: Combinable,
    input2: Combinable,
    resultConversion: CombinableConversionType
)
{
   let result;

   if(typeof input1==='number'&& typeof input2 === 'number' || resultConversion==='as_number')
    result= +input1 + +input2;
    else
    result= input1.toString()+input2.toString();
   
    return result;
}

const combineNumbers = combine('3', '5', 'as_number');
const texts = combine('Text1', 'Text2', 'as_text');
const test = combine('Text1', '1', 'as_number');

console.log(combineNumbers);
console.log(texts);
console.log(test);


