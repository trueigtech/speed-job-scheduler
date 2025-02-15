export const withdrawAmountsSchema = {
  body: {
    type: 'object',
    properties: {
      amount: { type: ['number'] },
      currency: { type: ['string'] },
      userId: { type: ['number'] },
      address: { type: ['string'] }

    },
    required: ['amount', 'currency']
  }
}
