
module.exports = function(from, to, context, options){
    let item = ""
    for (var i = from, j = to; i < j; i++){
      item = item + options.fn(context[i]);
    }
    return item;
  }