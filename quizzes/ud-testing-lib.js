/*
Udacity's library for grading sites modified with DevTools.

Cameron Pittman
*/

// this is pretty useful
function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var k = obj.length >>> 0; k--;) { 
    array[k] = obj[k];
  }
  return array;
}

function isViewportSet() {
  var hasRightMeta = false;
  var correctViewportContent = 'width=device-width,initial-scale=1.0';
  var metas = document.querySelectorAll('meta');
  metas = toArray(metas);
  metas.forEach(function(val) {
    var content, name;
    try {
      content = val.getAttribute('content').replace(' ', '');
      name = val.getAttribute('name');
    } catch (e) {
      content = "";
      name = "";
    }
    if (name === 'viewport' && content === correctViewportContent) {
      hasRightMeta = true;
    }
  })
  return hasRightMeta;
}

function isViewportWidthCorrect(expected) {
  var isCorrect = false;
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  width === expected[0] ? isCorrect = true : isCorrect = false;
  console.log("width: " + isCorrect);
  return isCorrect;
}

function isViewportHeightCorrect(expected) {
  var isCorrect = false;
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  height === expected[0] ? isCorrect = true : isCorrect = false;
  console.log("height: " + isCorrect);
  return isCorrect;
}

function isMediaQuerySet(udArr) {
  var isCorrect = false;

  function getMQ(rulesList) {
    var studentMQ = rulesList.media["0"];
    return studentMQ;
  }

  function hasRelevantCSS(stdRules) {
    var correct = false;
    var rulesHit = 0;
    var numberOfNeededStyles = 0;
    var udSelectors = [];
    for (a in udArr) {
      for (c in udArr[a].styles)
      udSelectors.push(udArr[a].styles[c].selector)
      for (b in udArr[a].styles[c].styles) numberOfNeededStyles+=1;
    }
    function isNeededSelector(stdSel) {
      var isHit = false;
      for (p in udSelectors) {
        if (udSelectors[p] === stdSel) {
          isHit = true;
        }
      }
      return isHit;
    }
    // remind me to never, ever, ever do this again.
    for (j in stdRules) {
      if (isNeededSelector(stdRules[j].selectorText)) {
        for (u in udArr) {
          for (v in udArr[u].styles) {
            var sel = udArr[u].styles[v].selector;
            if (sel === stdRules[j].selectorText) {
              for (z in udArr[u].styles[v].styles) {
                var prop = udArr[u].styles[v].styles[z].property;
                var val = udArr[u].styles[v].styles[z].value;
                if (stdRules[j].style[prop] === val) {
                  rulesHit+=1;
                }
              }
            }
          }
        }
      }
    }
    if (rulesHit === numberOfNeededStyles && rulesHit > 0) correct = true;
    return correct;
  }

  function testMQValidity(rulez) {
    var mqValid = false;

    var mq = getMQ(rulez);
    if (mq === udArr[0].mq) {
      mqValid = true;
      mqValid = hasRelevantCSS(rulez.cssRules) && mqValid;
    }
    return mqValid;
  }

  var ss = document.styleSheets;
  var allTestResults = [];

  for (s in ss) {
    var cssRulesList = ss[s].cssRules;
    if (cssRulesList) {
      for (r in cssRulesList) {
        rulesList = cssRulesList[r];
        if (rulesList instanceof CSSMediaRule) {
          var mqCorrect = testMQValidity(rulesList);
          if (mqCorrect) break;
        }
      }
    }
  }
  return mqCorrect;
}

function isDPRCorrect(expected) {
  var isCorrect = false;
  var dpr = window.devicePixelRatio;
  dpr === expected[0] ? isCorrect = true : isCorrect = false;
  console.log("dpr: " + isCorrect);
  return isCorrect;
}

function isUACorrect(expected) {
  var isCorrect = false;
  var ua = window.navigator.userAgent;
  ua === expected[0] ? isCorrect = true : isCorrect = false;
  console.log("ua: " + isCorrect);
  return isCorrect;
}

function updateResultsDisplay(test) {
  // console.log(test.correct);
}

function displayCode(code) {
  alert("You got it! Here's your code: " + code);
}

function runGradeLoop(arr, code) {
  var isCorrect = false;

  var gradeLoop = setInterval(function() {
    for (i in arr) {
      var testCorrect = arr[i].test(arr[i].params);
      if (arr.indexOf(arr[i]) === 0) {
        isCorrect = testCorrect;
      } else {
        isCorrect = isCorrect && testCorrect;
      }
      updateResultsDisplay({desc: arr[i].desc, correct: testCorrect})
    }
    if (isCorrect) {
      clearInterval(gradeLoop);
      displayCode(code);
    }
  }, 1000)
}