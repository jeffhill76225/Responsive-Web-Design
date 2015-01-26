/*
Udacity's library for grading sites modified with DevTools.
*/

// this is pretty useful
function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) { 
    array[i] = obj[i];
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
      var testCorrect = arr[i].test();
      if (arr.indexOf(arr[i]) === 0) {
        isCorrect = testCorrect;
      } else {
        testCorrect = isCorrect && testCorrect;
      }
      updateResultsDisplay({desc: arr[i], correct: testCorrect})
    }
    if (isCorrect) {
      clearInterval(gradeLoop);
      displayCode(code);
    }
  }, 1000)
}