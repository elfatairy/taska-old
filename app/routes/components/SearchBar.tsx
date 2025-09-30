import { Icon } from "~/components/Icon";
import { Input } from "~/components/ui/input";

export default function SearchBar() {
  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Search"
        icon={SearchIcon}
        iconProps={{ behavior: 'prepend' }}
      />
    </div>
  )
}

function SearchIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon icon="Search" strokeWidth={0.1} {...props} />
  )
}
