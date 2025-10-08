import UnderDevelopmentImage from "~/assets/images/under-development.svg";
import { Button } from "./ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

export default function UnderDevelopment() {
  return (

    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img src={UnderDevelopmentImage} alt="Under Development" className="w-100" />
        </EmptyMedia>
        <EmptyTitle>Under Development</EmptyTitle>
        <EmptyDescription>This page is still under development, please check back later to see if it's been added, or ask for it in the github repository to be added.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" asChild>
          <a href="https://github.com/elfatairy/taska/issues" target="_blank">GitHub Repository</a>
        </Button>
      </EmptyContent>
    </Empty>
  )
}