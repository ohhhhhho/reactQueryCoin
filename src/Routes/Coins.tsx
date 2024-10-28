import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    background-color:${props => props.theme.bgColor};
    display:flex;
    align-items:center;
    justify-content:center;
`
const CoinList = styled.ul`
    width
    max-width:500px;
    margin:0 auto;
`
const Coin = styled.li`
    background-color:#fff;
    width:100%;
    padding:10px;
    border-radius:5px;
    margin-bottom:10px;
    color:${props => props.theme.bgColor}
    a{
        display:block;
    }
`
interface CoinInterface{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
const Coins = () => {
    //useQuery는 두개의 인자가 필요(쿼리 키, 쿼리 함수)
    const { isLoading, data } = useQuery<CoinInterface[]>({
        queryKey: ["allCoins"],
        queryFn: fetchCoins,
        select: data => data.slice(0, 100)
        });    
        //useRecoilState은 value를 수정
        const [isDark, setterFn] = useRecoilState(isDarkAtom);
        const toggleDarkMode = () =>setterFn((pre) => !pre)
    return(
        <>
        {isLoading ? "Loading..." : 
        <>
        <button onClick={toggleDarkMode}>Toggle Mode</button>
        <Container>
            <CoinList>
                {data?.map((item) => (
                    <Coin key={item.id}>
                        <Link to={`/${item.id}`} state={item.name}>{item.name}</Link>
                    </Coin>
                ))}
                <Coin/>
            </CoinList>
        </Container>
        </>
        }
        </>
    )
}

export default Coins