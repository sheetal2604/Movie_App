import HomeCard from "./HomeCard"
import "./Home.css";
const Home=({genre})=>{
 return(
    <div className="Home">
      <h1>Movie Genres</h1>
      <div className="HomeContainer">
            {genre?.map((item,index)=>{
                return <HomeCard name={item.name} id={item.id} key={item.id}/>
            })}
        </div>
    </div>
 )

}
export default Home