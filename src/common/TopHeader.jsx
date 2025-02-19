import Profile_drawer from "../components/profile_drawer";



const TopHeader = () => {
  return (
  
    <div className="h-16 bg-gray-100 flex">
      <div className="flex-1">
      <img src="/images/logo.png" className="h-16 ml-6"/>
      </div>
      <div className="m-2 mr-10">
      <Profile_drawer name = "Pranjal" />
      </div>
    </div>
  )
}

export default TopHeader
