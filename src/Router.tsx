import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Chart from "./Routes/Chart";
import Coins from "./Routes/Coins";
import Price from "./Routes/Price";
import Coin from "./Routes/Coin";
import Root from "./Root";
const basename = process.env.PUBLIC_URL;


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />, 
      children: [
        {
          path: "",
          element: <Coins />,
        },
        {
          path: ":coinId",
          element: <Coin />,
          children: [
            {
              path: "chart",
              element: <Chart />,
            },
            {
              path: "price",
              element: <Price />,
            },
          ],
        },
      ],
      
    },
    
  ],{basename: basename});
export default router;
