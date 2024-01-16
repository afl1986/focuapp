import { addMinutes } from 'date-fns'
import { last, length, reduce } from 'ramda'

import { replaysTimeDiff } from '../const/replays'

export const getRepetitionSteps = (dateFirstReplay: Date) =>
  reduce(
    (acc, current) => {
      if (current === 0) return acc
      const lastRepetitionDate = addMinutes(
        last(acc)!,
        replaysTimeDiff[length(acc)]!,
      )
      return [...acc, lastRepetitionDate]
    },
    [dateFirstReplay],
    replaysTimeDiff,
  )
