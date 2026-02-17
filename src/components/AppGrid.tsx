import AppIcon from "./AppIcon";

interface App {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  _count?: { comments: number };
}

export default function AppGrid({ apps }: { apps: App[] }) {
  return (
    <div className="flex-1 px-6 py-4 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-6 gap-x-2 justify-items-center">
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            id={app.id}
            name={app.name}
            icon={app.icon}
            gradient={app.gradient}
            commentCount={app._count?.comments}
          />
        ))}
      </div>
    </div>
  );
}
