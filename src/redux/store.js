import { configureStore } from '@reduxjs/toolkit'
import currencies from './slices/currenciesSlice'

export default configureStore({
  reducer: {
    currencies,
  },
})
