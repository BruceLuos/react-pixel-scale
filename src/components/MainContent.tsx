import React from "react";
import "./MainContent.scss";

interface Tag {
  label: string;
  color: string;
}

interface MainContentProps {
  navLinksCount: number;
  columnsCount: number;
}

const MainContent: React.FC<MainContentProps> = ({
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
    const priceColor = price < 100 ? "red" : price < 200 ? "blue" : "orange";

    return (
      <li className="listItem" key={index}>
        <div className="listCell">
          <img className="listProfilePic" src={profilePic} alt="Profile" />
        </div>
        <div className="listCell">
          <h5 className="listTime">{date}</h5>
        </div>
        <div className="listCell">
          <h5 className="listTime">{time}</h5>
        </div>
        <div className="listCell">
          <h6 className="listPrice" style={{ color: priceColor }}>
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
      <div className="feedItem" key={`${colIndex}-${itemIndex}`}>
        {isPoster && (
          <img
            className="feedItemBG"
            src={`https://picsum.photos/200/${300 + colIndex + itemIndex}`}
            alt="Background"
          />
        )}
        <div className={`feedWrapper ${isPoster ? "hasBackground" : ""}`}>
          <ul
            className="feedTags"
            style={
              {
                "--ref-margin-bottom": `${
                  isPoster ? 100 + Math.random() * 60 : 42
                }px`,
              } as React.CSSProperties
            }
          >
            {tags.map((tag, idx) => (
              <li
                className="feedTag"
                key={idx}
                style={{ background: tag.color }}
              >
                {tag.label}
              </li>
            ))}
          </ul>
          <h2 className="feedTitle">{title}</h2>
          <p className="feedDesc">{paragraph}</p>
          {!isPoster && <button className="feedButton">Detalies</button>}
        </div>
      </div>
    );
  };

  return (
    <div className="root">
      <nav className="nav">
        <div className="navTop">
          <div className="circle"></div>
        </div>
        <ul className="links">
          {Array(navLinksCount)
            .fill(null)
            .map((_, i) => (
              <li className="navLink" key={i}>
                <div className="circle"></div>
              </li>
            ))}
        </ul>
      </nav>

      <main className="main">
        <header className="header">
          <div className="searchBar">
            <svg
              className="searchIcon"
              width="18"
              height="18"
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
            <h5 className="searchTitle">Search</h5>
          </div>

          <ul className="profileSwitcher">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <li
                  key={i}
                  className={`profileWrapper ${i === 0 ? "activeProfile" : ""}`}
                >
                  <div className="profile">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                      alt="Profile"
                    />
                  </div>
                </li>
              ))}
          </ul>
        </header>

        <div className="listWrapper">
          <div className="listContainer">
            <h3 className="listHeading">Telescope</h3>
            <ul className="list">
              {Array(3)
                .fill(null)
                .map((_, i) => renderListItem(i))}
            </ul>
          </div>

          <div className="listContainer">
            <h3 className="listHeading">Asteroids</h3>
            <ul className="list">
              {Array(3)
                .fill(null)
                .map((_, i) => renderListItem(i))}
            </ul>
          </div>
        </div>

        <div className="columnsWrapper">
          {Array(columnsCount)
            .fill(null)
            .map((_, colIndex) => {
              const itemsCount = 5 + Math.round(Math.random() * 4);
              return (
                <div className="column" key={colIndex}>
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

export default MainContent;
