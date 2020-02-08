/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  protocol: {
    nested: {
      Response: {
        fields: {
          ts: {
            type: "int64",
            id: 1
          },
          seq: {
            type: "int64",
            id: 2
          }
        }
      },
      AuthRequest: {
        fields: {
          token: {
            type: "string",
            id: 1
          },
          uid: {
            type: "string",
            id: 2
          },
          ts: {
            type: "int64",
            id: 3
          },
          seq: {
            type: "int64",
            id: 4
          }
        }
      },
      AuthResponse: {
        fields: {
          status: {
            type: "int32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          ts: {
            type: "int64",
            id: 3
          },
          seq: {
            type: "int64",
            id: 4
          }
        }
      },
      LogoutRequest: {
        fields: {
          token: {
            type: "string",
            id: 1
          },
          uid: {
            type: "string",
            id: 2
          },
          ts: {
            type: "int64",
            id: 3
          },
          seq: {
            type: "int64",
            id: 4
          }
        }
      },
      LogoutResponse: {
        fields: {
          ts: {
            type: "int64",
            id: 1
          },
          seq: {
            type: "int64",
            id: 2
          }
        }
      },
      C2CSendRequest: {
        fields: {
          from: {
            type: "string",
            id: 1
          },
          to: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          ts: {
            type: "int64",
            id: 4
          },
          seq: {
            type: "int64",
            id: 5
          }
        }
      },
      C2CSendResponse: {
        fields: {
          msgId: {
            type: "int64",
            id: 1
          },
          ts: {
            type: "int64",
            id: 2
          },
          seq: {
            type: "int64",
            id: 3
          }
        }
      },
      C2CPushResponse: {
        fields: {
          msgId: {
            type: "int64",
            id: 1
          },
          ts: {
            type: "int64",
            id: 2
          },
          seq: {
            type: "int64",
            id: 3
          }
        }
      },
      C2GSendRequest: {
        fields: {
          from: {
            type: "string",
            id: 1
          },
          group: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          ts: {
            type: "int64",
            id: 4
          },
          seq: {
            type: "int64",
            id: 5
          }
        }
      },
      C2GSendResponse: {
        fields: {
          msgId: {
            type: "int64",
            id: 1
          },
          ts: {
            type: "int64",
            id: 2
          },
          seq: {
            type: "int64",
            id: 3
          }
        }
      },
      C2GPushResponse: {
        fields: {
          msgId: {
            type: "int64",
            id: 1
          },
          ts: {
            type: "int64",
            id: 2
          },
          seq: {
            type: "int64",
            id: 3
          }
        }
      },
      C2SPullMessageRequest: {
        fields: {
          uid: {
            type: "string",
            id: 1
          },
          msgId: {
            type: "int64",
            id: 2
          },
          limit: {
            type: "int32",
            id: 3
          },
          ts: {
            type: "int64",
            id: 4
          },
          seq: {
            type: "int64",
            id: 5
          }
        }
      },
      PullMsg: {
        fields: {
          from: {
            type: "string",
            id: 1
          },
          group: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          msgId: {
            type: "int64",
            id: 4
          },
          sendTime: {
            type: "int64",
            id: 5
          },
          ts: {
            type: "int64",
            id: 6
          },
          seq: {
            type: "int64",
            id: 7
          }
        }
      },
      C2SPullMessageResponse: {
        fields: {
          msg: {
            rule: "repeated",
            type: "PullMsg",
            id: 1
          },
          ts: {
            type: "int64",
            id: 2
          },
          seq: {
            type: "int64",
            id: 3
          }
        }
      },
      KickOutRequest: {
        fields: {
          reason: {
            type: "int32",
            id: 1
          },
          ts: {
            type: "int64",
            id: 2
          },
          seq: {
            type: "int64",
            id: 3
          },
          uid: {
            type: "string",
            id: 4
          }
        },
        nested: {
          Reason: {
            values: {
              OTHER_LOGIN: 0
            }
          }
        }
      },
      KickOutResponse: {
        fields: {
          ts: {
            type: "int64",
            id: 1
          },
          seq: {
            type: "int64",
            id: 2
          }
        }
      },
      C2CPushRequest: {
        fields: {
          from: {
            type: "string",
            id: 1
          },
          to: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          msgId: {
            type: "int64",
            id: 4
          },
          ts: {
            type: "int64",
            id: 5
          },
          seq: {
            type: "int64",
            id: 6
          }
        }
      },
      C2GPushRequest: {
        fields: {
          from: {
            type: "string",
            id: 1
          },
          to: {
            type: "string",
            id: 2
          },
          group: {
            type: "string",
            id: 3
          },
          content: {
            type: "string",
            id: 4
          },
          msgId: {
            type: "int64",
            id: 5
          },
          ts: {
            type: "int64",
            id: 6
          },
          seq: {
            type: "int64",
            id: 7
          }
        }
      }
    }
  }
});

module.exports = $root;
