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

在tailwind css v4中设置
目前暂不支持自定义值，需要先预设（后续再调整）
```css
@import "tailwindcss";

:root {
  --min-viewport: 320px;
  --max-viewport: 3480px;
  --ideal-viewport: 1600;
  --scale-ratio: calc(clamp(var(--min-viewport), 100vw, var(--max-viewport)) / var(--ideal-viewport));
}

@layer utilities {
  /* 动态计算的基础选择器 */
  [class*="sv-w-"] {
    width: calc(var(--sv-width, 0) * var(--scale-ratio));
  }

  [class*="sv-h-"] {
    height: calc(var(--sv-height, 0) * var(--scale-ratio));
  }

  [class*="sv-text-"] {
    font-size: calc(var(--sv-font-size, 0) * var(--scale-ratio));
  }

  [class*="sv-mt-"] {
    margin-top: calc(var(--sv-margin-top, 0) * var(--scale-ratio));
  }

  [class*="sv-mb-"] {
    margin-bottom: calc(var(--sv-margin-bottom, 0) * var(--scale-ratio));
  }

  [class*="sv-mr-"] {
    margin-right: calc(var(--sv-margin-right, 0) * var(--scale-ratio));
  }

  [class*="sv-p-"] {
    padding: calc(var(--sv-padding, 0) * var(--scale-ratio));
  }

  [class*="sv-px-"] {
    padding-left: calc(var(--sv-padding-x, 0) * var(--scale-ratio));
    padding-right: calc(var(--sv-padding-x, 0) * var(--scale-ratio));
  }

  [class*="sv-py-"] {
    padding-top: calc(var(--sv-padding-y, 0) * var(--scale-ratio));
    padding-bottom: calc(var(--sv-padding-y, 0) * var(--scale-ratio));
  }

  [class*="sv-pl-"] {
    padding-left: calc(var(--sv-padding-left, 0) * var(--scale-ratio));
  }

  [class*="sv-pr-"] {
    padding-right: calc(var(--sv-padding-right, 0) * var(--scale-ratio));
  }

  [class*="sv-rounded-"] {
    border-radius: calc(var(--sv-radius, 0) * var(--scale-ratio));
  }

  /* 预设值 - 宽度 */
  .sv-w-692 { --sv-width: 692; }
  .sv-w-96 { --sv-width: 96; }
  .sv-w-50 { --sv-width: 50; }
  .sv-w-44 { --sv-width: 44; }
  .sv-w-36 { --sv-width: 36; }
  .sv-w-12 { --sv-width: 12; }

  /* 预设值 - 高度 */
  .sv-h-80 { --sv-height: 80; }
  .sv-h-50 { --sv-height: 50; }
  .sv-h-44 { --sv-height: 44; }
  .sv-h-36 { --sv-height: 36; }
  .sv-h-12 { --sv-height: 12; }

  /* 预设值 - 字体大小 */
  .sv-text-40 { --sv-font-size: 40; }
  .sv-text-22 { --sv-font-size: 22; }
  .sv-text-20 { --sv-font-size: 20; }
  .sv-text-18 { --sv-font-size: 18; }
  .sv-text-16 { --sv-font-size: 16; }
  .sv-text-15 { --sv-font-size: 15; }
  .sv-text-14 { --sv-font-size: 14; }

  /* 预设值 - 边距 */
  .sv-mt-32 { --sv-margin-top: 32; }
  .sv-mb-50 { --sv-margin-bottom: 50; }
  .sv-mb-32 { --sv-margin-bottom: 32; }
  .sv-mb-20 { --sv-margin-bottom: 20; }
  .sv-mb-12 { --sv-margin-bottom: 12; }
  .sv-mb-6 { --sv-margin-bottom: 6; }
  .sv-mr-9 { --sv-margin-right: 9; }
  .sv-mr-8 { --sv-margin-right: 8; }
  .sv-mr-6 { --sv-margin-right: 6; }

  /* 预设值 - 内边距 */
  .sv-p-20 { --sv-padding: 20; }
  .sv-p-16 { --sv-padding: 16; }
  .sv-px-40 { --sv-padding-x: 40; }
  .sv-px-10 { --sv-padding-x: 10; }
  .sv-py-20 { --sv-padding-y: 20; }
  .sv-py-5 { --sv-padding-y: 5; }
  .sv-pl-136 { --sv-padding-left: 136; }
  .sv-pr-30 { --sv-padding-right: 30; }

  /* 预设值 - 圆角 */
  .sv-rounded-20 { --sv-radius: 20; }
  .sv-rounded-10 { --sv-radius: 10; }
  .sv-rounded-4 { --sv-radius: 4; }

  /* 同时设置宽高的特殊情况 */
  .sv-50 {
    --sv-width: 50;
    --sv-height: 50;
    width: calc(var(--sv-width) * var(--scale-ratio));
    height: calc(var(--sv-height) * var(--scale-ratio));
  }
}
```



### Tailwind Css v4 参考
https://www.youtube.com/watch?v=6biMWgD6_JY
https://tailwindcss.com/docs/theme
