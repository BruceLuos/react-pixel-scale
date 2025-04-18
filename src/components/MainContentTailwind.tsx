import React from "react";

interface Tag {
  label: string;
  color: string;
}

interface MainContentTailwindProps {
  navLinksCount: number;
  columnsCount: number;
}

const MainContentTailwind: React.FC<MainContentTailwindProps> = ({
  navLinksCount,
  columnsCount,
}) => {
  const availableTags: Tag[] = [
    { label: "Lost", color: "#E2FBD7" },
    { label: "Designer", color: "#DAD7FE" },
    { label: "Columbus", color: "#FFF5CC" },
    { label: "Harare", color: "#CCF8FE" },
    { label: "Alexandria", color: "#FFF5CC" },
    { label: "Behance", color: "#DAD7FE" },
    { label: "Dogs", color: "#CCF8FE" },
  ];

  const titles: string[] = [
    "Melbourne",
    "Brisbane",
    "Helsinki",
    "Kathmandu",
    "Memphis",
    "Kuala Lumpur",
    "Bengaluru",
  ];

  const descriptions: string[] = [
    "Your business is in a continual battle for your customers recognition whether you know it or not.",
    "When you enter into any new area of science, you almost always find.",
    "Your business is in a continual battle for your customers recognition whether you know it or not.",
    "When you enter into any new area",
  ];

  const possibleDates: string[] = [
    "22 Sep 2020",
    "23 Sep 2020",
    "01 Jun 2021",
    "28 Apr 2021",
    "01 Apr 2021",
    "05 Jan 2021",
    "11 Feb 2021",
  ];

  const possibleTimes: string[] = [
    "02:52PM",
    "01:36AM",
    "06:58PM",
    "02:41PM",
    "06:20PM",
    "04:15AM",
  ];

  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const renderListItem = (index: number) => {
    const date = getRandomItem(possibleDates);
    const profilePic = `https://randomuser.me/api/portraits/women/${index}.jpg`;
    const time = getRandomItem(possibleTimes);
    const price = Math.round(Math.random() * 220) + 80;
    const formatPrice = `$${price}.00`;
    const priceColor =
      price < 100
        ? "text-red-500"
        : price < 200
        ? "text-blue-500"
        : "text-orange-500";

    return (
      <li
        className="flex items-center justify-between sv-py-20 border-b border-black/12 last:border-b-0"
        key={index}
      >
        <div className="w-[30%] flex items-center">
          <img className="sv-50 rounded-full" src={profilePic} alt="Profile" />
        </div>
        <div className="w-[30%] flex items-center">
          <h5 className="sv-text-18 text-black/72 font-normal">{date}</h5>
        </div>
        <div className="w-[30%] flex items-center">
          <h5 className="sv-text-18 text-black/72 font-normal">{time}</h5>
        </div>
        <div className="w-[30%] flex items-center justify-end">
          <h6 className={`sv-text-22 ${priceColor} w-full flex justify-end`}>
            {formatPrice}
          </h6>
        </div>
      </li>
    );
  };

  const renderFeedItem = (colIndex: number, itemIndex: number) => {
    let tags: Tag[] = availableTags.filter(() => Math.random() < 0.3);
    tags = tags.length ? tags : [availableTags[0]];
    const title = getRandomItem(titles);
    const paragraph = getRandomItem(descriptions);
    const isPoster = Math.random() < 0.5;

    return (
      <div
        className="relative sv-mb-50 sv-rounded-10 overflow-hidden bg-white"
        key={`${colIndex}-${itemIndex}`}
      >
        {isPoster && (
          <img
            className="absolute inset-0 w-full h-full object-cover z-[1]"
            src={`https://picsum.photos/200/${300 + colIndex + itemIndex}`}
            alt="Background"
          />
        )}
        <div
          className={`relative z-[2] sv-p-16 sv-px-20 ${
            isPoster ? "bg-black/30 text-white" : ""
          }`}
        >
          <ul className="flex flex-wrap">
            {tags.map((tag, idx) => (
              <li
                className="inline-block sv-mr-6 sv-mb-6 sv-px-10 sv-py-5 sv-rounded-4 sv-text-15 text-[#111] last:mr-0"
                key={idx}
                style={{ backgroundColor: tag.color }}
              >
                {tag.label}
              </li>
            ))}
          </ul>
          <h2 className="sv-text-40">{title}</h2>
          <p className="sv-text-16">{paragraph}</p>
          {!isPoster && (
            <button className="sv-mt-32 sv-text-20 text-[#4339F2] bg-transparent border-0">
              Detalies
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F2F2F2]">
      <nav className="fixed top-0 left-0 sv-w-96 h-screen bg-white sv-rounded-20 flex items-center flex-col">
        <div className="sv-h-80 border-b border-black/12 sv-mb-20 flex justify-center items-center w-full">
          <div className="sv-w-36 sv-h-36 rounded-full bg-black/12"></div>
        </div>
        <ul className="flex flex-col items-center">
          {Array(navLinksCount)
            .fill(null)
            .map((_, i) => (
              <li className="sv-mb-20" key={i}>
                <div className="sv-w-36 sv-h-36 rounded-full bg-black/12"></div>
              </li>
            ))}
        </ul>
      </nav>

      <main className="sv-pl-136 sv-pr-30 flex-1">
        <header className="flex justify-between items-center sv-py-18">
          <div className="flex items-center">
            <svg
              className="sv-w-36 sv-h-36 sv-mr-8 block"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 8C2 4.691 4.691 2 8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8ZM17.707 16.293L14.312 12.897C15.365 11.543 16 9.846 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16C9.846 16 11.543 15.365 12.897 14.312L16.293 17.707C16.488 17.902 16.744 18 17 18C17.256 18 17.512 17.902 17.707 17.707C18.098 17.316 18.098 16.684 17.707 16.293Z"
                fill="black"
              />
            </svg>
            <h5 className="sv-text-14 text-black/72">Search</h5>
          </div>

          <ul className="flex">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <li
                  key={i}
                  className={`relative sv-mr-9 last:mr-0 ${
                    i === 0
                      ? 'before:content-[""] before:absolute before:bottom-0 before:right-0 before:sv-w-12 before:sv-h-12 before:bg-[#34B53A] before:rounded-full'
                      : ""
                  }`}
                >
                  <div className="sv-w-44 sv-h-44 rounded-full overflow-hidden">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
              ))}
          </ul>
        </header>

        <div className="flex justify-between sv-mb-50">
          <div className="sv-w-692 bg-white sv-rounded-10 sv-py-5 sv-px-40">
            <h3 className="sv-text-22 sv-mb-12 font-normal text-black/72">
              Telescope
            </h3>
            <ul>
              {Array(3)
                .fill(null)
                .map((_, i) => renderListItem(i))}
            </ul>
          </div>

          <div className="sv-w-692 bg-white sv-rounded-10 sv-py-5 sv-px-40">
            <h3 className="sv-text-22 sv-mb-12 font-normal text-black/72">
              Asteroids
            </h3>
            <ul>
              {Array(3)
                .fill(null)
                .map((_, i) => renderListItem(i))}
            </ul>
          </div>
        </div>

        <div className="flex items-start justify-between">
          {Array(columnsCount)
            .fill(null)
            .map((_, colIndex) => {
              const itemsCount = 5 + Math.round(Math.random() * 4);
              return (
                <div
                  className="w-[calc(25%-40*(clamp(320px,100vw,3480px)/1600))]"
                  key={colIndex}
                >
                  {Array(itemsCount)
                    .fill(null)
                    .map((_, itemIndex) => renderFeedItem(colIndex, itemIndex))}
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default MainContentTailwind;
