
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface StepCardProps{
  id: number,
  title: string,
  description:string,
  tags:string[]
}

const Flowbox = ({ id, title, description, tags }: StepCardProps) => {


  return (
    <Card className="h-full w-full lg:max-w-248 dark:bg-prussian-400 bg-alabaster-700">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-start items-center">
          <div className="rounded-full w-8 h-8 sm:w-10 sm:h-10  bg-orange-500  flex justify-center items-center">{id}</div>
          <span className="text-2xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-">
        <p>
          {description}
        </p>
        <br/>
      <div className="flex flex-wrap gap-2">
        {
          tags.map((tag, index)=>(
            <Badge className="bg-orange-500 dark:text-prussian-500 p-2 rounded-full " key={index} variant={"outline"}>{tag}</Badge>
          ))
        }
      </div>
      </CardContent>
      
    </Card>
  );
};

export default Flowbox;

