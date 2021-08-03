import { useEffect, useState } from 'react';

import { Input } from './components/Input';

import './App.css';

import swapIcon from '../src/assets/images/horiz_swap_icon.svg'


function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const myCountries = {}
  const [countries, setCountries] = useState({})
  const [amount, setAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [result, setResult] = useState(0)

  const[fromCurrency, setFromCurrency] = useState('')
  const[toCurrency, setToCurrency] = useState('')

  const[stateOfError, setStateOfError] = useState('normal')

  useEffect(() => {
    console.log('usedTheFirst')
    fetch('https://free.currconv.com/api/v7/currencies?apiKey=57299a2e96d145268f67')
        .then(res => res.json())
        .then(data => {
          setCurrencyOptions(Object.keys(data.results).sort())
          setFromCurrency('USD')
          setToCurrency('BRL')
        for (const each of Object.entries(data.results)){
            myCountries[each[0]]= each[1].currencyName
        }
        setCountries(myCountries)
        console.log(countries)  
        })
}, [])

console.log(countries[fromCurrency])
console.log("countries before")

  useEffect(() => {
    console.log('usedTheSecondUseEffect')
    fetch('https://free.currconv.com/api/v7/convert?q='+ fromCurrency + '_' + toCurrency +'&compact=ultra&apiKey=57299a2e96d145268f67')
      .then(res => res.json())
      .then(rate => setExchangeRate(rate[`${fromCurrency}_${toCurrency}`]))
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    setResult((amount * exchangeRate).toFixed(2))
      console.log(exchangeRate + ' inside UseEffect and result: ' + result)
}, [amount, exchangeRate])

  console.log(exchangeRate)

  const onClickButton = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  function updateAmount(event){
    let newAmount = event.target.value
    if(isNaN(newAmount) && newAmount!==""){
      setStateOfError('error')
    }
    else{
      setStateOfError('normal')
      setAmount(newAmount)
    }
  }


  return (
    <div className="wrapper">
      <main>
        <h1>Currency Converter</h1>
        <div className="content">
         <div className="div-input">
           <div className="currency-name">
            <p>{countries[fromCurrency]}</p>
           </div>
          <Input 
           currencyOptions = {currencyOptions}
           selectedCurrency = {fromCurrency}
           onChangeCurrency={e => setFromCurrency(e.target.value)}
           valueForInput={amount}
           onChangeValue={updateAmount}
           maxLength={"9"}
           />
          <p id={stateOfError}>Input must be a number</p>
        </div>
         <div className="swap-button">
        <button onClick={onClickButton}>
        <img src={swapIcon} />
        </button>
        </div>
         <div className="div-output">
           <div className="currency-name">
             <p>{countries[toCurrency]}</p>
           </div>
          <Input 
           currencyOptions = {currencyOptions}
           selectedCurrency = {toCurrency}
           onChangeCurrency={e => setToCurrency(e.target.value)}
           valueForInput = {result}
           readOnly
           />
        </div>
        </div>
      </main>
    </div>
  );
}

export default App;
