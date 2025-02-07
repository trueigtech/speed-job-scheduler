export const createPaymentSchema = {
  body: {
    type: 'object',
    properties: {
      amount: { type: ['number'] },
      currency: { type: ['string'] },
      userId: { type: ['string', 'number'] }
    },
    required: ['currency']
  }
}
