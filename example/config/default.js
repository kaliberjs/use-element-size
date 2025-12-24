module.exports = {
  kaliber: {
    includeInServerCompilation: [
      /^@kaliber\/use-element-size/,
      /^@kaliber\/use-observed-ref/,
    ],
    /** @arg {Error} e */
    reportError(e) { console.error(e) }
  },
}
