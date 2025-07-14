import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Button } from "@mui/material";
import ShortenerForm from "./components/ShortenerForm";
import StatisticsPage from "./components/StatisticsPage";
import RedirectHandler from "./routes/RedirectHandler";

function App() {
    const [urls, setUrls] = useState([]);
    const updateClick = (shortcode, click) => {
      setUrls((prev) =>
        prev.map((u) =>
          u.shortcode === shortcode ? { ...u, clicks: [...u.clicks, click] } : u
        )
      );
    };


    return (
        <Router>
          <Container>
            <Button component={Link} to="/">Home</Button>{" "}
            <Button component={Link} to="/stats">Statistics</Button>
            <Routes>
              <Route path ="/" element={<ShortenerForm urls={urls} setUrls={setUrls} />} />
              <Route path="/stats" element={<StatisticsPage urls={urls} />} />
              <Route path="/:shortcode" element={<RedirectHandler updateClick={updateClick}/>} />
            </Routes>
          </Container>
        </Router>
    )
}

export default App
