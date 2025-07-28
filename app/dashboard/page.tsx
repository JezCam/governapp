import HomeActions from './home-actions';

export default function Dashboard() {
  return (
    <div className="flex size-full flex-col gap-4 bg-gray-50 p-12 px-16 dark:bg-gray-950/50">
      <div className="flex items-center gap-1 font-bold text-2xl">
        Hey Jeremy, what would you like to do?
      </div>
      <HomeActions />
    </div>
  );
}
