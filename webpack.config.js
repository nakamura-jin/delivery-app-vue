const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
    "entry": "index.js",
    /* ... */
    plugins: [
      new GoogleFontsPlugin({
        fonts: [
          { family: "Source Sans Pro" },
          { family: "Roboto", variants: ["400", "700italic"] },
          { family: "Source Code Pro", monospace },
          { family: "M PLUS Rounded 1c" },
          { family: 'Source Code Pro', monospace }
           /*ここにフォントを追加していく．もちろん上のRobotoとSourse sans proは消してよい*/
            ]
            /* ...options */
        })
    ]
}