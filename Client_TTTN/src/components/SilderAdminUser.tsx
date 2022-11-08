import React from "react";

type Props = {
  arrUser: any;
  handleSelectUser:any
};

export default function SilderAdminUser({ arrUser,handleSelectUser }: Props) {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      {arrUser?.map((user: {avatar: string, username: string,active:boolean}, index: number) => {
        return (
          <button className="h-16 w-16" key={index} onClick={()=>{
            handleSelectUser(user);
          }}>
            <img
              src={user.avatar ? user.avatar:"https://i.pravatar.cc/300"}
              alt="..."
              className="w-full h-full rounded-full"
            />
            <p className={user.active ? "text-red-700 bg-slate-300":''}>{user.username}</p>
          </button>
        );
      })}
    </div>
  );
}
