import fetcher from "@/lib/api/fetcher";
import { DashboardsResponse, DashboardResponse } from "@/lib/api/types/dashboards";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ColorChip from "@/public/chip/circle_small.svg";
import CrownIcon from "@/public/icon/ic_crown.svg"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDA5NywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5OTYwNjYwLCJpc3MiOiJzcC10YXNraWZ5In0.9YZREbJn1sstQkOI4v7rm0xo_pkbM1PD6-Fd7GmoCfA

const getDashboard = ():DashboardResponse[] | null | JSX.Element => {

  const config: AxiosRequestConfig = {
    url:"/dashboards",  
    method: "GET",
    params:{
      navigationMethod:"pagination"
    }
  };
  
  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardloading,
  } = useQuery<DashboardsResponse>({
    queryKey: ["DashboardsResponse"], 
    queryFn: () => fetcher<DashboardsResponse>(config),
  });
  
  if(dashboardloading) {
    return <div>Loading...</div>
  };
  if(dashboardError || !dashboardData){
    return null;
  };
  
  const dashboardArray = dashboardData.dashboards;

  return dashboardArray
};

const ButtonList = () => {
  const router = useRouter();
  const { dashboardId } = router.query;
  const dashboardArray = getDashboard();
  //const [index, setIndex] = useState(0)
  //const [isActive,setIsActive]=useState(false);
    
  if(Array.isArray(dashboardArray)){
    return(
      <div className="flex flex-col-reverse justify-start items-start">
      {dashboardArray.map((dashboard:DashboardResponse, index:number)=>(
        <Link key={index}  href={`/dashboard/${dashboard.id}`}>
          <button key={index} className={`flex justify-start items-center w-[276px] h-[45px] cursor-pointer hover:bg-[#F1EFFD] rounded-[4px] max-desktop:w-[134px] max-tablet:w-fit`}>
            <ColorChip key={index} fill={dashboard.color}/>
            <p className="flex items-center justify-start gap-2 text-gray-50 max-desktop:gap-1.5 max-tablet:hidden">{dashboard.title}{dashboard.createdByMe ? <CrownIcon key={index} className="w-[18px] h-[14px] viewBox-[0 0 18 14] max-desktop:w-[16px] max-desktop:h-[12px]"/> : null}</p>
          </button>
        </Link>))
      }
      </div> 
    )
  }
}

export default ButtonList;

/* const handleButtonClass = () =>{
  setIndex(dashboardArray.indexOf({`${dashboard}`}))
}
*/