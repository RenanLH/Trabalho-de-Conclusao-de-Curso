interface UserBadgeProps {
  user: string;
  size?: string;
}

const UserBadge = ({ user, size }: UserBadgeProps) => {
  return (
    <div className={`${size ? size : "w-7 h-7"} rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-950 
        flex items-center justify-center text-slate-50  text-[10px] font-bold uppercase notranslate`}>
      {user.slice(0, 2)}
    </div>
  );
};


export default UserBadge;