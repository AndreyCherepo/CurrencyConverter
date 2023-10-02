import React, { useState, useEffect } from 'react'
import CurrencyRow from './CurrencyRow'
import { add, getRates } from '../redux/slices/currenciesSlice'
import { useDispatch, useSelector } from 'react-redux'
import './CurrencyList.scss'

const CurrencyList = () => {
  const currencies = useSelector((state) => {
    return state.currencies.list
  })

  const date = useSelector((state) => {
    return state.currencies.date
  })
  const availableCurrencies = useSelector((state) => {
    return state.currencies.availableList
  })
  const [currency, setCurrency] = useState(availableCurrencies[0])
  const handleCurrencyChange = (e) => {
    console.log('Changed to', e.target.value)
    setCurrency(e.target.value)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRates())
  }, [])

  useEffect(() => {
    setCurrency(availableCurrencies[0])
  }, [availableCurrencies])
  return (
    <div className="wrapper">
      <h1 className="title">Currency Converter</h1>
      <div className="currencyWrap">
        <p className="date">{date}</p>
        {currencies.map((item, index) => (
          <CurrencyRow
            key={item}
            currency={item}
            removable={index > 1}
          ></CurrencyRow>
        ))}
        {!!availableCurrencies.length && (
          <div className="buttonWrap">
            <button onClick={() => dispatch(add(currency))}>
              {' '}
              Add Currency
            </button>
            <select value={currency} onChange={handleCurrencyChange}>
              {availableCurrencies.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrencyList
