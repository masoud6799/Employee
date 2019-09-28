exports.addEmployee = {
  required: [
    'id',
    'data',
    'parent'
  ],
  properties: {
    id: {
      type: 'integer'
    },
    parent: {
      type: 'integer'
    },
    data: {
      type: 'string'
    }
  }
}

exports.getEmployee = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      anyOf: [{
        type: 'integer'
      },
      {
        type: 'string',
        pattern: '^[0-9]+$'
      }
      ]
    },
    parent: {
      type: 'integer'
    },
    data: {
      type: 'string'
    }
  }
}

exports.updateEmployee = {
  type: 'object',
  additionalProperties: true,
  required: [
    'id',
    'data',
    'parent'
  ],
  properties: {
    id: {
      type: 'integer'
    },
    parent: {
      type: 'integer'
    },
    data: {
      type: 'string'
    }
  }
}
