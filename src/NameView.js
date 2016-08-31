'use strict';

function NameView($el) {
  this.$el = $el;
  this.setName();
}

NameView.prototype.re = /《([^/]+)\/([^》]+)》/;

NameView.prototype.setName = function () {
  if (!this.$el) {
    return;
  }

  var matchArray = this.$el.textContent.match(this.re);
  if (!matchArray || matchArray.length < 3) {
    return;
  }

  this.name = matchArray[2];
};

module.exports = NameView;
