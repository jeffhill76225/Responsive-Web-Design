var tests = [
  {
    test: testMediaQueries,
    params: [
      {
        width: "399px",
        styles: [
          {
            selector: "body",
            css: [
              {
                property: "backgroundColor",
                value: "rgb(255, 0, 0)"
              }
            ]
          }
        ]
      }
    ],
    desc: "Under 400px wide, the body is red."
  },
  {
    test: testMediaQueries,
    params: [
      {
        width: "450px",
        styles: [
          {
            selector: "body",
            css: [
              {
                property: "backgroundColor",
                value: "rgb(0, 128, 0)"
              }
            ]
          }
        ]
      }
    ],
    desc: "Between 401 and 599px wide, the body is green."
  },
  {
    test: testMediaQueries,
    params: [
      {
        width: "650px",
        styles: [
          {
            selector: "body",
            css: [
              {
                property: "backgroundColor",
                value: "rgb(0, 0, 255)"
              }
            ]
          }
        ]
      }
    ],
    desc: "Greater than 600px wide, the body is blue."
  }
];
window.onload = function() {runGradeLoop(tests, "BREAKingbadPOINTS")};