import React from "react";
import "./Example.scss";

const Example: React.FC = () => {
  return (
    <div className="example-component">
      <h2 className="example-title">使用SCSS和Tailwind CSS示例</h2>

      {/* 使用SCSS样式 */}
      <div className="scss-section">
        <h3>SCSS样式示例</h3>
        <button className="scss-button">SCSS按钮</button>
      </div>

      {/* 使用Tailwind CSS样式 */}
      <div className="mt-6 p-4 bg-blue-100 rounded-lg">
        <h3 className="text-xl font-bold text-blue-800">
          Tailwind CSS样式示例
        </h3>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">
          Tailwind按钮
        </button>
      </div>

      {/* 混合使用 */}
      <div className="mixed-section mt-6">
        <h3 className="text-xl text-green-800">混合使用示例</h3>
        <button className="mixed-button hover:scale-105 transition-transform">
          混合样式按钮
        </button>
      </div>
    </div>
  );
};

export default Example;
