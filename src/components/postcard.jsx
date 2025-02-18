import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";


const Postcard = ({heading , content , imageURL, newsURL}) => {
  return (
    <>
      <Card className="mt-2 w-auto">
      <CardHeader color="blue-gray" className="relative min-h-44" floated={false}>
        <img
          src = {imageURL}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {heading}
        </Typography>
        <Typography className="truncate">
          {content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
       <a href={newsURL}>
        <Button>Read More</Button>
       </a>
      </CardFooter>
    </Card>
    </>
  )
}

export default Postcard
