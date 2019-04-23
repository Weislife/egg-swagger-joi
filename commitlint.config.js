'use strict';

module.exports = {
  rules: {
    'body-leading-blank': [ 1, 'always' ],
    'footer-leading-blank': [ 1, 'always' ],
    'header-max-length': [ 2, 'always', 72 ],
    'scope-case': [ 2, 'always', 'lower-case' ],
    'subject-case': [
      2,
      'never',
      [ 'sentence-case', 'start-case', 'pascal-case', 'upper-case' ],
    ],
    'subject-empty': [ 2, 'never' ],
    'subject-full-stop': [ 2, 'never', '.' ],
    'type-case': [ 2, 'always', 'lower-case' ],
    'type-empty': [ 2, 'never' ],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复问题
        'docs', // 修改文档
        'style', // 修改代码格式，不影响代码逻辑
        'refactor', // 重构代码，理论上不影响现有功能
        'perf', // 提升性能
        'test', // 增加修改测试用例
        'chore', // 修改工具相关（包括但不限于文档、代码生成等）
        'deps', //  升级依赖
      ],
    ],
  },
};
