
/* #region addEmployee */
exports.addEmployee = {
  type: 'object',
  required: [
    'id',
    'data',
    'parent',
    'org'
  ],
  additionalProperties: false,
  properties: {
    id: {
      type: 'string'
    },
    parent: {
      type: 'integer'
    },
    data: {
      type: 'object'
    },
    org: {
      type: 'string'
    }
  }
}
/* #endregion */

/* #region getEmployee */
exports.getEmployee = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
    },
    parent: {
      type: 'integer'
    },
    data: {
      type: 'object'
    },
    org: {
      type: 'string'
    }
  }
}
/* #endregion */

/* #region updateEmployee */
exports.updateEmployee = {
  type: 'object',
  additionalProperties: true,
  required: [
    'id',
    'data',
    'parent',
    'org'
  ],
  properties: {
    id: {
      type: 'string'
    },
    parent: {
      type: 'integer'
    },
    data: {
      type: 'object'
    },
    org: {
      type: 'string'
    }
  }
}
/* #endregion */
