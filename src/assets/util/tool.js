//文件路径处理.和..的情况
export const parseFilePath = function(path) {
  const paths = path.split("/");
  let stack = [];
  for (let i = 0; i < paths.length; i++) {
    if (paths[i] === "..") {
      stack.pop();
      continue;
    } else if (paths[i] === ".") {
      continue;
    }
    stack.push(paths[i]);
  }
  return stack.join("/").trim();
};
