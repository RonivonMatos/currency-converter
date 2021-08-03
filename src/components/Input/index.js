import './styles.css'

export function Input(props){

  const{
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    valueForInput,
    onChangeValue,
    maxLength,
  } = props

  return(
    <div>
      <input value={valueForInput} maxLength={maxLength} onChange={onChangeValue}/>
          <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map(option=>(<option key={option} value={option}>{option}</option>))}
          </select>
    </div>
  )
 
}









// <input type="text" id="amount" maxLength="9" value={amount} onChange={updateAmount} />
//  <select value={fromCurrency} onChange={(event) => setFromCurrency(event.target.value)}>
//   {currencyOptions.map(option=>(<option key={option} value={option}>{option}</option>))}
//  </select>


{/* <input type="number" id ="result" value={result} readOnly/>
          <select value ={toCurrency} onChange={(event) => setToCurrency(event.target.value)}>
            {currencyOptions.map(option=> (<option key={option} value={option}>{option}</option>))}
          </select> */}