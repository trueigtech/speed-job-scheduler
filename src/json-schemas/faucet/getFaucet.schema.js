export const getFaucetSchema = {
  query: {
    type: 'object',
    properties: {
      currencyCode: { enum: ['GC', 'PSC'] },
    },
    required: ['currencyCode']
  }
}
