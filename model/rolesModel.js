var mongoose = require("mongoose");

var roleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true
  },
  discripton: {
    type: String,
    required: true
  },
  rolelevel: {
    dashboard: {
      view: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      }
    },
    users: {
      create: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      view: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      edit: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      delete: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      }
    },
    products: {
      create: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      view: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      edit: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      delete: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      }
    },
    roles: {
      create: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      view: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      edit: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      },
      delete: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Role = mongoose.model("roles", roleSchema);
module.exports = Role;