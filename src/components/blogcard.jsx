import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
  } from "@material-tailwind/react";
   
  export function BlogCard({imageURL, heading, content, date} ) {
    return (
      <Card className="max-w-[24rem] min-h-[10rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={true}
          color="transparent"
          className="m-0 rounded-none"
        >
            
          <img
            src={imageURL}
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {heading}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {content}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
            <Button>Read More</Button>
        </div>
        <Typography className="font-normal">
          {date}
        </Typography>
      </CardFooter>
      </Card>
    );
  }