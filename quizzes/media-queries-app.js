(function(window) {
  function objectLoop(object, callback) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        callback(key, object[key]);
      }
    }
  }

  var tests = {
    "ud-small": {
      passed: false,
      width: "399px",
      css: {
        value: "rgb(255, 0, 0)"
      }
    },
    "ud-medium": {
      passed: false,
      width: "450px",
      css: {
        value: "rgb(0, 128, 0)"
      }
    },
    "ud-large": {
      passed: false,
      width: "650px",
      css: {
        value: "rgb(0, 0, 255)"
      }
    }
  };

  var iframeElem = null;
  var contentCopy = '';
  var oldStyles = '';
  var styles = '';

  function getStyles() {
    styles = document.head.querySelector('style').innerHTML;
  }

  function generateIframeContent(size) {
    return new Promise(function(resolve, reject) {
      var content = document.body.querySelector('.container').innerHTML;
      contentCopy = '<style>' + styles + '</style>' + content + '<script>var s = window.getComputedStyle(document.body); var color = s.backgroundColor; parent.window.giveIframeValue("' + size + '", color);</script>';
      resolve();
    })
  }

  function createIframe() {
    return new Promise(function(resolve, reject) {
      iframeElem = document.querySelector('iframe.mq-test') || iframeElem;

      if (!iframeElem) {
        iframeElem = document.createElement('iframe');
        iframeElem.classList.add('mq-test');
        document.body.appendChild(iframeElem);
        iframeElem.style.position = 'absolute';
        iframeElem.style.left = '100%';
        iframeElem.srcdoc = '';
      }
      resolve();
    });
  }

  function setIframeWidth(width) {
    return new Promise(function(resolve, reject) {
      iframeElem.style.width = width;
      // TODO: find a less janky way to force layout? 
      if (iframeElem.contentWindow.innerWidth === "") {
        console.log(iframeElem.contentWindow.innerWidth);
      }
      if (iframeElem.style.width === width) {
        resolve();
      } else {
        reject('iFrame width not set');
      }
    });
  }

  function addContentToIframe(size) {
    return new Promise(function(resolve, reject) {
      window.giveIframeValue = function(size, value) {
        if (!size || !value) {
          reject();
        } else{
          resolve({size: size, value: value});
        }
      };
      iframeElem.srcdoc = contentCopy;
    });
  }

  function reportResults(report) {
    return new Promise(function(resolve, reject) {
      if (!report) {
        // whatevs, don't worry about it
        resolve();
      }
      var size = report.size;
      var studentValue = report.value;

      var hasCorrectStyle = false;

      if (studentValue === tests[size].css.value) {
        hasCorrectStyle = true;
      }

      if (hasCorrectStyle) {
        switch(size) {
          case 'ud-small':
            tests[size].passed = true;
            break;
          case 'ud-medium':
            tests[size].passed = true;
            break;
          case 'ud-large':
            tests[size].passed = true;
            break;
          default:
            break;
        }
        window.dispatchEvent(new CustomEvent(size, {'detail': 'passed'}));
      }
      resolve();
    });
  }

  var interval = window.setInterval(function() {
    var sequence = Promise.resolve();

    var running = false;

    getStyles();

    if (styles !== oldStyles) {
      oldStyles = styles;
    } else {
      // css hasn't changed so no need for evaluating
      return;
    }

    objectLoop(tests, function(size, value) {
      if (!value.passed) {
        running = true;
        
        sequence = sequence
        .then(createIframe)
        .then(function() {
          return setIframeWidth(value.width);
        })
        .then(function() {
          return generateIframeContent(size);
        })
        .then(function() {
          return addContentToIframe(size);
        })
        .then(reportResults)
        .catch(function(e) {
          throw e;
        });
      }
    });

    if (!running) {
      window.clearInterval(interval);
    }

  }, 1000);
})(window);