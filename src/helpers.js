export const PMT = (rate, nper, pv, fv = 0, type = 0) => {
  if (rate === 0) return -(pv + fv) / nper

  const pvif = Math.pow(1 + rate, nper)
  let pmt = rate / (pvif - 1) * -(pv * pvif + fv)

  if (type === 1) {
    pmt /= (1 + rate)
  }

  return pmt
}
export const moneyString = number => `${(Math.round(number * 100)/100).toLocaleString('de', { currency: 'EUR' , minimumFractionDigits: 2 })} €`

export const monthlyLoanPayment = ({interestRate, loan, years}) => -1 * PMT(interestRate / 12, years * 12, loan)

const roundMoney = number => Math.round(number*100)/100

export const loanPayments = ({interestRate, loan, years}) => {
  let loanAtBeginningOfYear = loan
  let loanAtEndOfYear
  const amountMonthlyLoanPayment = monthlyLoanPayment({interestRate, loan, years})
  return [...Array(years).keys()].map(year => {
    let loanAtBeginningOfMonth = loanAtBeginningOfYear
    let loanAtEndOfMonth
    let yearlyInterest = 0
    const monthlyPayments = [...Array(12).keys()].map(() => {
      const interest = loanAtBeginningOfMonth * interestRate / 12
      yearlyInterest += interest
      loanAtEndOfMonth = loanAtBeginningOfMonth - amountMonthlyLoanPayment + interest
      const result = {
        loanAtBeginning: loanAtBeginningOfMonth,
        loanAtEnd: loanAtEndOfMonth
      }
      loanAtBeginningOfMonth = loanAtEndOfMonth
      return result
    })
    loanAtEndOfYear = monthlyPayments[11].loanAtEnd
    const result = {
      year: 2018 + year,
      loanAtBeginning: roundMoney(loanAtBeginningOfYear),
      loanPayment: roundMoney(amountMonthlyLoanPayment * 12),
      loanAtEnd: roundMoney(loanAtEndOfYear),
      interest: yearlyInterest,
      monthlyPayments
    }
    loanAtBeginningOfYear = loanAtEndOfYear
    return result
  })
}
