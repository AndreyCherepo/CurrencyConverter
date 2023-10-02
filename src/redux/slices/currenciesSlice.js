import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getRates = createAsyncThunk('rates/getRates', async () => {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/latest.js')
    const currencies = await response.json()
    return currencies
  } catch (error) {
    console.error(error)
  }
})

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    list: ['USD', 'PLN', 'BYN', 'EUR'],
    availableList: ['GBP', 'UAH', 'CNY', 'KZT'],
    base: 'USD',
    date: '',
    rates: {},
    amountInBaseCurrency: 100,
  },
  reducers: {
    add: (state, payload) => {
      const { payload: currency } = payload
      console.log('[add] currency:', currency)
      if (!currency) return
      state.availableList = state.availableList.filter(
        (item) => item !== currency
      )
      state.list.push(currency)
    },
    remove: (state, payload) => {
      const { payload: currency } = payload
      state.list = state.list.filter((item) => item !== currency)
      state.availableList.push(currency)
    },
    updateAmount: (state, payload) => {
      const {
        payload: { currency, newValue },
      } = payload
      state.amountInBaseCurrency = newValue / state.rates[currency]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRates.fulfilled, (state, action) => {
      state.rates = action.payload.rates
      state.base = action.payload.base
      state.date = action.payload.date
    })
  },
})

export const { add, remove, updateAmount } = currenciesSlice.actions
export default currenciesSlice.reducer
