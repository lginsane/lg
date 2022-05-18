// prettier 所有配置项, 请参阅 https://prettier.io/docs/en/options.html
module.exports = {
    // 一行的字符数，如果超过会进行换行，默认为 80
    printWidth: 100,
    // tab 缩进大小,默认为 2
    tabWidth: 2,
    // 是否使用 tab 缩进，默认 false
    useTabs: false,
    // 是否使用分号结尾, 默认 true
    semi: false,
    // vue 文件 script 和 style 标签缩进, 默认false
    vueIndentScriptAndStyle: true,
    // 使用单引号，默认 false 使用双引号
    singleQuote: true,
    /**
     * 行尾逗号,默认 es5 ,可选 none|es5|all
     * es5 包括 es5 中的数组、对象
     * none 没有后面逗号
     * all 包括函数对象等所有可选
     */
    trailingComma: "none",
    /**
   * 箭头函数参数括号 默认avoid 可选 avoid| always
   * avoid 能省略括号的时候就省略 例如x => x
   * always 总是有括号
   */
    arrowParens: 'avoid'
};
