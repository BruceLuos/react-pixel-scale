# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
### 像素级完美还原一个可缩放的 UI 界面

主要通过calc, clamp来实现基于设计稿比例的响应式布局，元素尺寸会根据视口宽度按比例缩放，同时限制了最小和最大缩放范围。
可取代rem适配，vw适配方案
目前缺点是浏览器对api的支持程度，以及代码变得更冗余

```scss
  /* 理想视窗宽度，就是设计稿宽度 */ 
  --ideal-viewport-width: 1600;
  
  /** 
* @param {Number} $value - 理想尺寸基数，不带任何单位，设计稿对应的元素尺寸值，eg 设计稿元素宽度是500，$value = 500 
* @param {Number} $idealViewportWidth - 理想视窗宽度基数，不带单位，设计稿的宽度 
* @param {String} $min - 最小视窗宽度 * @param {String} $max - 最大视窗宽度 
**/ 

@function scaleValue($value, $idealViewportWidth: 1600, $min: 320px, $max: 3480px) { 
 @return calc( #{$value} * (clamp(#{$min}, 100vw, #{$max}) / #{$idealViewportWidth})); 
}
```

在tailwind css使用的一些配置

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      // 定义理想视窗宽度
      variables: {
        '--ideal-viewport-width': '1600',
      }
    },
  },
  plugins: [
    // 创建scaleValue插件
    plugin(function({ addUtilities, theme, e }) {
      // 生成缩放工具类
      const scaleUtilities = {}
      
      // 生成一些常用尺寸的缩放类
      const sizes = Array.from({ length: 200 }, (_, i) => i + 1) // 1-200的尺寸
      
      sizes.forEach(size => {
        const className = `.scale-${size}`
        scaleUtilities[className] = {
          // 计算方式与SCSS中的scaleValue相同
          width: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
          height: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
        }
        
        // 添加单独的宽度和高度类
        scaleUtilities[`.scale-w-${size}`] = {
          width: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
        }
        
        scaleUtilities[`.scale-h-${size}`] = {
          height: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
        }
        
        // 添加内边距/外边距类
        scaleUtilities[`.scale-p-${size}`] = {
          padding: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
        }
        
        scaleUtilities[`.scale-m-${size}`] = {
          margin: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
        }
        
        // 字体大小
        scaleUtilities[`.scale-text-${size}`] = {
          fontSize: `calc(${size}px * (clamp(320px, 100vw, 3480px) / var(--ideal-viewport-width)))`,
        }
      })
      
      addUtilities(scaleUtilities)
    }),
    
    // 添加CSS变量
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          '--ideal-viewport-width': theme('variables.--ideal-viewport-width'),
        }
      })
    })
  ],
}

```

```html
<!-- 原SCSS: width: #{scaleValue(44)}; -->
<div class="scale-w-44 scale-h-44 rounded-full overflow-hidden"></div>

<!-- 原SCSS: font-size: #{scaleValue(16)}; -->
<p class="scale-text-16">文本内容</p>

<!-- 原SCSS: padding: #{scaleValue(16)} #{scaleValue(20)}; -->
<div class="scale-p-16 scale-px-20">内容区域</div>

```
