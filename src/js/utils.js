'use strict';

var Utils = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  /*
      in:  123, 5
      out: "00123"
  */
  addLeadingZeros: function(value, numDigits) {
    var strValue = value.toString();

    while (strValue.length < numDigits) {
      strValue = '0' + strValue;
    }

    return strValue;
  }

};

module.exports = Utils;