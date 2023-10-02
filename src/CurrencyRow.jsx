import { useDispatch, useSelector } from 'react-redux'
import { remove, updateAmount } from '../redux/slices/currenciesSlice'
import './CurrencyRow.scss'
import close from '../close.svg'

const CurrencyRow = ({ currency, removable }) => {
  const Decimals = 3
  const rates = useSelector((state) => {
    return state.currencies.rates
  })

  const baseAmount = useSelector((state) => {
    return state.currencies.amountInBaseCurrency
  })
  const dispatch = useDispatch()
  if (!rates?.[currency]) {
    return ''
  }
  console.log(
    `Currency: ${currency}, base amount: ${baseAmount}, rates: ${rates[currency]}`
  )

  const localAmount =
    Math.round(baseAmount * rates[currency] * 10 ** Decimals) / 10 ** Decimals

  return (
    <div className="currencyList">
      <div className="currencyInfo">
        <p>Currency:</p>
        <span>{currency}</span>
      </div>
      <div className="inputBlock">
        <input
          type="number"
          placeholder={currency}
          onChange={(e) =>
            dispatch(updateAmount({ currency, newValue: e.target.value }))
          }
          value={localAmount}
        />
        {removable && (
          <button
            className="closeBtn"
            type="button"
            onClick={() => dispatch(remove(currency))}
          >
            <img className="close" src={close} alt="" />
          </button>
        )}
      </div>
    </div>
  )
}

export default CurrencyRow
