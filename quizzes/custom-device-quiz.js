var tests = [
  {
    test: isUACorrect,
    params: [
      "Mozilla/5.0 (Linux; Android 5.0; Nexus 6 Build/XXX00x) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.59 Mobile Safari/537.36"
    ],
    desc: "User Agent is set correctly."
  },
  {
    test: isViewportWidthCorrect,
    params: [
      412
    ],
    desc: "Viewport width is 412px."
  },
  {
    test: isViewportHeightCorrect,
    params: [
      603
    ],
    desc: "Viewport height is 603px."
  },
  {
    test: isDPRCorrect,
    params: [
      3.5
    ],
    desc: "Device Pixel Ratio is 3.5."
  }
]
runGradeLoop(tests, "timtheDEVTOOLmantaylor!");