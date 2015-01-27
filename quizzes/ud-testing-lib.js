/*
Udacity's library for grading sites modified with DevTools.
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

function isMediaQuerySet(udArr) {
  var isCorrect = false;

  function getMQ(rulesList) {
    var studentMQ = rulesList.media["0"];
    return studentMQ;
  }

  function hasRelevantCSS(stdRules) {
    var correct = false;
    
    var numberOfNeededStyles = 0;

    // build an array of selectors to compare
    var udSelectors = [];
    for (a in udArr) {
      for (c in udArr[a].styles)
      udSelectors.push(udArr[a].styles[c].selector)
    // console.log(udArr)
      for (b in udArr[a].styles[c].styles) numberOfNeededStyles+=1;
    }

    console.log(numberOfNeededStyles)

    var rulesHit = 0;

    function isNeededSelector(stdSel) {
      var isHit = false;
      for (p in udSelectors) {
        if (udSelectors[p] === stdSel) {
          isHit = true;
        }
      }
      return isHit;
    }

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
    // console.log(mq, arr[0].mq)
    if (mq === udArr[0].mq) {
      mqValid = true;
      mqValid = hasRelevantCSS(rulez.cssRules) && mqValid;
    }
    // console.log("----> " + mqValid)
    return mqValid;
  }

  // iterating through document.styleSheets!!!
  var ss = document.styleSheets;
  var allTestResults = [];

  for (s in ss) {
    var cssRulesList = ss[s].cssRules;
    if (cssRulesList) {
      for (r in cssRulesList) {
        rulesList = cssRulesList[r];
        if (rulesList instanceof CSSMediaRule) {
          var mqCorrect = testMQValidity(rulesList);
          // console.log("---->" + mqCorrect);
          if (mqCorrect) break;
        }
      }
    }
  }
  return mqCorrect;
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
        testCorrect = isCorrect && testCorrect;
      }
      updateResultsDisplay({desc: arr[i].desc, correct: testCorrect})
    }
    if (isCorrect) {
      clearInterval(gradeLoop);
      displayCode(code);
    }
  }, 1000)
}