'use strict';

module.exports = {
  options: {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
      transform: function(doc, ret, options) {
        if (!ret.id && ret._id) {
          ret.id = ret._id;
        }
      },
    },
  },
};
