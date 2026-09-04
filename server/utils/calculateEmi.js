function calculateEmi(principal, annualInterestRate, tenureMonths) {
  const amount = Number(principal);
  const rate = Number(annualInterestRate);
  const months = Number(tenureMonths);

  if (!Number.isFinite(amount) || !Number.isFinite(rate) || !Number.isFinite(months) || months <= 0) {
    throw new Error('Invalid EMI calculation inputs');
  }

  if (rate === 0) {
    return Math.round(amount / months);
  }

  const monthlyRate = rate / 12 / 100;
  const growth = Math.pow(1 + monthlyRate, months);
  const emi = (amount * monthlyRate * growth) / (growth - 1);
  return Math.round(emi);
}

module.exports = calculateEmi;