import * as fromCozyClient from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.triggers'

const triggersCollectionKey = 'triggers'

// CRUD action creators

export const fetchTriggers = () =>
  fromCozyClient.fetchTriggers(triggersCollectionKey, 'konnector')

// selectors
export const getKonnectorTriggers = (
  state,
  konnector,
  existingAccountIds = []
) => {
  return (
    (!!state.documents[DOCTYPE] &&
      Object.values(state.documents[DOCTYPE]).filter(trigger => {
        return (
          trigger.worker === 'konnector' &&
          trigger.message &&
          trigger.message.konnector === konnector.slug &&
          trigger.message.account &&
          existingAccountIds.includes(trigger.message.account)
        )
      })) ||
    []
  )
}

export const getTrigger = (state, id) =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  state.documents[DOCTYPE][id]
