const lanes = ['lanes']

const laneToDropIsEmpty = [
  ['lanes'],
  ['dragNDropStore'],
  (lanes, laneToDrop) => {
    return lanes.getIn(
      [
        lanes.findIndex((lane) => lane.get('id') === laneToDrop),
        'notes',
      ]
    ).count() === 0;
  },
]

const modal = ['modal']

export default { lanes, laneToDropIsEmpty, modal }
