'use strict';

function NameView($el) {
  this.$el = $el;
  this.setName();
}

NameView.prototype.re = /《([^/]+)\/([^》]+)》/;

NameView.prototype.setName = function () {
  var found = this.$el.textContent.match(this.re);
  if (!found || found.length < 3) {
    return;
  }

  this.name = found[2];
};

module.exports = NameView;
