import "./App.scss";
import MainContent from "./components/MainContent";
import MainContentTailwind from "./components/MainContentTailwind";

function App() {
  const navLinksCount = 6;
  const columnsCount = 4;

  return (
    <>
      <MainContent navLinksCount={navLinksCount} columnsCount={columnsCount} />
      <MainContentTailwind
        navLinksCount={navLinksCount}
        columnsCount={columnsCount}
      />
    </>
  );
}

export default App;
