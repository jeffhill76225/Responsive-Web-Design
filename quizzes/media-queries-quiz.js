var tests = [
  {
    test: isMediaQuerySet,
    params: [
      {
        // max-width always comes before min-width!
        mq: "screen and (max-width: 400px)",
        styles: [
          {
            selector: "body",
            styles: [
              {
                property: "backgroundColor",
                value: "red"
              }
            ]
          }
        ]
      }
    ],
    desc: "Small breakpoint test."
  },
  {
    test: isMediaQuerySet,
    params: [
      {
        // max-width always comes before min-width!
        mq: "screen and (max-width: 401px) and (min-width: (599px)",
        styles: [
          {
            selector: "body",
            styles: [
              {
                property: "backgroundColor",
                value: "green"
              }
            ]
          }
        ]
      }
    ],
    desc: "Medium breakpoint test."
  },
  {
    test: isMediaQuerySet,
    params: [
      {
        // max-width always comes before min-width!
        mq: "screen and (min-width: 600px)",
        styles: [
          {
            selector: "body",
            styles: [
              {
                property: "backgroundColor",
                value: "blue"
              }
            ]
          }
        ]
      }
    ],
    desc: "Large breakpoint test."
  }
];
runGradeLoop(tests, "BREAKingbadPOINTS");