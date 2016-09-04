'use strict';

function NameView($el) {
  this.$el = $el;
  this.setName();
}

NameView.prototype.re = /《([^/》]+)\/?([^》]*)》/;

NameView.prototype.setName = function () {
  var found = this.$el.textContent.match(this.re);
  if (!found) {
    return;
  }

  this.jaName = this.removeRuby(found[1]);
  this.enName = found[2];
};

NameView.prototype.removeRuby = function (name) {
  return name.replace(/\([^)]+\)/g, '');
};

module.exports = NameView;
