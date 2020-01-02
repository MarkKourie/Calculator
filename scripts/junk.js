    //multiplication
    let arrayOfProducts = getMultiplicationValues(arithmeticString);
    arrayOfProducts = arrayOfProducts.map((array) => multiplication(array))
    console.log(arrayOfProducts)
    updateArithmeticString(arithmeticString, arrayOfProducts, "*")
    console.log(arithmeticString);
    console.log(arithmeticString.split(' '));
    //division
    //addition
    //subtraction
    ;
    //equals sign ensures correct arguments are passed to correct operator functions
});

//While the instructions suggest using a variable to store the current value, I'm thinking
// to assign the current value to a new div with a unique ID when an operation is called.
// and then to complete the operation, to call on the values of the various divs in an
// operations container and perform the operations. 

function getMultiplicationValues(string) {
    let arrayToExtractProducts = string.split(/[+-\/]/);
    let arrayOfProducts = arrayToExtractProducts.filter((item) => {
        return item.includes("*");
    });
    for (let i=0; i<arrayOfProducts.length; i++) {
        arrayOfProducts[i] = arrayOfProducts[i].split("*");
        arrayOfProducts[i] = arrayOfProducts[i].map((item) => parseInt(item));
    }
    return arrayOfProducts;
}

function updateArithmeticString(string, array) {
    let arrayToExtractProducts = string.split(/[+-\/]/);
    for (let i = 0; i < arrayToExtractProducts.length; i++) {
        for (let j = 0; j < array.length; j++)
        if (arrayToExtractProducts[i].includes("*")) { 
            arrayToExtractProducts[i] = `${array[j]}`;
            array = array.shift();
        }
    }
    
    
    //for (let i = 0; i < array.length; i++) {
    //    if (operation = "*") {
    //    string = string.replace(/\d\s\*\s\d/, array[i]);
    //    }
    //} 
    return ;
} 