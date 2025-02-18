import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar
  } from "@material-tailwind/react";
  import { useContext } from "react";
  import { MyContext } from "../myprovider";
  
  export function UserInfo() {
    const { person } = useContext(MyContext);
  
    const Details = [
      {
        info: "Username",
        value: person?.name || "None"
      },
      {
        info: "Email",
        value: person?.email || "None"
      },
      {
        info: "Bio",
        value: "About me, nothing"
      },
      {
        info: "Location",
        value: "Kannauj, U.P."
      }
    ];
  
    return (
      <Card className="w-full max-w-[26rem] shadow-2xl m-5 bg-blue-gray-900 text-white">
        <CardHeader floated={false} color="blue-gray">
          <img
            src="/images/chris evans_.jpeg"
            // src="/images/pranjal_imge.jpg"
            alt="Profile Image"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-end">
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-semibold text-green-400"
            >
              Edit Profile
            </Typography>
          </div>
  
          {/* Profile details */}
          <div className="divide-y divide-gray-200">
            {Details.map(({ info, value }, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-3 pt-3 last:pb-0"
              >
                <div className="flex items-center gap-x-3">
                  <div>
                    <Typography variant="h6">
                      {info}
                    </Typography>
                    <Typography variant="small">
                      {value}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter className="pt-3" />
      </Card>
    );
  }
  