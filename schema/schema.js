exports.addUser = {
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

exports.getUsers = {
  type: 'object',
  additionalProperties: false,
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

exports.updateuser = {
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
