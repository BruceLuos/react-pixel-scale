
const ScaledDemo = () => {
  return (
    <div className="my-8">
      <h1 className="sv-text-40 font-bold mb-4">Scaled Value Demo</h1>

      <div className="sv-w-692 sv-p-20 bg-white sv-rounded-10">
        <h2 className="sv-text-22 sv-mb-12 font-normal text-black/70">
          List Heading
        </h2>

        <div className="flex items-center justify-between sv-py-20 border-b border-black/10">
          <div className="sv-w-50 sv-h-50 bg-gray-200 rounded-full"></div>
          <span className="sv-text-18 text-black/70">2:30 PM</span>
          <span className="sv-text-22">¥1200</span>
        </div>

        <div className="flex items-center justify-between sv-py-20">
          <div className="sv-w-50 sv-h-50 bg-gray-200 rounded-full"></div>
          <span className="sv-text-18 text-black/70">4:15 PM</span>
          <span className="sv-text-22">¥800</span>
        </div>
      </div>

      <div className="sv-mt-32">
        <button className="sv-text-20 text-blue-600 bg-transparent border-none">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ScaledDemo;
