const fs = require("fs")
const path = require("path")

// Function to fix Windows paths in a file
function fixWindowsPaths(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8")

    // Replace Windows backslashes with forward slashes
    content = content.replace(/\\/g, "/")

    fs.writeFileSync(filePath, content, "utf8")
    console.log(`Fixed paths in ${filePath}`)
  } else {
    console.log(`File not found: ${filePath}`)
  }
}

// Fix paths in the edge function handler
const edgeFunctionHandlerPath = path.join(__dirname, "../node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js")

fixWindowsPaths(edgeFunctionHandlerPath)

