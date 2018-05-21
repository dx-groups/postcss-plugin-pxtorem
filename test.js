let dpxRegx = /(\d+)(dpx)([\s]+|[;]|$)/;
let a = '1222dpx ss'
a.replace(dpxRegx, function() {
  console.log(arguments)
})
