import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams, Link, useMatch } from "react-router-dom"
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
// import {Helmet} from 'react-helmet'

interface RouteParams {
    coinId?: string;
}
interface RouteState{
    state:string
}

interface IData{
    info:{
        id: string;
        name: string;
        symbol: string;
        rank: number;
        is_new: boolean;
        is_active: boolean;
        type: string;
        logo: string;
        description: string;
        message: string;
        open_source: boolean;
        started_at: string;
        development_status: string;
        hardware_wallet: boolean;
        proof_type: string;
        org_structure: string;
        hash_algorithm: string;
        first_data_at: string;
        last_data_at: string;
    } | null,
    price:{
        id:string;
        name:string;
        symbol:string;
        rank:number;
        total_supply:number;
        max_supply:number;
        beta_value:number;
        first_data_at:string;
        last_updated:string;
        quotes:{
            USD:{
                ath_date:string;
                ath_price:number;
                market_cap:number;
                market_cap_change_24h :number;
                percent_change_1 :number;
                percent_change_1y : number;
                percent_change_ : number;
                percent_change_7 : number;
                percent_change_12 :number;
                percent_change_15 : number;
                percent_change_24h : number;
                percent_change_30d : number;
                percent_change_30 : number;
                percent_from_price_ath: number;
                price : number;
                volume_24h: number;
                volume_24h_change_24 :number;
            }
        }
    } | null
}
const Tabs = styled.div`
display:grid;
grid-template-columns:repeat(2,1fr);
margin:25px 0;
gap:10px;
`
const Tab = styled.span<{$IsActive:boolean}>`
text-align:center;
font-size:16px;
background-color:#000;
padding:7px 0;
border-radius:10px;
a{
display:block;
color:${props => props.$IsActive ? props.theme.accentColor : props.theme.textColor};
}
`
const Coin = () => {
    //router v6부턴 제네릭 지원 안함
    const { coinId } = useParams() as RouteParams;
    //Coins.tsx에서 Link로 넘어올때 받아올 데이터
    //Link가 클릭 될때 데이터가 넘어가기때문에 Coin으로 페이지를 바로 열경우엔(시크릿모드)에러가 나타남
    const { state } = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price")
    const chartMatch = useMatch("/:coinId/chart")
    // const [data,setData] = useState<IData>(
    //     {
    //         info:null,
    //         price:null
    //     }
    // );
    // useEffect(() => {
    //     (async () => {
    //       const infoData =  await(
    //         await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //     ).json()
    //     const priceData = await(
    //         await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //     ).json()
    //     setData({info:infoData,price:priceData})
    //     })()
    // },[])
    //.info? 이렇게 되는 이유는 API 호출전 빈값일 수 있기에 저렇게 작성함(옵셔널 체이닝)
    // console.log('data info',data.info?.development_status)
    const {isLoading :infoLoading ,data:infoData} = useQuery({ 
        queryKey:[`info, ${coinId}`],
        queryFn:() =>fetchCoinInfo(coinId),
    })
    const {isLoading:tickersLoading,data:tickersData} = useQuery({
        queryKey:[`tickers, ${coinId}`],
        queryFn:() =>fetchCoinTickers(coinId),
    })
    console.log('coin',infoData)
    return(
        <>
        {/* <Helmet>
            <title>
            {infoData?.name} 
            </title>
        </Helmet> */}
        <h1>{coinId}의 이름은 {infoData?.name}입니다</h1>
        <p></p>
        <Tabs>
            <Tab $IsActive ={chartMatch !== null}>
                <Link to={`/${coinId}/chart`} state={coinId}>chart</Link>
            </Tab>
            <Tab $IsActive = {priceMatch !== null}>
                <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
        </Tabs>
        <Outlet/>
        </>
    )
}
export default Coin