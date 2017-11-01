import { loanPaymentPerPeriod, restOfLoan, theData } from '../helpers'

const createTheData = (): theData => {
  return {
    loanData: createLoanData(),
    assetData: createAssetData(),
    stockData: createStockData(),
    taxData: createTaxData(),
    rentData: createRentData()
  }
}
const createLoanData = () => {
  return {
    interestRate: 0.05,
    loanAmount: 20000,
    periods: 20,
    totalPeriods: 50
  }
}

const createAssetData = () => {
  return {
    yieldPerPeriod: 0.02 / 12,
    equity: 300000
  }
}

const createRentData = () => {
  return {
    rentPricePerSM: 4000,
    size: 100,
    rentIncreasePerPeriod: 0.02 / 12
  }
}

const createTaxData = () => ({
  capGainsTax: 0.25
})

const createStockData = () => ({
  stockIncreasePerPeriod: 0.1 / 12,
  equity: 20000
})

describe('Helpers tests', () => {
  describe('Loan Payments tests', () => {
    it('should calculate the correct loan payments', () => {
      const payment = loanPaymentPerPeriod(createTheData(), 1)
      expect(Math.round(payment * 100) / 100).toEqual(1604.85)
    })
    it('should calculate correct rest of loan after 1 period', () => {
      const payment = loanPaymentPerPeriod(createTheData(), 1)
      expect(Math.round(restOfLoan(createTheData(), 1) * 100) / 100).toEqual(
        Math.round((20000 * (1 + 0.05) - payment) * 100) / 100)
    })
  })
})
