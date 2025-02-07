export const getReferredUsersSchema={
  query: {
      type: 'object',
      properties: {
        userId: { type: ['number', 'string'] },
        limit: { type: ['string', 'null'] },
        pageNo: { type: ['string', 'null'] },
      },
      required: ['userId']
  }
}
