import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import UserMultiselect from '@/components/user-multiselect';

type User = {
  _id: string;
  name: string;
  imageUrl: string;
};

const users: User[] = [
  {
    _id: '0',
    name: 'Jeremy Cameron',
    imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  },
  {
    _id: '1',
    name: 'Alice Johnson',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    _id: '2',
    name: 'Bob Smith',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    _id: '3',
    name: 'Charlie Brown',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    _id: '4',
    name: 'Diana Prince',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
];

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Input className="w-80" placeholder="Select Users" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="w-80">
        <UserMultiselect
          defaultOptions={users.map((user) => ({
            id: user._id,
            name: user.name,
            imageUrl: user.imageUrl,
          }))}
          emptyIndicator={<p className="text-center text-sm">No users found</p>}
          placeholder="Select users"
        />
      </div>
    </div>
  );
}
