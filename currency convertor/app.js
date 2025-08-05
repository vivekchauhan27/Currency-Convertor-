const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select"); 
const msg=document.querySelector(".msg"); 


for (let select of dropdowns) {
    for(let currCode in countryList){
        let option=document.createElement("option");
        option.value=currCode;
        option.innerText=currCode;
        select.appendChild(option);
        if (select.name==="from" && currCode==="USD") {
            option.selected=true;
        }else if (select.name==="to" && currCode==="INR") {
            option.selected=true;
        }

        select.addEventListener("change", (e)=>{
            updateFlag(e.target);
        })
    }
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newSrc;
}

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    updateExchangeRate();
}
)

const updateExchangeRate= async()=>{
    let amountInput=document.querySelector(".amount input");
    let amountValue=amountInput.value;
    
    let amount = parseFloat(amountValue);
    if (isNaN(amount) || amount <= 0) {
    amount = 1;
    amountInput.value = 1;
    }

    //console.log(fromCurrency.value, toCurrency.value);

    const URL=`${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;

    let request = await fetch(URL);
    let data= await request.json();
    //console.log(data);
    const rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    //console.log(rate);

    let finalAmount = amount * rate;
    //console.log(finalAmount);

    msg.innerText=`${amount} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;   


}
window.addEventListener("load", ()=>{
    updateExchangeRate();
})
