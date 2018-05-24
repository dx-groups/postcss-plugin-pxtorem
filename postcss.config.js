module.exports = {
  plugins: [
    require('./src')({
      // prevName: 'test-data'
      maxDpr: 5,
      delete: false
    })
  ]
}
