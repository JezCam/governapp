import type { ColumnDef } from '@tanstack/react-table';
import ExpandChevron from '@/components/expand-chevron';
import FrameworkLabel from '@/components/labels/framework-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FrameworksStoreDataTable } from './framework-store-data-table';

export type Framework = {
  id: string;
  type: 'self' | 'board';
  name: string;
  authority: string;
  monthlyCost: number;
  description: string;
};

const frameworks: Framework[] = [
  {
    id: '1',
    type: 'self',
    name: 'Self Framework',
    authority: 'GovernApp',
    monthlyCost: 100,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet volutpat lobortis. Pellentesque ut laoreet massa. Sed pellentesque tristique nunc et lobortis. Mauris vel lacus bibendum, tempor elit eget, lacinia nunc. Vivamus vestibulum lacinia ligula sed elementum. Donec vel est leo. Fusce nunc tortor, auctor quis elit vel, porttitor dignissim purus. Nam vel lorem sapien. Curabitur fermentum ex dui, nec interdum lectus malesuada placerat. Morbi ut tempus dui. Vivamus in magna est. Nam sit amet eleifend massa, nec condimentum magna. Morbi ut leo nec libero ultrices blandit a iaculis nisi. Aliquam pulvinar metus id sem auctor, sed semper nisl tincidunt.
  
  Nullam consectetur nunc est, id lacinia eros sagittis ut. Nunc ac vehicula mi. Praesent sit amet turpis non mi lacinia maximus sed id justo. Maecenas justo nulla, suscipit a urna eget, pellentesque rutrum justo. Maecenas egestas, lorem nec ullamcorper sollicitudin, erat eros bibendum velit, et volutpat dolor tellus eu erat. Mauris euismod odio ut nunc malesuada, at ornare nisi finibus. Nam consectetur sapien lacus, ac faucibus leo fermentum nec.
  
  Aliquam molestie nunc mauris, scelerisque rutrum urna tincidunt elementum. Quisque euismod sapien dapibus nibh fermentum vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent accumsan ipsum hendrerit nisi iaculis lacinia. Nullam viverra augue vehicula velit rhoncus tempus. Cras lectus ex, feugiat at justo nec, vehicula varius lorem. Aliquam pharetra turpis id risus ornare laoreet. Pellentesque at feugiat sapien, et facilisis magna. Sed semper, quam sed pretium tincidunt, nulla dui posuere felis, et rutrum risus nulla a est. In fermentum metus quis tristique placerat.`,
  },
  {
    id: '2',
    type: 'board',
    name: 'Board Framework',
    authority: 'GovernApp',
    monthlyCost: 200,
    description: 'This framework is designed for board governance.',
  },
];

const columns: ColumnDef<Framework>[] = [
  {
    size: 30,
    maxSize: 30,
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex gap-2">
          <ExpandChevron
            className="mt-0.75 shrink-0"
            expanded={row.getIsExpanded()}
          />
          <FrameworkLabel name={name} variant="framework" />
        </div>
      );
    },
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge variant={type} />;
    },
  },
  {
    size: 20,
    maxSize: 20,
    accessorKey: 'authority',
    header: 'Authority',
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: 'monthlyCost',
    header: ({ column }) => (
      <SortButton column={column}>Monthly Cost</SortButton>
    ),
    cell: ({ row }) => {
      const cost = row.original.monthlyCost;
      return `$${cost.toFixed(2)}`;
    },
  },
  {
    size: 20,
    maxSize: 20,
    id: 'menu',
    cell: () => {
      return (
        <Button className="float-right" size="sm">
          Subscribe
        </Button>
      );
    },
  },
];
export default function FrameworkStore() {
  return <FrameworksStoreDataTable columns={columns} data={frameworks} />;
}
