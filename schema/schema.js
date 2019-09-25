exports.updateEmployee = {
    type: 'object',
  additionalProperties: false,
  required: [
    'id',
    'data',
    'parent'
  ],
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
        anyOf: [{
          type: 'integer'
        },
        {
          type: 'string',
          pattern: '^[0-9]+$'
        }
        ]
      }
  }

}