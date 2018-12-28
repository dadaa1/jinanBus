// padEnd处理汉字时有问题，汉字占据两个字节，导致视觉长度不一样
function padEnd(value, num) {
  let reg = /[\u4e00-\u9fa5]/g;
  const newValue = value.replace(reg, 'ab');
  const cnCharlength = newValue.length - value.length;
  return value.padEnd(num - cnCharlength);
}
module.exports = {
  padEnd
};
