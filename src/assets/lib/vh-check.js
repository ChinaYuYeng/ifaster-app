/**
 * 解决不同浏览器中100vh的计算差异，有的浏览器100vh不是可视化部分，包括浏览器工具栏
 */
(function(root, factory) {
  // eslint-disable-next-line no-undef
  if (typeof define === "function" && define.amd) {
    // eslint-disable-next-line no-undef
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.vhCheck = factory();
  }
})(this, function() {
  "use strict";

  function testVh() {
    // test with fixed
    var fixedTest = document.createElement("div");
    fixedTest.style.cssText = "position: fixed; top: 0; bottom: 0;";
    document.documentElement.insertBefore(fixedTest, document.documentElement.firstChild);
    // test with vh
    var vhTest = document.createElement("div");
    vhTest.style.cssText = "position: fixed; top: 0; height: 100vh";
    document.documentElement.insertBefore(vhTest, document.documentElement.firstChild);
    // in iOS vh will be bigger
    var topBottom = fixedTest.offsetHeight;
    var vh = vhTest.offsetHeight;
    var offset = vh - topBottom;
    // clean
    document.documentElement.removeChild(fixedTest);
    document.documentElement.removeChild(vhTest);
    return offset;
  }

  function updateCssVar(cssVarName, offset) {
    document.documentElement.style.setProperty("--" + cssVarName, offset + "px");
  }

  return function vhCheck(cssVarName) {
    // configurable CSS var
    cssVarName = typeof cssVarName === "string" ? cssVarName : "vh-offset";
    var offset = testVh();
    // usefullness check
    if (!offset) return false;
    updateCssVar(cssVarName, offset);
    // Listen for orientation changes
    window.addEventListener(
      "orientationchange",
      function() {
        var newOffset = testVh();
        updateCssVar(cssVarName, newOffset);
      },
      false
    );
    return true;
  };
});
