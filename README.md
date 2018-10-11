# comti-wx


>首页显示地图，点击图标跳转对应功能及栏目
>主要实现充电功能


## 体验步骤
### 1. 安装 wepy
本项目基于wepy开发，[参考这里](https://github.com/wepyjs/wepy)
```bash
npm install -g wepy-cli
```

### 2. 安装开发依赖
```bash
npm install
```

### 3. 编译源代码
```bash
npm run dev
```

### 4.导入至开发者工具

编译完成生成`dist`目录后，开发者工具本地开发目录指向项目根目录。

### 5.错误提示

如果出现util的错误，请先安装util,然后再更新wepy
```bash
npm install util
```
```bash
wepy upgrade wepy
```
