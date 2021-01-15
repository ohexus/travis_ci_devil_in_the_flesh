export enum BuildStatuses {
  SUCCESS = 0,
  FAIL = 1,
}

export enum BuildStatusMessages {
  PENDING = 'Pending',
  PASSED = 'Passed',
  FIXED = 'Fixed',
  BROKEN = 'Broken',
  FAILED = 'Failed',
  STILL = 'Still Failing',
  CANCELED = 'Canceled',
  ERRORED = 'Errored',
}
