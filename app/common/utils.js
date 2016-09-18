export function createAction (type, generatePayload) {
  return function () {
    return {
      type,
      payload: generatePayload ? generatePayload.apply(this, arguments) : null
    }
  }
}
