export const NOWPAYMENT_WEBHOOK_STATUS = {
  WAITING: 'waiting',
  CONFIRMING: 'confirming',
  CONFIRMED: 'confirmed',
  SENDING: 'sending',
  PARTIALLY_PAID: 'partially_paid',
  FINISHED: 'finished',
  FAILED: 'failed',
  EXPIRED: 'expired'
};

export const NOWPAYMENT_WEBHOOK_MAPPING = {
  'waiting': 0,
  'confirming': 0,
  'confirmed': 1,
  'sending': 0,
  'partially_paid': 1,
  'finished': 1,
  'failed': 3,
  'expired': 7
};
