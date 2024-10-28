import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { fetchCoinHistory } from "../api"
import ReactApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil"
import { isDarkAtom } from "../atoms"

interface ChartState{
    state:string
}
interface IData{
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}
function Chart(){
    const {state} = useLocation() as ChartState
    const {isLoading,data} = useQuery<IData[]>({
        queryKey:['coinInfoHistory',state],
        queryFn:() => fetchCoinHistory(state),
        //5초마다 refetch
        refetchInterval:5000
    })
    console.log('ChartChart',data)
    const isDark = useRecoilValue(isDarkAtom);
    return(
        <>
            <div>{isLoading ? "Loading..." : 
                <ReactApexChart type="line" 
                series={[
                    {   
                        name:"price",
                        //옵셔널 체이닝 (?)에 의해 data가 undefined일 경우 빈 문자열 반환
                        data:data?.map( i => Number(i.close)) ?? []
                    }
                ]} 
                options={{
                    theme:{
                        mode:isDark?"dark":"light"
                    },
                    chart:{
                    height:300,
                    width:300,
                    toolbar:{
                        show:false
                        },
                    background:"transparent"
                    },
                    grid:{
                        show:false
                    },
                    yaxis:{
                        show:false
                    },
                    xaxis:{
                        labels:{
                            show:false
                        },
                        axisTicks:{
                            show:false
                        },
                        axisBorder:{
                            show:false
                        },
                        categories:data?.map(i => new Date(i.time_close * 1000).toUTCString())
                    },
                    stroke:{
                        curve:"smooth",
                        width:4
                    },
                    fill:{
                        type:"gradient",
                        gradient:{
                            gradientToColors:['blue'], stops:[0,100]

                        }
                    },
                    colors:['red'],
                    tooltip:{
                        y:{
                            formatter:(v) => `$ ${v.toFixed(2)}`
                        }
                    }
                }}/>}
            </div>
        </>
    )
}
export default Chart