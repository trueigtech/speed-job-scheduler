export const updateUserDetailsSchema = {
  body: {
    type: 'object',
    properties: {
      // userId: { type: 'number' },
      dateOfBirth: { type: ['string', 'null'] },
      user: { type: 'object' },
      firstName: { type: ['string', 'null'], maxLength: 50, minLength: 3 },
      lastName: { type: ['string', 'null'], maxLength: 50 },
      phone: { type: ['string', 'null'], pattern: '^[0-9]{0,12}$' },
      profileImage: {type: 'object'}
      // phoneCode: { type: ['string', 'null'], minLength: 2, maxLength: 5, pattern: '^[+][0-9]+$' },
      // gender: { enum: ['Female', 'Male', 'Other', 'null'] },
      // countryCode: { type: ['string', 'null'], minLength: 2, maxLength: 8 }
    },
    // required: ['userId']
  }
}
